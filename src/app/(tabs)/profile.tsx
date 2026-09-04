import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Pressable, View } from 'react-native';

import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, Pill, StitchIcon, Text } from '@/components/stitch-ui';
import { demoRepository } from '@/data/demo-repository';
import type { Child, DemoState } from '@/domain/types';
import { useLoadState } from '@/lib/use-load-state';

function ChildCard({ child }: { child: Child }) {
  const birthday = new Intl.DateTimeFormat('en-PH', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(`${child.dateOfBirth}T00:00:00`));
  return <View className="p-4 rounded-2xl border border-[#EBE4DE] bg-white flex-row items-center gap-3"><View className="w-12 h-12 rounded-xl bg-[#E3F5F3] items-center justify-center"><Text className="text-lg font-bold text-[#215954]">{child.firstName[0]}</Text></View><View className="flex-1"><Text className="text-base font-bold">{child.firstName} {child.lastName}</Text><Text className="mt-0.5 text-xs text-[#7C736E]">Born {birthday}</Text></View><Pill icon="child_care">Child</Pill></View>;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { value: state, status, reload } = useLoadState(useCallback(() => demoRepository.getState(), []));
  function reset() { Alert.alert('Reset demo data?', 'This removes bookings created on this device and restores the sample family and sessions.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Reset demo', style: 'destructive', onPress: () => { void demoRepository.reset().then(() => { void reload(); Alert.alert('Demo reset', 'Your sample family and available sessions are ready for a new booking.'); }).catch(() => Alert.alert('Reset failed', 'Please try again.')); } }]); }
  const family = state as DemoState | undefined;
  return <Page mint="#E3F5F3" header={<StitchHeader section="Profile" />}><View className="px-5 pt-5 pb-8 gap-7">
    <View><Text className="text-2xl leading-8 font-bold tracking-tight">Your family</Text><Text className="mt-1 text-sm leading-5 text-[#7C736E]">The sample family used in this local demo.</Text></View>
    <View className="p-5 rounded-2xl border border-[#EBE4DE] bg-white gap-1"><Text className="text-lg font-bold">{family?.user.name || 'Loading family…'}</Text><Text className="text-sm text-[#7C736E]">{family?.user.email || 'Your booking contact'}</Text><View className="mt-3 flex-row items-center gap-2"><StitchIcon name="info" size={17} color={C.teal} /><Text className="flex-1 text-xs leading-4 text-[#215954]">This is a local demo. Changes and bookings stay on this device.</Text></View></View>
    <View className="gap-3"><Text className="text-lg font-bold">Children</Text>{family?.children.map((child) => <ChildCard key={child.id} child={child} />)}{status === 'error' ? <Button secondary onPress={reload}>Try again</Button> : null}</View>
    <View className="rounded-2xl border border-[#E8DED8] bg-white p-4 gap-2"><View className="flex-row items-center gap-2"><StitchIcon name="favorite" color={C.primary} /><Text className="text-base font-bold">Booking notes</Text></View><Text className="text-sm leading-5 text-[#7C736E]">You can add an optional care note while making a booking. It is saved only with that reservation.</Text></View>
    <Pressable accessibilityRole="button" accessibilityLabel="Reset local demo data" onPress={reset} className="min-h-12 items-center justify-center"><Text className="text-sm font-semibold text-[#7C736E]">Reset local demo data</Text></Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel="Log out" onPress={() => router.replace('/')} className="min-h-12 items-center justify-center"><Text className="text-sm font-semibold text-[#EE5E41]">Log out</Text></Pressable>
  </View></Page>;
}
