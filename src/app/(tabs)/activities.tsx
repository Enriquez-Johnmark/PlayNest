import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';

import { StitchHeader } from '@/components/stitch-header';
import { Button, C, Page, Photo, Pill, StitchIcon, Text } from '@/components/stitch-ui';
import { stitchCatalog } from '@/data/stitch-catalog';

const ageFilters = [
  ['all', 'All ages'],
  ['baby', '0–1 year'],
  ['toddler', '1–3 years'],
  ['preschool', '3–5 years'],
] as const;

export default function ActivitiesScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [age, setAge] = useState<(typeof ageFilters)[number][0]>('all');
  const activities = useMemo(() => stitchCatalog.filter((activity) => {
    const matchesSearch = `${activity.name} ${activity.description}`.toLowerCase().includes(search.trim().toLowerCase());
    const matchesAge = age === 'all' || (age === 'baby' && activity.maxAge <= 1) || (age === 'toddler' && activity.minAge <= 3 && activity.maxAge >= 1) || (age === 'preschool' && activity.minAge <= 5 && activity.maxAge >= 3);
    return matchesSearch && matchesAge;
  }), [age, search]);

  return <Page header={<StitchHeader section="Activities" />}>
    <View className="px-5 pt-4 pb-3 gap-4">
      <View><Text className="text-2xl leading-8 font-bold tracking-tight">Find an activity</Text><Text className="mt-1 text-sm leading-5 text-[#7C736E]">Choose an activity, then see the available sessions.</Text></View>
      <View className="h-12 rounded-xl bg-white border border-[#E8DED8] flex-row items-center px-3 gap-2"><StitchIcon name="search" color={C.muted} /><TextInput accessibilityLabel="Search activities" value={search} onChangeText={setSearch} placeholder="Search activities" placeholderTextColor={C.muted} returnKeyType="search" className="flex-1 text-sm" style={{ fontFamily: 'Jakarta', color: C.ink }} /></View>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 12, gap: 8 }}>
      {ageFilters.map(([id, label]) => <Pressable key={id} accessibilityRole="button" accessibilityState={{ selected: age === id }} onPress={() => setAge(id)} style={{ minHeight: 40, paddingHorizontal: 16, borderRadius: 999, justifyContent: 'center', backgroundColor: age === id ? C.primary : '#F5EFE9' }}><Text style={{ fontSize: 13, fontWeight: '600', color: age === id ? '#FFF' : C.ink }}>{label}</Text></Pressable>)}
    </ScrollView>
    <View className="px-5 pb-8 gap-4">
      {activities.map((activity) => <Pressable key={activity.id} accessibilityRole="button" accessibilityLabel={`View ${activity.name}`} onPress={() => router.push(`/activity/${activity.id}`)} className="overflow-hidden rounded-2xl border border-[#E8DED8] bg-white active:opacity-80">
        <Photo source={activity.image} height={176} />
        <View className="p-4 gap-2.5"><View className="flex-row items-center justify-between gap-3"><Pill icon="child_care">Ages {activity.age}</Pill><Text className="text-base font-bold text-[#EE5E41]">${activity.price}</Text></View><Text className="text-lg leading-6 font-bold">{activity.name}</Text><Text numberOfLines={2} className="text-sm leading-5 text-[#7C736E]">{activity.description}</Text><View className="pt-1 border-t border-[#EBE4DE] gap-2"><View className="flex-row items-start gap-1.5"><StitchIcon name="schedule" size={16} color={C.teal} /><Text className="flex-1 text-sm leading-5 font-semibold text-[#215954]">{activity.availability}</Text></View><Text className="text-sm font-semibold text-[#EE5E41]">View activity ›</Text></View></View>
      </Pressable>)}
      {!activities.length ? <View className="py-8 gap-3"><Text className="text-center text-[#7C736E]">No activities match your search.</Text><Button secondary onPress={() => { setSearch(''); setAge('all'); }}>Show all activities</Button></View> : null}
    </View>
  </Page>;
}
