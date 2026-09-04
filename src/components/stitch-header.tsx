import { useRouter } from 'expo-router';
import { Image, Pressable, View } from 'react-native';
import { C, IconButton, Text, useStitchTheme } from './stitch-ui';
import { stitchAssets } from '@/data/stitch-assets';
export function StitchHeader({ section, backLabel }: { section: string; backLabel?: string }) {
  const theme = useStitchTheme();
  const router = useRouter();
  return <View style={{ height: 64, paddingHorizontal: backLabel ? 12 : 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderColor: '#E8DED899', backgroundColor: theme.surface }}>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: backLabel ? 6 : 10 }}>
      {backLabel ? <IconButton name="arrow_back" iconSize={22} label={backLabel} onPress={() => router.canGoBack() ? router.back() : router.replace('/home')} /> : null}
      <Image source={require('../../assets/images/playnest-logo.png')} accessibilityLabel="PlayNest logo" style={{ width: backLabel ? 32 : 40, height: backLabel ? 32 : 40 }} resizeMode="contain" />
      {backLabel ? <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, lineHeight: 22, fontWeight: '600' }}>{section}</Text> : <View><Text style={{ fontSize: 18, lineHeight: 22, fontWeight: '700', color: C.ink }}>PlayNest</Text><Text style={{ fontSize: 12, lineHeight: 16, color: C.muted }}>{section}</Text></View>}
    </View>
    <Pressable accessibilityRole="button" accessibilityLabel="Parent Profile" onPress={() => router.navigate('/profile')} style={{ width: backLabel ? 40 : 48, height: 48, justifyContent: 'center', alignItems: 'center' }}><Image source={stitchAssets.playnest_home_discovery[1]} style={{ width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#EE5E4133' }} /></Pressable>
  </View>;
}
