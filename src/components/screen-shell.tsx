import type { PropsWithChildren } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenShellProps = PropsWithChildren<ScrollViewProps>;

export function ScreenShell({ children, contentContainerClassName, ...props }: ScreenShellProps) {
  return (
    <SafeAreaView className="flex-1 bg-[#FFF8F6]" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerClassName={`px-5 pb-12 ${contentContainerClassName ?? ''}`}
        showsVerticalScrollIndicator={false}
        {...props}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
