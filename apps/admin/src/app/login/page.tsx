'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isButtonDisabled = email === '' || password === '';

  const handleLogin = () => {
    console.log(email, password);
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
