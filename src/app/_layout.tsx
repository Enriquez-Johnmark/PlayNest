import '../global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, View } from 'react-native';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Jakarta: require('../../assets/fonts/PlusJakartaSans-Regular.ttf'),
    JakartaMedium: require('../../assets/fonts/PlusJakartaSans-Medium.ttf'),
    JakartaSemiBold: require('../../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    JakartaBold: require('../../assets/fonts/PlusJakartaSans-Bold.ttf'),
    MaterialSymbols: require('../../assets/fonts/MaterialSymbolsOutlined.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) void SplashScreen.hideAsync();
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) return <View className="flex-1 bg-[#FFF8F6] items-center justify-center"><Image source={require('../../assets/images/playnest-logo.png')} accessibilityLabel="PlayNest" style={{ width: 112, height: 112 }} /></View>;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="activity/[activityId]" />
        <Stack.Screen name="activity/[activityId]/sessions" />
        <Stack.Screen name="activity/[activityId]/child" />
        <Stack.Screen name="activity/[activityId]/review" />
        <Stack.Screen name="booking/[bookingId]" />
        <Stack.Screen name="booking/[bookingId]/confirmation" />
        <Stack.Screen name="booking/[bookingId]/pass" />
      </Stack>
    </>
  );
}
