import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, Pill, StitchIcon, Text } from '@/components/stitch-ui';
import { RouteState } from '@/components/route-state';
import { demoRepository } from '@/data/demo-repository';
import { formatVenueDate, formatVenueTime } from '@/lib/datetime';
import { useLoadState } from '@/lib/use-load-state';
function ConfirmationSeal() {
  return <View className="relative w-24 h-24 rounded-full bg-white border border-[#EBE4DE] p-2 mb-4"><Svg width="100%" height="100%" viewBox="0 0 100 100"><Circle cx="50" cy="50" r="42" stroke="#D5E6E5" strokeDasharray="4 4" strokeWidth="2.5" fill="none" /><Path fill={C.primary} d="M50 14L52.5 22.5L61 25L52.5 27.5L50 36L47.5 27.5L39 25L47.5 22.5L50 14Z" /><Path fill={C.brown} opacity="0.75" d="M78 44L79.5 49.5L85 51L79.5 52.5L78 58L76.5 52.5L71 51L76.5 49.5L78 44Z" /><Path fill={C.teal} opacity="0.6" d="M22 62L23.5 67.5L29 69L23.5 70.5L22 76L20.5 70.5L15 69L20.5 67.5L22 62Z" /><Path fill={C.teal} d="M38 56C38 46.0589 46.0589 38 56 38C57.1046 38 58 38.8954 58 40C58 52.1503 48.1503 62 36 62C36 60.8954 36.8954 60 38 60V56Z" /><Path stroke="#D5E6E5" strokeWidth="2" strokeLinecap="round" d="M42 62C42 54.268 48.268 48 56 48" fill="none" /></Svg><View className="absolute -bottom-1 -right-1 rounded-full bg-[#215954] p-1.5"><StitchIcon name="check" size={16} color="#FFF" /></View></View>;
}
export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { value: details, status, reload } = useLoadState(useCallback(() => demoRepository.getBookingDetails(bookingId), [bookingId]));
  if (status === 'error') return <RouteState kind="error" title="We couldn’t load your confirmation" description="Your booking is preserved. Please try again." onAction={reload} />;
  if (status === 'ready' && !details) return <RouteState kind="missing" title="Booking not found" description="This booking is no longer available." actionLabel="View bookings" onAction={() => router.replace('/bookings')} />;
  return <Page header={<StitchHeader section="Booking confirmation" />}><View className="px-5 pt-4 pb-10">
    <View className="items-center mt-3 mb-6"><ConfirmationSeal /><View className="mb-3"><Pill icon="celebration">SPOT RESERVED</Pill></View><Text className="text-[26px] leading-8 font-bold tracking-tight text-center mb-2">You&apos;re Booked for Play!</Text><Text className="text-sm leading-[23px] text-[#7C736E] text-center max-w-[300px]">Your reservation is saved on this device. This demo does not send email or calendar invites.</Text></View>
    <View className="p-5 rounded-2xl bg-white border border-[#EBE4DE] mb-4"><View className="flex-row items-start justify-between gap-3 mb-4"><View className="flex-1"><Text className="text-[11px] leading-4 font-bold text-[#EE5E41] tracking-wider mb-1">SENSORY WORKSHOP</Text><Text numberOfLines={1} className="text-lg leading-6 font-bold">{details?.activity.name}</Text></View><View className="w-10 h-10 rounded-full bg-[#D5E6E599] items-center justify-center"><StitchIcon name="forest" size={22} color={C.teal} /></View></View><View className="pt-1 border-t border-[#EBE4DE80] gap-3">{[['face', 'CHILD', details?.child.firstName || 'Loading…'], ['event', 'DATE & TIME', details ? `${formatVenueDate(details.session.startsAt)} • ${formatVenueTime(details.session.startsAt)}` : ''], ['pin_drop', 'LOCATION', details?.activity.id === 'act_forest' ? 'The Willow Studio • Room 2B' : details?.activity.locationName || '']].map(([icon, label, value]) => <View key={label} className="flex-row items-center gap-3"><View className="w-8 h-8 rounded-full bg-[#F6F3F0] items-center justify-center"><StitchIcon name={icon} size={18} color={C.teal} /></View><View className="flex-1"><Text className="text-[11px] leading-4 tracking-wider text-[#7C736E]">{label}</Text><Text className="text-sm font-semibold">{value}</Text></View></View>)}</View></View>
    <View className="p-4 rounded-2xl bg-[#D5E6E566] border border-[#D5E6E5] mb-7 flex-row items-start gap-3"><StitchIcon name="qr_code_2" color={C.teal} /><View className="flex-1"><Text className="text-sm font-bold text-[#215954]">Your pass is in My Bookings</Text><Text className="mt-0.5 text-xs leading-5 text-[#59413C]">Open it when you arrive at the activity center.</Text></View></View>
    <View className="gap-3"><Button textSize={15} bold minHeight={52} disabled={!details} onPress={() => router.replace('/bookings')}>View booking</Button><Pressable onPress={() => router.replace('/home')} className="min-h-12 items-center justify-center"><Text className="text-sm font-semibold text-[#EE5E41]">Back to home</Text></Pressable></View>
  </View></Page>;
}
