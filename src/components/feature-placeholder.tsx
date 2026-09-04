import type { ComponentType } from 'react';
import { Text, View } from 'react-native';
import type { LucideProps } from 'lucide-react-native';

type FeaturePlaceholderProps = {
  Icon: ComponentType<LucideProps>;
  title: string;
  description: string;
};

export function FeaturePlaceholder({ Icon, title, description }: FeaturePlaceholderProps) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View className="mb-5 h-16 w-16 items-center justify-center rounded-full bg-[#FCE9DF]">
        <Icon color="#B94D31" size={30} strokeWidth={1.8} />
      </View>
      <Text className="text-center text-2xl font-semibold text-[#2F241F]">{title}</Text>
      <Text className="mt-3 max-w-xs text-center text-base leading-6 text-[#6F625C]">{description}</Text>
    </View>
  );
}
