import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950 px-6">
      <View className="flex-1 items-center justify-center gap-5">
        <View className="rounded-full border border-sky-300/30 bg-sky-300/10 px-4 py-2">
          <Text className="text-sm font-semibold text-sky-200">Foundation ready</Text>
        </View>
        <Text className="text-center text-5xl font-bold tracking-tight text-white">Playnest</Text>
        <Text className="max-w-sm text-center text-base leading-6 text-slate-300">
          Expo Router, Metro, and NativeWind are configured for your next screen.
        </Text>
      </View>
    </SafeAreaView>
  );
}
