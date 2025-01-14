import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
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
        alert('위치 권한이 필요합니다.');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
