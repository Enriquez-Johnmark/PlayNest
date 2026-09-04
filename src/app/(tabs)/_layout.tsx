import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { C, StitchIcon, Text } from '@/components/stitch-ui';
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: C.primary, tabBarInactiveTintColor: C.muted, tabBarStyle: { height: 64 + insets.bottom, paddingTop: 6, paddingBottom: insets.bottom + 4, backgroundColor: '#FFFFFF', borderTopColor: C.border }, tabBarLabel: ({ color, children }) => <Text style={{ fontSize: 12, lineHeight: 16, fontWeight: '600', color }}>{children}</Text> }}>
    {([['home', 'Home', 'cottage'], ['activities', 'Activities', 'explore'], ['bookings', 'Bookings', 'event_available'], ['profile', 'Profile', 'person']] as const).map(([name, title, icon]) => <Tabs.Screen key={name} name={name} options={{ title, tabBarIcon: ({ color }) => <StitchIcon name={icon} size={22} color={color} /> }} />)}
  </Tabs>;
}
