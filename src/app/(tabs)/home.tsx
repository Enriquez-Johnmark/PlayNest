import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';

import { BookingPass } from '@/components/booking-pass';
import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, Photo, Pill, StitchIcon, Text } from '@/components/stitch-ui';
import { spotlight } from '@/data/stitch-catalog';
import { demoRepository } from '@/data/demo-repository';
import { getActivityRecommendation } from '@/domain/activity-recommendations';
import { isBookingUpcoming } from '@/domain/booking-rules';
import type { BookingDetails } from '@/domain/types';
import { formatVenueDate, formatVenueTime } from '@/lib/datetime';

export default function HomeScreen() {
  const router = useRouter();
  const [nextBooking, setNextBooking] = useState<BookingDetails | null>(null);
  const [recommendation, setRecommendation] = useState<ReturnType<typeof getActivityRecommendation>>(null);

  useFocusEffect(useCallback(() => {
    let active = true;
    void demoRepository.getState().then(async (state) => {
      const details = await Promise.all(state.bookings.map((booking) => demoRepository.getBookingDetails(booking.id)));
      const next = details.filter((item): item is BookingDetails => item !== null).find((item) => isBookingUpcoming(item.booking, item.session, new Date()));
      if (active) {
        setNextBooking(next ?? null);
        setRecommendation(getActivityRecommendation(state, 'child_leo', new Date()));
      }
    });
    return () => { active = false; };
  }, []));

  return <Page surface="#FDF9F6" ink="#2B221D" mint="#D3F2EF" header={<StitchHeader section="Home" />}>
    <View className="px-5 pt-5 pb-8 gap-7">
      <View><Text className="text-2xl leading-8 font-semibold tracking-tight">Hello, Sarah</Text><Text className="mt-1 text-sm leading-5 text-[#7C736E]">Find a session your child will enjoy.</Text></View>
      {nextBooking ? <View className="gap-3"><View className="flex-row items-center justify-between"><Text className="text-lg font-bold">Your next booking</Text><Text className="text-sm font-semibold text-[#EE5E41]">Ready for check-in</Text></View><BookingPass details={nextBooking} /></View> : <View className="rounded-2xl border border-[#D5E6E5] bg-[#EAF8F6] p-5 gap-3"><View className="flex-row items-center gap-3"><View className="w-11 h-11 rounded-xl bg-white items-center justify-center"><StitchIcon name="play_circle" color={C.teal} /></View><View className="flex-1"><Text className="text-lg font-bold">Try the booking demo</Text><Text className="mt-0.5 text-sm leading-5 text-[#59413C]">Find a session that matches Leo&apos;s age and has space available.</Text></View></View><Button icon="arrow_forward" iconPosition="right" onPress={() => recommendation ? router.push({ pathname: '/activity/[activityId]/sessions', params: { activityId: recommendation.activity.id, sessionId: recommendation.session.id } }) : router.navigate('/activities')}>Start with Leo&apos;s best fit</Button></View>}
      {recommendation ? <View className="rounded-2xl border border-[#E8DED8] bg-white overflow-hidden"><View className="p-5 gap-4"><View className="flex-row items-start justify-between gap-3"><View className="flex-1 gap-1"><Text className="text-lg font-bold">Best for Leo today</Text><Text className="text-sm leading-5 text-[#7C736E]">A real suggestion based on his age and local session availability.</Text></View><View className="w-10 h-10 rounded-xl bg-[#FFF1D0] items-center justify-center"><StitchIcon name="auto_awesome" color={C.brown} /></View></View><View className="gap-2"><Text className="text-base font-bold">{recommendation.activity.name}</Text><Text className="text-sm text-[#59413C]">{formatVenueDate(recommendation.session.startsAt)} · {formatVenueTime(recommendation.session.startsAt)}</Text><View className="flex-row flex-wrap gap-2"><Pill icon="child_care">Right age for Leo</Pill><Pill tone="cream" icon="event_available">{recommendation.availableSlots} {recommendation.availableSlots === 1 ? 'spot' : 'spots'} left</Pill></View></View></View><Pressable accessibilityRole="button" accessibilityLabel={`View ${recommendation.activity.name} for Leo`} onPress={() => router.push({ pathname: '/activity/[activityId]/sessions', params: { activityId: recommendation.activity.id, sessionId: recommendation.session.id } })} className="min-h-14 border-t border-[#EBE4DE] px-5 flex-row items-center justify-between active:opacity-70"><Text className="text-sm font-semibold text-[#EE5E41]">See this session</Text><StitchIcon name="chevron_right" color={C.primary} /></Pressable></View> : null}
      <View className="gap-3"><View className="flex-row items-center justify-between"><Text className="text-lg font-bold">Explore an activity</Text><Button secondary onPress={() => router.navigate('/activities')}>See all</Button></View><View className="overflow-hidden rounded-2xl border border-[#E8DED8] bg-white"><Photo source={spotlight.image} height={184} /><View className="p-4 gap-2"><View className="flex-row items-center justify-between"><Pill icon="child_care">Ages 1–4 years</Pill><Text className="text-base font-bold text-[#EE5E41]">${spotlight.price}</Text></View><Text className="text-xl leading-7 font-semibold">{spotlight.name}</Text><Text className="text-sm leading-5 text-[#7C736E]">A calm, hands-on sensory session for little explorers.</Text><Button onPress={() => router.push(`/activity/${spotlight.id}`)}>View activity</Button></View></View></View>
    </View>
  </Page>;
}
