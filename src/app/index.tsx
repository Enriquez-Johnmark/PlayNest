import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, C, Pill, StitchIcon, Text } from '@/components/stitch-ui';

const demoEmail = 'sarah@example.test';
const demoPassword = 'PlayNestDemo';

export default function DemoLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const useSarahDemo = () => { setEmail(demoEmail); setPassword(demoPassword); setError(null); };
  const signIn = () => {
    if (email.trim().toLowerCase() !== demoEmail || password !== demoPassword) {
      setError('Use Sarah’s demo credentials to enter this local preview.');
      return;
    }
    router.replace('/home');
  };

  return <SafeAreaView className="flex-1 bg-[#FFF8F6]" edges={['top', 'bottom']}>
    <View className="flex-1 px-5 py-6 justify-between">
      <View className="items-center pt-8 gap-5">
        <Image source={require('../../assets/images/playnest-logo.png')} accessibilityLabel="PlayNest logo" style={{ width: 88, height: 88 }} />
        <View className="items-center gap-2"><Text className="text-[30px] leading-9 font-bold tracking-tight">Welcome to PlayNest</Text><Text className="max-w-[280px] text-center text-sm leading-6 text-[#7C736E]">A calmer way to find the right activity for your child.</Text></View>
      </View>

      <View className="gap-4">
        <View className="rounded-2xl border border-[#E8DED8] bg-white p-5 gap-4">
          <View className="flex-row items-center justify-end"><Pill icon="verified">Demo</Pill></View>
          <View className="border-t border-[#EBE4DE]" />
          <View className="gap-2"><Text className="text-xs font-semibold text-[#59413C]">Email</Text><TextInput accessibilityLabel="Email" autoCapitalize="none" autoComplete="email" keyboardType="email-address" value={email} onChangeText={(value) => { setEmail(value); setError(null); }} placeholder="you@example.com" placeholderTextColor="#8D716BB3" style={{ minHeight: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12, backgroundColor: '#FFF', paddingHorizontal: 14, fontSize: 14, color: C.ink, fontFamily: 'Jakarta' }} /></View>
          <View className="gap-2"><Text className="text-xs font-semibold text-[#59413C]">Password</Text><TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="password" secureTextEntry value={password} onChangeText={(value) => { setPassword(value); setError(null); }} onSubmitEditing={signIn} placeholder="Enter password" placeholderTextColor="#8D716BB3" style={{ minHeight: 50, borderWidth: 1, borderColor: C.border, borderRadius: 12, backgroundColor: '#FFF', paddingHorizontal: 14, fontSize: 14, color: C.ink, fontFamily: 'Jakarta' }} /></View>
          {error ? <Text accessibilityRole="alert" className="text-xs leading-5 text-[#93000A]">{error}</Text> : null}
          <View className="flex-row items-start gap-2"><StitchIcon name="info" size={18} color={C.teal} /><Text className="flex-1 text-xs leading-5 text-[#59413C]">These are local demo credentials only. No information is sent or checked against a server.</Text></View>
        </View>
        <Button secondary minHeight={48} icon="person" onPress={useSarahDemo}>Use Sarah&apos;s demo</Button>
        <Button icon="arrow_forward" iconPosition="right" minHeight={54} textSize={16} bold onPress={signIn}>Sign in</Button>
      </View>

      <View className="items-center gap-2 pb-1"><Text className="text-xs leading-5 text-center text-[#7C736E]">Explore real local booking, eligibility, and availability states.</Text><Text className="text-xs font-semibold text-[#215954]">Play. Learn. Grow.</Text></View>
    </View>
  </SafeAreaView>;
}
