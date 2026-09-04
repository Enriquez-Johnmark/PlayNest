import { Image, Text, View } from 'react-native';

type PlayNestMarkProps = { compact?: boolean };

/** The supplied Stitch mark, stored locally so it remains available offline. */
export function PlayNestMark({ compact = false }: PlayNestMarkProps) {
  return (
    <View className="flex-row items-center gap-2">
      <Image accessibilityLabel="PlayNest logo" source={require('../../assets/images/playnest-logo.png')} className="h-8 w-8 rounded-[11px]" />
      {!compact ? <Text className="text-lg font-bold tracking-tight text-[#2B211D]">PlayNest</Text> : null}
    </View>
  );
}
