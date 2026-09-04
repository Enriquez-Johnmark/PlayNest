import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';

import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, StitchIcon, Text } from '@/components/stitch-ui';
import { RouteState } from '@/components/route-state';
import { demoRepository } from '@/data/demo-repository';
import { DomainError, domainErrorMessage } from '@/domain/errors';
import { formatActivityPrice } from '@/lib/currency';
import { formatVenueDate, formatVenueTime } from '@/lib/datetime';
import { useLoadState } from '@/lib/use-load-state';

export default function BookingReviewScreen() {
  const router = useRouter();
  const { activityId, sessionId, childId, notes } = useLocalSearchParams<{ activityId: string; sessionId: string; childId: string; notes?: string }>();
  const { value: state, status, reload } = useLoadState(useCallback(() => demoRepository.getState(), []));
  const [error, setError] = useState<{ message: string; needsNewSession: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  const submissionId = useRef<string | null>(null);
  const activity = state?.activities.find((item) => item.id === activityId);
  const session = state?.sessions.find((item) => item.id === sessionId && item.activityId === activityId);
  const child = state?.children.find((item) => item.id === childId && item.parentId === state.user.id);

  async function confirm() {
    if (!state || !activity || !session || !child || saving) return;
    setSaving(true); setError(null);
    submissionId.current ??= `submission-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    try {
      const booking = await demoRepository.createBooking({ userId: state.user.id, childId, sessionId, submissionId: submissionId.current, careNotes: notes });
      router.replace(`/booking/${booking.id}/confirmation`);
    } catch (cause) {
      setError({ message: domainErrorMessage(cause), needsNewSession: cause instanceof DomainError && ['SESSION_CANCELLED', 'SESSION_FULL', 'SESSION_PAST'].includes(cause.code) });
    } finally { setSaving(false); }
  }

  if (status === 'error') return <RouteState kind="error" title="We couldn’t load your booking" description="Your choices are preserved. Please try again." onAction={reload} />;
  if (status === 'ready' && (!activity || !session || !child)) return <RouteState kind="missing" title="Booking choices not found" description="Please choose an available session and child." actionLabel="Choose a session" onAction={() => router.replace(`/activity/${activityId}/sessions`)} />;
  return <Page header={<StitchHeader section="Review booking" backLabel="Back to choices" />} footer={<View className="gap-2"><Button textSize={16} minHeight={52} disabled={saving || !child} onPress={() => { void confirm(); }}>{saving ? 'Saving booking…' : 'Confirm booking'}</Button><Text className="text-[11px] leading-4 text-center text-[#7C736E]">Local demo reservation — no payment is collected.</Text></View>}>
    <View className="p-5 gap-5"><View><Text className="text-2xl leading-8 font-bold tracking-tight">Check your booking</Text><Text className="mt-1 text-sm leading-5 text-[#7C736E]">Confirm the session and child before saving it to this device.</Text></View>
      <View className="rounded-2xl border border-[#E8DED8] bg-white p-4 gap-4"><View><Text className="text-lg font-bold">{activity?.name}</Text><Text className="mt-1 text-sm text-[#7C736E]">{activity ? formatActivityPrice(activity.priceMinor, activity.currency, 2) : ''} per child</Text></View><View className="border-t border-[#EBE4DE]" />
        <View className="flex-row gap-3"><StitchIcon name="calendar_today" color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Session</Text><Text className="text-sm font-semibold">{session ? `${formatVenueDate(session.startsAt)} · ${formatVenueTime(session.startsAt)}` : ''}</Text></View></View>
        <View className="flex-row gap-3"><StitchIcon name="child_care" color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Attending child</Text><Text className="text-sm font-semibold">{child?.firstName}</Text></View></View>
        <View className="flex-row gap-3"><StitchIcon name="location_on" color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Location</Text><Text className="text-sm font-semibold">{activity?.locationName}</Text></View></View>
      </View>
      {notes ? <View className="rounded-2xl border border-[#E8DED8] bg-white p-4 gap-1"><Text className="text-sm font-semibold">Care note</Text><Text className="text-sm leading-5 text-[#7C736E]">{notes}</Text></View> : null}
      {error ? <View accessibilityRole="alert" className="rounded-2xl bg-[#FFDAD6] p-4 gap-3"><Text className="text-sm text-[#93000A]">{error.message}</Text>{error.needsNewSession ? <Button secondary onPress={() => router.replace(`/activity/${activityId}/sessions`)}>Choose another session</Button> : null}</View> : null}
    </View>
  </Page>;
}
