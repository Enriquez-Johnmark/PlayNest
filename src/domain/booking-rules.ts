import { DomainError } from './errors';
import { calculateChildAge, calculateChildAgeInMonths } from './time';
import type { Activity, Booking, Child, Session } from './types';

export function isChildEligibleForActivity(child: Child, activity: Activity, now: Date): boolean {
  if (activity.minAgeMonths !== undefined || activity.maxAgeMonths !== undefined) {
    const months = calculateChildAgeInMonths(child.dateOfBirth, now);
    return months >= (activity.minAgeMonths ?? activity.minAge * 12) && months <= (activity.maxAgeMonths ?? activity.maxAge * 12 + 11);
  }
  const age = calculateChildAge(child.dateOfBirth, now);
  return age >= activity.minAge && age <= activity.maxAge;
}

export function getAvailableSlots(session: Session, bookings: Booking[]): number {
  const confirmedBookings = bookings.filter(
    (booking) => booking.sessionId === session.id && booking.status === 'confirmed',
  ).length;

  return Math.max(0, session.capacity - session.seededBookedCount - confirmedBookings);
}

export function assertSessionBookable(session: Session, bookings: Booking[], now: Date): void {
  if (session.status === 'cancelled') {
    throw new DomainError('SESSION_CANCELLED');
  }

  if (new Date(session.startsAt).getTime() <= now.getTime()) {
    throw new DomainError('SESSION_PAST');
  }

  if (getAvailableSlots(session, bookings) <= 0) {
    throw new DomainError('SESSION_FULL');
  }
}

export function isBookingUpcoming(booking: Booking, session: Session, now: Date): boolean {
  return booking.status === 'confirmed' && new Date(session.startsAt).getTime() > now.getTime();
}
