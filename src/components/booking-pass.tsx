import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import type { BookingDetails } from '@/domain/types';
import { formatVenueDate, formatVenueTime } from '@/lib/datetime';
import { C, StitchIcon, Text } from './stitch-ui';

export function BookingPass({ details, showPass = false }: { details: BookingDetails; showPass?: boolean }) {
  const router = useRouter();
  const { activity, booking, child, session } = details;
  const schedule = `${formatVenueDate(session.startsAt)} · ${formatVenueTime(session.startsAt)}`;
  return <View className="rounded-2xl border border-[#E8DED8] bg-white overflow-hidden">
    <View className="p-5 gap-4"><View className="flex-row items-center justify-between gap-3"><View className="rounded-full bg-[#D3F2EF] px-3 py-1.5"><Text className="text-xs font-semibold text-[#215954]">Confirmed</Text></View><Text className="text-xs font-semibold text-[#7C736E]">{booking.reference}</Text></View>
      <View className="gap-1"><Text className="text-xl leading-7 font-bold">{activity.name}</Text><Text className="text-sm leading-5 text-[#7C736E]">{child.firstName} is attending</Text></View>
      <View className="border-t border-[#EBE4DE]" />
      <View className="gap-3"><View className="flex-row items-center gap-3"><StitchIcon name="calendar_today" size={19} color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">When</Text><Text className="text-sm font-semibold">{schedule}</Text></View></View><View className="flex-row items-center gap-3"><StitchIcon name="location_on" size={19} color={C.primary} /><View className="flex-1"><Text className="text-xs text-[#7C736E]">Where</Text><Text className="text-sm font-semibold">{activity.locationName}</Text></View></View></View>
    </View>
    {showPass ? <View className="border-t border-[#EBE4DE] bg-[#FCFAF8] p-5 items-center gap-3"><View className="rounded-2xl border border-[#EBE4DE] bg-white p-3"><QRCode value={`playnest-demo:${booking.reference}`} size={164} color={C.ink} backgroundColor="#FFF" /></View><Text selectable className="text-xs font-bold tracking-[3px]">{booking.reference}</Text><Text className="text-center text-xs leading-5 text-[#7C736E]">Show this code at reception. It is a demo pass and does not validate admission.</Text></View> : <Pressable accessibilityRole="button" accessibilityLabel={`Show check-in pass for ${activity.name}`} onPress={() => router.push(`/booking/${booking.id}/pass`)} className="min-h-14 border-t border-[#EBE4DE] px-5 flex-row items-center justify-between active:opacity-70"><Text className="text-sm font-semibold text-[#EE5E41]">Show check-in pass</Text><StitchIcon name="chevron_right" color={C.primary} /></Pressable>}
  </View>;
}
