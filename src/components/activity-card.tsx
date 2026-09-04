import { ArrowRight, Clock3 } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { ActivityImage } from '@/components/activity-image';
import { formatPeso } from '@/lib/currency';
import type { Activity } from '@/domain/types';

type ActivityCardProps = {
  activity: Activity;
  onPress: () => void;
};

export function ActivityCard({ activity, onPress }: ActivityCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`View ${activity.name}`}
      className="overflow-hidden rounded-2xl border border-[#E9DDD6] bg-white active:bg-[#FFF8F4]"
      onPress={onPress}>
      <ActivityImage activity={activity} className="h-40" />
      <View className="p-4">
        <View className="flex-row items-start justify-between gap-3">
          <Text className="flex-1 text-lg font-semibold text-[#2F241F]">{activity.name}</Text>
          <View className="rounded-full bg-[#FFF0EB] px-2.5 py-1">
            <Text className="text-xs font-semibold text-[#A6442A]">Ages {activity.minAge}–{activity.maxAge}</Text>
          </View>
        </View>
        <Text className="mt-2 text-sm leading-5 text-[#6F625C]">{activity.shortDescription}</Text>
        <View className="mt-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Clock3 color="#766760" size={16} strokeWidth={2} />
            <Text className="text-sm text-[#6F625C]">{activity.durationMinutes} minutes</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <Text className="font-semibold text-[#2F241F]">{formatPeso(activity.priceMinor)}</Text>
            <ArrowRight color="#B94D31" size={18} strokeWidth={2.25} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
