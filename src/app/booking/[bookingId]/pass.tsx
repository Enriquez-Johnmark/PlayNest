import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { View } from 'react-native';
import { BookingPass } from '@/components/booking-pass';
import { StitchHeader } from '@/components/stitch-header';
import { Page, Text } from '@/components/stitch-ui';
import { RouteState } from '@/components/route-state';
import { demoRepository } from '@/data/demo-repository';
import { isBookingUpcoming } from '@/domain/booking-rules';
import { useLoadState } from '@/lib/use-load-state';
export default function CheckInPassScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const { value: details, status, reload } = useLoadState(useCallback(() => demoRepository.getBookingDetails(bookingId), [bookingId]));
  if (status === 'error') return <RouteState kind="error" title="We couldn’t load your pass" description="Your booking is preserved. Please try again." onAction={reload} />;
  if (status === 'ready' && (!details || !isBookingUpcoming(details.booking, details.session, new Date()))) return <RouteState kind="missing" title="Pass unavailable" description="Passes are available for confirmed upcoming bookings." actionLabel="View bookings" onAction={() => router.replace('/bookings')} />;
  return <Page header={<StitchHeader section="Check-in pass" backLabel="Back to bookings" />}><View className="px-5 pt-5 gap-2"><Text className="text-2xl leading-8 font-bold">Check-in pass</Text><Text className="text-sm leading-5 text-[#7C736E]">Keep this ready for reception.</Text>{details ? <BookingPass details={details} showPass /> : <Text className="text-sm text-[#7C736E]">Loading your pass…</Text>}</View></Page>;
}
