import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';

import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, Photo, Pill, StitchIcon, Text } from '@/components/stitch-ui';
import { RouteState } from '@/components/route-state';
import { demoRepository } from '@/data/demo-repository';
import { activityPhoto } from '@/data/stitch-catalog';
import { formatActivityPrice } from '@/lib/currency';
import { useLoadState } from '@/lib/use-load-state';

export default function ActivityDetailsScreen() {
  const router = useRouter();
  const { activityId } = useLocalSearchParams<{ activityId: string }>();
  const { value: activity, status, reload } = useLoadState(useCallback(() => demoRepository.getActivity(activityId), [activityId]));
  if (status === 'error' || (status === 'ready' && !activity)) return <RouteState kind="error" title="Activity unavailable" description="Please try loading this activity again." onAction={reload} />;

  return <Page header={<StitchHeader section="Activity details" backLabel="Back to activities" />} footer={<View className="flex-row items-center gap-4"><View><Text className="text-xs leading-4 text-[#7C736E]">Per child</Text><Text className="text-2xl leading-8 font-bold">{formatActivityPrice(activity?.priceMinor ?? 0, activity?.currency ?? 'PHP')}</Text></View><View className="flex-1"><Button textSize={15} icon="arrow_forward" iconPosition="right" disabled={!activity} onPress={() => router.push(`/activity/${activityId}/sessions`)}>Choose a session</Button></View></View>}>
    <View className="px-5 pt-5 pb-8 gap-6"><View className="overflow-hidden rounded-2xl border border-[#E8DED8] bg-white"><Photo source={activityPhoto(activityId)} height={224} /><View className="p-5 gap-3"><View className="flex-row items-center justify-between gap-3"><Pill icon="child_care">Ages {activity ? `${activity.minAge}–${activity.maxAge} years` : ''}</Pill><Text className="text-base font-bold text-[#EE5E41]">{activity ? formatActivityPrice(activity.priceMinor, activity.currency) : ''}</Text></View><Text className="text-2xl leading-8 font-bold tracking-tight">{activity?.name || 'Loading activity…'}</Text><Text className="text-sm leading-6 text-[#7C736E]">{activity?.shortDescription}</Text></View></View>
      <View className="gap-3"><Text className="text-lg font-bold">At a glance</Text><View className="rounded-2xl border border-[#E8DED8] bg-white overflow-hidden"><View className="p-4 flex-row items-center gap-3 border-b border-[#EBE4DE]"><StitchIcon name="schedule" color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Duration</Text><Text className="text-sm font-semibold">{activity?.durationMinutes} minutes</Text></View></View><View className="p-4 flex-row items-center gap-3 border-b border-[#EBE4DE]"><StitchIcon name="person" color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Instructor</Text><Text className="text-sm font-semibold">{activity?.instructorName}</Text></View></View><View className="p-4 flex-row items-center gap-3"><StitchIcon name="location_on" color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Location</Text><Text className="text-sm font-semibold">{activity?.locationName}</Text></View></View></View></View>
      <View className="gap-2"><Text className="text-lg font-bold">About this activity</Text><Text className="text-sm leading-6 text-[#59413C]">{activity?.description}</Text></View>
      <View className="rounded-2xl border border-[#D5E6E5] bg-[#D3F2EF66] p-4 flex-row items-start gap-3"><StitchIcon name="info" color={C.teal} /><View className="flex-1"><Text className="text-sm font-semibold text-[#215954]">What happens next</Text><Text className="mt-1 text-sm leading-5 text-[#59413C]">Choose a session, select the attending child, then review your booking.</Text></View></View>
    </View>
  </Page>;
}
