'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthTest } from '@depromeet-makers/api';
import { REGEXP_ONLY_DIGITS } from 'input-otp';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { H1 } from '@/components/ui/typography';

const LOGIN_CODE_LENGTH = 6;

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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#dff9fb] to-[#ffffff]">
      <Link href="/" className="sticky top-0 h-16 p-4 font-bold">
        디프만 메이커스
      </Link>

      <main className="flex flex-col flex-1 gap-8 items-center justify-center">
        <H1 className="font-semibold text-3xl lg:text-4xl">디프만 앱으로 로그인</H1>

        <Card className="w-[400px] flex flex-col items-center rounded-2xl p-6">
          <CardHeader className="text-center p-0">
            <CardDescription className="text-base text-gray-500">
              디프만 앱에 표시되어 있는 번호를 입력해주세요
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8 w-full">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} autoFocus>
              <InputOTPGroup className="space-x-2">
                {Array.from({ length: LOGIN_CODE_LENGTH }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-12 border-gray-300 rounded-md border-l"
                    aria-label={`OTP 입력 ${index + 1}`}
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Button onClick={handleLogin} className="w-full">
              로그인
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
