'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { COOKIE_KEY } from '@/constants/cookie';
import { postLogin } from '@/hooks/apis/auth/postLogin';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isButtonDisabled = email === '' || password === '';

  const handleLogin = async () => {
    try {
      const res = await postLogin({ email, passCord: password });

      if (res.currentRole === 'ORGANIZER') {
        Cookies.set(COOKIE_KEY.ACCESS_TOKEN, res.accessToken, { expires: 1 });
        Cookies.set(COOKIE_KEY.REFRESH_TOKEN, res.refreshToken, { expires: 7 });
        Cookies.set(COOKIE_KEY.CURRENT_ROLE, res.currentRole, { expires: 7 });
        router.replace('/');
      } else {
        alert('권한이 없습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-[400px]  rounded-[12px]">
        <CardHeader>
          <CardTitle className="text-center text-[20px] text-gray-900 font-[600]">디프만 어드민</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="이메일을 입력해주세요."
              className="h-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              className="h-11"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full h-[58px] mt-2 font-semibold text-[16px] rounded-[12px]"
            disabled={isButtonDisabled}
            onClick={handleLogin}
          >
            로그인
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
