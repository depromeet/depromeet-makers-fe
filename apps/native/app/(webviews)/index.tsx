import { Linking, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import type { ShouldStartLoadRequest } from 'react-native-webview/lib/WebViewTypes';
import Constants from 'expo-constants';

const WebviewScreen = () => {
  const handleShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    if (event.url.startsWith('kakaomap://') || event.url.startsWith('https://map.kakao.com')) {
      try {
        Linking.openURL(event.url).catch(() => {
          const url = new URL(event.url.replace('kakaomap://', 'https://'));
          const address = url.searchParams.get('q');
          const coordinates = url.searchParams.get('p');
          const browserUrl = `https://map.kakao.com/link/to/${encodeURIComponent(address!)},${coordinates}`;

          Linking.openURL(browserUrl).catch((error) => {
            console.error('browser URL 오류:', error);
          });
        });
      } catch (error) {
        console.error('딥링크 처리 중 오류:', error);
      }
      return false;
    }
    return true;
  };

  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://makers.depromeet.com/' }}
      webviewDebuggingEnabled
      allowsbackforwardnavigationgestures
      javaScriptEnabled
      startInLoadingState
      geolocationEnabled
      onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default WebviewScreen;
