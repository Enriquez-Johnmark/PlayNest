import { getAvailableSlots, isChildEligibleForActivity } from './booking-rules';
import type { Activity, Child, DemoState, Session } from './types';

export type ActivityRecommendation = {
  activity: Activity;
  child: Child;
  session: Session;
  availableSlots: number;
};

/**
 * Finds the next bookable activity that genuinely fits a child. The Home
 * screen can explain this recommendation because it is derived from the same
 * eligibility and capacity rules used at checkout.
 */
export function getActivityRecommendation(state: DemoState, childId: string, now: Date): ActivityRecommendation | null {
  const child = state.children.find((candidate) => candidate.id === childId);
  if (!child) return null;

  const candidates = state.sessions.flatMap((session) => {
    const activity = state.activities.find((candidate) => candidate.id === session.activityId);
    const availableSlots = getAvailableSlots(session, state.bookings);
    const isBookable = session.status === 'scheduled' && new Date(session.startsAt).getTime() > now.getTime() && availableSlots > 0;

    return activity && isBookable && isChildEligibleForActivity(child, activity, now)
      ? [{ activity, child, session, availableSlots }]
      : [];
  });

  return candidates.sort((left, right) => {
    const startsEarlier = new Date(left.session.startsAt).getTime() - new Date(right.session.startsAt).getTime();
    return startsEarlier || left.availableSlots - right.availableSlots || left.activity.name.localeCompare(right.activity.name);
  })[0] ?? null;
}
