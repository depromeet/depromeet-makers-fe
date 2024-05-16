import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CertifyStep from '@/features/login/CertifyStep';
import EmailStep from '@/features/login/EmailStep';
import JoinCompleteStep from '@/features/login/JoinCompleteStep';
import JoinStep from '@/features/login/JoinStep';
import WelcomeStep from '@/features/login/WelcomStep';
import { useFunnel } from '@/hooks/useFunnel';

const STEP = ['welcome', 'email', 'join', 'join-complete', 'certify'];
function LoginPage() {
  const router = useRouter();

  const { Funnel, Step, setStep } = useFunnel(STEP[0]);

  const [email, setEmail] = useState('');

  // TODO: 로그인 임시 코드
  const handleCompleteSignUp = () => {
    localStorage.setItem('isAuthenticated', 'true');

    router.push('/');
  };

  return (
    <div>
      <Funnel>
        <Step name={STEP[0]}>
          <WelcomeStep onNext={() => setStep(STEP[1])} />
        </Step>
        <Step name={STEP[1]}>
          <EmailStep
            onBack={() => setStep(STEP[0])}
            onNext={(type, email) => {
              type === 'join' ? setStep(STEP[2]) : setStep(STEP[4]);
              setEmail(email);
            }}
          />
        </Step>
        <Step name={STEP[2]}>
          <JoinStep email={email} onBack={() => setStep(STEP[1])} onNext={() => setStep(STEP[3])} />
        </Step>
        <Step name={STEP[3]}>
          <JoinCompleteStep onNext={handleCompleteSignUp} />
        </Step>
        <Step name={STEP[4]}>
          <CertifyStep email={email} onNext={handleCompleteSignUp} onBack={() => setStep(STEP[1])} />
        </Step>
      </Funnel>
    </div>
  );
}

export default LoginPage;
