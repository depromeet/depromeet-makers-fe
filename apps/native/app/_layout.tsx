import { useEffect } from 'react';
import { Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { openSettings } from 'expo-linking';
import * as Location from 'expo-location';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import AuthProvider from '@/context/AuthProvider';
import { useColorScheme } from '@/hooks/useColorScheme';

import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

const initApp = async () => {
  await SplashScreen.preventAutoHideAsync();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await SplashScreen.hideAsync();
};

const getLocationPermission = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('위치 정보 사용 설정', '내 위치 확인을 위해 설정에서 위치 정보 사용을 허용해주세요.', [
      { text: '취소', style: 'cancel' },
      { text: '설정', onPress: () => openSettings() },
    ]);

    return;
  }
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
    getLocationPermission();
  }, []);

  useEffect(() => {
    initializeKakaoSDK('TODO: app key 추가');
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
