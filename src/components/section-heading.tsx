import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

type SectionHeadingProps = {
  title: string;
  action?: ReactNode;
};

export function SectionHeading({ title, action }: SectionHeadingProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-lg font-semibold text-[#2F241F]">{title}</Text>
      {action}
    </View>
  );
}
