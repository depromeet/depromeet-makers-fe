import { useEffect } from 'react';
import { Alert } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { openSettings } from 'expo-linking';
import * as Location from 'expo-location';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { useColorScheme } from '@/hooks/useColorScheme';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const initApp = async () => {
  await SplashScreen.preventAutoHideAsync();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await SplashScreen.hideAsync();
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('위치 정보 사용 설정', '내 위치 확인을 위해 설정에서 위치 정보 사용을 허용해주세요.', [
          { text: '취소', style: 'cancel' },
          { text: '설정', onPress: () => openSettings() },
        ]);
        return;
      }
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}
