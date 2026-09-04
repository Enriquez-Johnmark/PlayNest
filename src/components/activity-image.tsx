import { Image, type ImageStyle, View, type ViewStyle } from 'react-native';

import type { Activity } from '@/domain/types';

const images = {
  'toddler-time': require('../../assets/images/activities/toddler-time.png'),
  'little-explorers': require('../../assets/images/activities/little-explorers.png'),
  'junior-gymnastics': require('../../assets/images/activities/junior-gymnastics.png'),
  'open-play': require('../../assets/images/activities/open-play.png'),
} as const;

type ActivityImageProps = {
  activity: Pick<Activity, 'imageKey' | 'name'>;
  className?: string;
  imageStyle?: ImageStyle;
  style?: ViewStyle;
};

/** Local, deliberately cropped imagery. Keep photos offline rather than depending on a Stitch URL. */
export function ActivityImage({ activity, className = '', imageStyle, style }: ActivityImageProps) {
  const source = images[activity.imageKey as keyof typeof images];

  return (
    <View className={`overflow-hidden bg-[#F6E3BA] ${className}`} style={style}>
      <Image accessibilityLabel={`${activity.name} activity`} source={source} resizeMode="cover" className="h-full w-full" style={imageStyle} />
    </View>
  );
}
