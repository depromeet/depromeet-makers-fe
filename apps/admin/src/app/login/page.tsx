'use client';

import { useRouter } from 'next/navigation';
import { useAuthTest } from '@depromeet-makers/api';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const router = useRouter();

  const { mutate: login } = useAuthTest();

  const handleLogin = () => {
    login(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-[400px]  rounded-[12px]">
        <CardHeader>
          <CardTitle className="text-center text-[20px] text-gray-900 font-[600]">디프만 어드민</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full h-[58px] mt-2 font-semibold text-[16px] rounded-[12px]" onClick={handleLogin}>
            로그인
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
