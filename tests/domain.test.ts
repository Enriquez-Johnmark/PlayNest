import assert from 'node:assert/strict';
import test from 'node:test';

import { assertSessionBookable, getAvailableSlots, isBookingUpcoming, isChildEligibleForActivity } from '../src/domain/booking-rules';
import { getActivityRecommendation } from '../src/domain/activity-recommendations';
import { DomainError } from '../src/domain/errors';
import { createDemoState } from '../src/data/demo-fixtures';

const now = new Date('2026-09-01T04:00:00.000Z');

function fixtureState() {
  return createDemoState(now);
}

function requireValue<Value>(value: Value | undefined, label: string): Value {
  assert.ok(value, `${label} should exist in demo fixtures`);
  return value;
}

test('Junior Gymnastics accepts Emma and rejects Lucas at the inclusive age range', () => {
  const state = fixtureState();
  const activity = requireValue(state.activities.find((candidate) => candidate.id === 'act_junior_gymnastics'), 'Junior Gymnastics');
  const emma = requireValue(state.children.find((candidate) => candidate.id === 'child_emma'), 'Emma');
  const lucas = requireValue(state.children.find((candidate) => candidate.id === 'child_lucas'), 'Lucas');
  assert.equal(isChildEligibleForActivity(emma, activity, now), true);
  assert.equal(isChildEligibleForActivity(lucas, activity, now), false);
});

test('availability includes seeded occupancy and confirmed local bookings', () => {
  const state = fixtureState();
  const availableSession = requireValue(state.sessions.find((candidate) => candidate.startsAt.includes('14:00:00')), '14:00 session');
  assert.equal(getAvailableSlots(availableSession, state.bookings), 4);

  state.bookings.push({
    id: 'bkg_existing',
    reference: 'PN-000001',
    submissionId: 'submission-existing',
    userId: state.user.id,
    childId: 'child_emma',
    sessionId: availableSession.id,
    status: 'confirmed',
    createdAt: now.toISOString(),
  });

  assert.equal(getAvailableSlots(availableSession, state.bookings), 3);
});

test('a full, cancelled, or past session cannot be booked', () => {
  const state = fixtureState();
  const fullSession = requireValue(state.sessions.find((candidate) => candidate.startsAt.includes('16:00:00')), '16:00 session');
  const availableSession = requireValue(state.sessions.find((candidate) => candidate.startsAt.includes('14:00:00')), '14:00 session');

  assert.throws(() => assertSessionBookable(fullSession, state.bookings, now), (error: unknown) => error instanceof DomainError && error.code === 'SESSION_FULL');
  assert.throws(
    () => assertSessionBookable({ ...availableSession, status: 'cancelled' }, state.bookings, now),
    (error: unknown) => error instanceof DomainError && error.code === 'SESSION_CANCELLED',
  );
  assert.throws(
    () => assertSessionBookable({ ...availableSession, startsAt: '2026-08-31T14:00:00+08:00' }, state.bookings, now),
    (error: unknown) => error instanceof DomainError && error.code === 'SESSION_PAST',
  );
});

test('a pass remains available only for a confirmed future booking', () => {
  const state = fixtureState();
  const session = requireValue(state.sessions.find((candidate) => candidate.startsAt.includes('14:00:00')), '14:00 session');
  const booking = {
    id: 'bkg_upcoming',
    reference: 'PN-000001',
    submissionId: 'submission-upcoming',
    userId: state.user.id,
    childId: 'child_emma',
    sessionId: session.id,
    status: 'confirmed' as const,
    createdAt: now.toISOString(),
  };

  assert.equal(isBookingUpcoming(booking, session, now), true);
  assert.equal(isBookingUpcoming({ ...booking, status: 'cancelled' }, session, now), false);
  assert.equal(isBookingUpcoming(booking, { ...session, startsAt: '2026-08-31T14:00:00+08:00' }, now), false);
});


test('Stitch infant ranges enforce completed months rather than rounded years', () => {
  const state = fixtureState();
  const template = requireValue(state.activities[0], 'activity');
  const child = requireValue(state.children[0], 'child');
  const forest = { ...template, minAgeMonths: 18, maxAgeMonths: 47 };
  assert.equal(isChildEligibleForActivity({ ...child, dateOfBirth: '2025-03-01' }, forest, now), true);
  assert.equal(isChildEligibleForActivity({ ...child, dateOfBirth: '2025-03-02' }, forest, now), false);
  const babyYoga = { ...template, minAgeMonths: 0, maxAgeMonths: 12 };
  assert.equal(isChildEligibleForActivity({ ...child, dateOfBirth: '2025-03-01' }, babyYoga, now), false);
  assert.equal(isChildEligibleForActivity({ ...child, dateOfBirth: '2025-09-01' }, babyYoga, now), true);
});

test('the Home recommendation uses the same child eligibility and live capacity rules as checkout', () => {
  const state = fixtureState();
  const recommendation = getActivityRecommendation(state, 'child_emma', now);

  assert.ok(recommendation);
  assert.equal(recommendation.child.id, 'child_emma');
  assert.equal(isChildEligibleForActivity(recommendation.child, recommendation.activity, now), true);
  assert.ok(recommendation.availableSlots > 0);

  const fullState = { ...state, sessions: state.sessions.map((session) => ({ ...session, seededBookedCount: session.capacity })) };
  assert.equal(getActivityRecommendation(fullState, 'child_emma', now), null);
});
