import { cssInterop } from 'nativewind';
import { createContext, useContext, type PropsWithChildren, type ReactNode } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text as NativeText, type TextProps, type ColorValue, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/data/stitch-icons.json';

export const C = { background: '#FDF9F6', ink: '#2B221D', muted: '#7C736E', primary: '#EE5E41', border: '#E8DED8', teal: '#215954', mint: '#D3F2EF', cream: '#FDF1D0', brown: '#764D18', soft: '#FAF4EE' };
const StitchTheme = createContext({ surface: '#FCFAF7', ink: '#231A15', mint: '#D5E6E5' });
export const useStitchTheme = () => useContext(StitchTheme);
function JakartaText({ style, ...props }: TextProps & { className?: string }) {
  const theme = useStitchTheme();
  const flat = StyleSheet.flatten(style) || {};
  const weight = String(flat.fontWeight || '400');
  const fontFamily = Number(weight) >= 700 || weight === 'bold' ? 'JakartaBold' : Number(weight) >= 600 ? 'JakartaSemiBold' : Number(weight) >= 500 ? 'JakartaMedium' : 'Jakarta';
  return <NativeText {...props} style={[{ color: theme.ink, fontSize: 16, lineHeight: flat.lineHeight ?? (flat.fontSize ?? 16) * 1.5, includeFontPadding: false }, style, { fontFamily, fontWeight: 'normal' }]} />;
}
cssInterop(JakartaText, { className: 'style' });
export { JakartaText as Text };
export function StitchIcon({ name, size = 20, color = C.muted }: { name: string; size?: number; color?: ColorValue }) {
  const code = icons[name as keyof typeof icons] || icons.info;
  return <NativeText allowFontScaling={false} accessible={false} style={{ fontFamily: 'MaterialSymbols', fontSize: size, lineHeight: size, width: size, height: size, color, includeFontPadding: false }}>{String.fromCodePoint(code)}</NativeText>;
}
export function IconButton({ name, onPress, label, size = 40, iconSize = 20, tone = 'plain' }: { name: string; onPress: () => void; label: string; size?: number; iconSize?: number; tone?: 'plain' | 'soft' | 'white' | 'round' }) {
  return <Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={Math.max(0, (48 - size) / 2)} onPress={onPress} className="active:opacity-70" style={{ width: size, height: size, borderRadius: tone === 'soft' ? 12 : 999, backgroundColor: tone === 'white' ? '#FFFFFFF2' : tone === 'soft' || tone === 'round' ? C.soft : 'transparent', borderWidth: tone === 'soft' ? 1 : 0, borderColor: C.border, alignItems: 'center', justifyContent: 'center' }}><StitchIcon name={name} size={iconSize} /></Pressable>;
}
export function Pill({ children, icon, tone = 'mint', fontSize = 12, bold = false }: PropsWithChildren<{ fontSize?: number; bold?: boolean; icon?: string; tone?: 'mint' | 'cream' | 'soft' | 'white' | 'coral' }>) {
  const theme = useStitchTheme();
  const color = tone === 'mint' ? C.teal : tone === 'cream' ? C.brown : tone === 'coral' ? C.primary : tone === 'white' ? C.ink : C.muted;
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, backgroundColor: tone === 'mint' ? theme.mint : tone === 'cream' ? C.cream : tone === 'white' ? '#FFFFFFF2' : tone === 'coral' ? '#FFEDE8' : '#F5EFE9' }}>{icon ? <StitchIcon name={icon} size={14} color={color} /> : null}<JakartaText style={{ fontSize, lineHeight: 16, fontWeight: bold ? '700' : '600', color, flexShrink: 1 }}>{children}</JakartaText></View>;
}
export function Button({ children, icon, onPress, secondary = false, disabled = false, iconPosition = 'left', minHeight = 48, textSize = 14, bold = false }: PropsWithChildren<{ icon?: string; onPress: () => void; secondary?: boolean; disabled?: boolean; iconPosition?: 'left' | 'right'; minHeight?: number; textSize?: number; bold?: boolean }>) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} className="active:opacity-70" style={{ minHeight, paddingHorizontal: 18, paddingVertical: 12, borderRadius: 12, borderWidth: secondary ? 1 : 0, borderColor: C.border, backgroundColor: disabled ? C.border : secondary ? C.soft : C.primary, flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row', gap: 8, alignItems: 'center', justifyContent: 'center' }}>{icon ? <StitchIcon name={icon} size={18} color={secondary ? C.ink : '#FFF'} /> : null}<JakartaText style={{ fontSize: textSize, lineHeight: Math.max(20, textSize * 1.4), fontWeight: bold ? '700' : '600', color: secondary || disabled ? C.ink : '#FFF', flexShrink: 1 }}>{children}</JakartaText></Pressable>;
}
export function Page({ children, header, footer, surface = '#FCFAF7', ink = '#231A15', mint = '#D5E6E5' }: PropsWithChildren<{ header: ReactNode; footer?: ReactNode; surface?: string; ink?: string; mint?: string }>) {
  return <StitchTheme.Provider value={{ surface, ink, mint }}><SafeAreaView style={{ flex: 1, backgroundColor: surface }} edges={footer ? ['top', 'bottom'] : ['top']}>
    {header}<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>{children}</ScrollView>{footer ? <View style={{ padding: 16, paddingTop: 12, borderTopWidth: 1, borderColor: C.border, backgroundColor: surface }}>{footer}</View> : null}
  </SafeAreaView></StitchTheme.Provider>;
}
export function Photo({ source, height, radius = 0 }: { source: number; height: number; radius?: number }) { return <Image source={source} resizeMode="cover" style={{ width: '100%', height, borderRadius: radius }} />; }
export function demoNotice(feature: string) { Alert.alert(feature, 'This is a local design demo. This service is not connected yet.'); }
export const cardShadow = { boxShadow: '0 1px 2px rgba(43,34,29,0.05)' };
