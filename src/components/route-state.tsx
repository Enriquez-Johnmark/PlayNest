import { CircleAlert, FileQuestion, RefreshCw } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { ScreenShell } from './screen-shell';

type RouteStateProps = {
  actionLabel?: string;
  description: string;
  kind: 'error' | 'missing';
  onAction: () => void;
  title: string;
};

export function RouteState({ actionLabel, description, kind, onAction, title }: RouteStateProps) {
  const isError = kind === 'error';
  const Icon = isError ? CircleAlert : FileQuestion;

  return (
    <ScreenShell>
      <View className="items-center px-2 pt-12">
        <View className={`h-14 w-14 items-center justify-center rounded-full ${isError ? 'bg-[#FCE9E7]' : 'bg-[#F2FAF8]'}`}>
          <Icon color={isError ? '#B94D31' : '#176B66'} size={28} strokeWidth={2} />
        </View>
        <Text accessibilityRole="header" className="mt-5 text-center text-2xl font-semibold text-[#2F241F]">{title}</Text>
        <Text className="mt-3 text-center text-base leading-6 text-[#6F625C]">{description}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={actionLabel ?? 'Try again'}
          className="mt-7 h-12 self-stretch flex-row items-center justify-center gap-2 rounded-xl bg-[#CF5A3C] px-5 active:bg-[#B94D31]"
          onPress={onAction}>
          {isError ? <RefreshCw color="#FFFFFF" size={18} strokeWidth={2.25} /> : null}
          <Text className="font-semibold text-white">{actionLabel ?? 'Try again'}</Text>
        </Pressable>
      </View>
    </ScreenShell>
  );
}

