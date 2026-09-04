import AsyncStorage from '@react-native-async-storage/async-storage';

import { assertSessionBookable, isChildEligibleForActivity } from '@/domain/booking-rules';
import { DomainError } from '@/domain/errors';
import type { Activity, Booking, BookingDetails, Child, DemoState, Session } from '@/domain/types';

import { createDemoState } from './demo-fixtures';
import { withStitchFixtures } from './stitch-catalog';

const storageKey = '@playnest/demo-state/v1';
let mutationQueue: Promise<void> = Promise.resolve();

function now(): Date {
  return new Date();
}

function toBookingReference(number: number): string {
  return `PN-${number.toString(36).toUpperCase().padStart(6, '0')}`;
}

function isDemoState(value: unknown): value is DemoState {
  return Boolean(value) && typeof value === 'object' && (value as DemoState).version === 1;
}

async function readState(): Promise<DemoState> {
  try {
    const serialized = await AsyncStorage.getItem(storageKey);

    if (!serialized) {
      const initial = withStitchFixtures(createDemoState(now()), now());
      await AsyncStorage.setItem(storageKey, JSON.stringify(initial));
      return initial;
    }

    const parsed: unknown = JSON.parse(serialized);
    if (!isDemoState(parsed)) {
      throw new DomainError('PERSISTENCE_FAILED', 'Stored demo data is incompatible.');
    }

    const migrated = withStitchFixtures(parsed, now());
    if (migrated !== parsed) await AsyncStorage.setItem(storageKey, JSON.stringify(migrated));
    return migrated;
  } catch (error) {
    if (error instanceof DomainError) {
      throw error;
    }

    throw new DomainError('PERSISTENCE_FAILED');
  }
}

async function persistState(nextState: DemoState): Promise<void> {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(nextState));
  } catch {
    throw new DomainError('PERSISTENCE_FAILED');
  }
}

function mutateState<Result>(operation: (state: DemoState) => Promise<{ state: DemoState; result: Result }>): Promise<Result> {
  const mutation = mutationQueue.then(async () => {
    try {
      const currentState = await readState();
      const { state, result } = await operation(currentState);
      await persistState(state);
      return result;
    } catch (error) {
      if (error instanceof DomainError) {
        throw error;
      }

      throw new DomainError('PERSISTENCE_FAILED');
    }
  });

  mutationQueue = mutation.then(
    () => undefined,
    () => undefined,
  );
  return mutation;
}

export type CreateBookingInput = {
  userId: string;
  childId: string;
  sessionId: string;
  submissionId: string;
  careNotes?: string;
};

export const demoRepository = {
  async getState(): Promise<DemoState> {
    return readState();
  },

  async reset(): Promise<DemoState> {
    return mutateState(async () => {
      const freshState = withStitchFixtures(createDemoState(now()), now());
      return { state: freshState, result: freshState };
    });
  },

  async listActivities(): Promise<Activity[]> {
    return (await readState()).activities;
  },

  async getActivity(activityId: string): Promise<Activity | null> {
    return (await readState()).activities.find((activity) => activity.id === activityId) ?? null;
  },

  async listSessions(activityId: string, date?: string): Promise<Session[]> {
    return (await readState()).sessions.filter(
      (session) => session.activityId === activityId && (!date || session.startsAt.startsWith(date)),
    );
  },

  async listChildren(parentId: string): Promise<Child[]> {
    return (await readState()).children.filter((child) => child.parentId === parentId);
  },

  async listBookings(userId: string): Promise<Booking[]> {
    return (await readState()).bookings.filter((booking) => booking.userId === userId);
  },

  async getBookingDetails(bookingId: string): Promise<BookingDetails | null> {
    const state = await readState();
    const booking = state.bookings.find((candidate) => candidate.id === bookingId);

    if (!booking) {
      return null;
    }

    const child = state.children.find((candidate) => candidate.id === booking.childId);
    const session = state.sessions.find((candidate) => candidate.id === booking.sessionId);
    const activity = session && state.activities.find((candidate) => candidate.id === session.activityId);

    return child && session && activity ? { booking, child, session, activity } : null;
  },

  async createBooking(input: CreateBookingInput): Promise<Booking> {
    return mutateState(async (state) => {
      const existingRetry = state.bookings.find((booking) => booking.submissionId === input.submissionId);

      if (existingRetry) {
        return { state, result: existingRetry };
      }

      if (state.user.id !== input.userId) {
        throw new DomainError('UNKNOWN');
      }

      const child = state.children.find((candidate) => candidate.id === input.childId && candidate.parentId === input.userId);
      if (!child) {
        throw new DomainError('CHILD_NOT_FOUND');
      }

      const session = state.sessions.find((candidate) => candidate.id === input.sessionId);
      if (!session) {
        throw new DomainError('SESSION_NOT_FOUND');
      }

      const activity = state.activities.find((candidate) => candidate.id === session.activityId);
      if (!activity) {
        throw new DomainError('ACTIVITY_NOT_FOUND');
      }

      assertSessionBookable(session, state.bookings, now());

      if (!isChildEligibleForActivity(child, activity, now())) {
        throw new DomainError('CHILD_INELIGIBLE');
      }

      if (state.bookings.some((booking) => booking.childId === child.id && booking.sessionId === session.id && booking.status === 'confirmed')) {
        throw new DomainError('DUPLICATE_BOOKING');
      }

      const booking: Booking = {
        id: `bkg_demo_${state.nextBookingNumber}`,
        reference: toBookingReference(state.nextBookingNumber),
        submissionId: input.submissionId,
        careNotes: input.careNotes,
        userId: input.userId,
        childId: child.id,
        sessionId: session.id,
        status: 'confirmed',
        createdAt: now().toISOString(),
      };

      const nextState: DemoState = {
        ...state,
        nextBookingNumber: state.nextBookingNumber + 1,
        bookings: [...state.bookings, booking],
      };

      return { state: nextState, result: booking };
    });
  },
};
