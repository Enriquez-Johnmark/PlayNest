import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import { BookingPass } from '@/components/booking-pass';
import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, Pill, StitchIcon, Text } from '@/components/stitch-ui';
import { demoRepository } from '@/data/demo-repository';
import { isBookingUpcoming } from '@/domain/booking-rules';
import type { BookingDetails } from '@/domain/types';
import { formatVenueDate } from '@/lib/datetime';
export default function BookingsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [past, setPast] = useState(false);
  const [error, setError] = useState(false);
  useFocusEffect(useCallback(() => { let active = true; setError(false); demoRepository.getState().then(async state => { const result = await Promise.all(state.bookings.map(item => demoRepository.getBookingDetails(item.id))); if (active) setBookings(result.filter((item): item is BookingDetails => item !== null).reverse()); }).catch(() => { if (active) setError(true); }); return () => { active = false; }; }, []));
  const upcoming = bookings.filter(item => isBookingUpcoming(item.booking, item.session, new Date()));
  const previous = bookings.filter(item => !isBookingUpcoming(item.booking, item.session, new Date()));
  return <Page header={<StitchHeader section="Bookings" />}>
    <View className="px-5 pt-4 pb-3 flex-row items-center justify-between gap-3"><View className="flex-1"><Text className="text-[26px] leading-8 font-bold tracking-tight">My Bookings</Text><Text className="mt-0.5 text-[13px] leading-5 text-[#7C736E]">Saved reservations and local demo passes</Text></View><Pill icon="info">Local demo</Pill></View>
    <View className="mx-5 mb-4 p-1 bg-[#F8F3EE] rounded-full border border-[#EBE4DE80] flex-row">{[false, true].map(value => <Pressable key={String(value)} accessibilityRole="tab" accessibilityState={{ selected: past === value }} onPress={() => setPast(value)} style={{ flex: 1, height: 44, backgroundColor: past === value ? C.primary : 'transparent', borderRadius: 999, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }}><Text style={{ fontSize: 14, lineHeight: 20, fontWeight: '600', color: past === value ? '#FFF' : C.muted }}>{value ? 'Past Sessions' : 'Upcoming'}</Text><Text style={{ color: past === value ? '#FFF' : C.muted, fontSize: 11, lineHeight: 16, backgroundColor: past === value ? '#FFFFFF40' : '#F1DFD7', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2 }}>{value ? previous.length : upcoming.length}</Text></Pressable>)}</View>
    <View className="px-5 gap-4">
      {error ? <Text accessibilityRole="alert" className="text-sm text-[#93000A]">Couldn’t load bookings. Please reopen this tab to retry.</Text> : null}
      {past ? previous.length ? previous.map(details => <View key={details.booking.id} className="p-4 bg-white rounded-2xl border border-[#EBE4DE] flex-row items-center gap-3"><StitchIcon name="brush" color={C.primary} /><View className="flex-1"><Text className="text-sm font-semibold">{details.activity.name}</Text><Text className="text-xs text-[#7C736E]">{formatVenueDate(details.session.startsAt)} • {details.booking.status} • {details.child.firstName}</Text></View><Button secondary onPress={() => router.push(`/activity/${details.activity.id}/sessions`)}>Rebook</Button></View>) : <View className="py-8 gap-3"><Text className="text-center text-[#7C736E]">No past sessions yet.</Text><Button secondary onPress={() => router.navigate('/activities')}>Explore Activities</Button></View> : <>
        {upcoming.map(details => <BookingPass key={details.booking.id} details={details} />)}
        {!upcoming.length && !error ? <View className="py-8 gap-3"><Text className="text-center text-[#7C736E]">No upcoming bookings yet.</Text><Button onPress={() => router.navigate('/activities')}>Explore Activities</Button></View> : null}
      </>}
    </View>
  </Page>;
}
