import { StyleSheet, Text, View } from 'react-native';
import { Pressable } from 'react-native-gesture-handler';
import { login } from '@react-native-kakao/user';

import { Colors } from '@/constants/Colors';

const LoginScreen = () => {
  const handleKakaoLogin = async () => {
    // TODO: 카카오 로그인 처리 추가 필요
    try {
      const response = await login();
      console.log('kakao login response', response);
    } catch (error) {
      console.error('kakao login error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>로그인 화면</Text>
      <Pressable style={styles.kakaoLoginButton} onPress={handleKakaoLogin}>
        <Text>카카오로 시작하기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kakaoLoginButton: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.kakaoYellowBackground,
    borderRadius: 12,
  },
});

export default LoginScreen;
