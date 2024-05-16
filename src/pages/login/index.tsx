import React, { useState } from 'react';
import { useRouter } from 'next/router';

import CertifyStep from '@/features/login/CertifyStep';
import EmailStep from '@/features/login/EmailStep';
import JoinCompleteStep from '@/features/login/JoinCompleteStep';
import JoinStep from '@/features/login/JoinStep';
import WelcomeStep from '@/features/login/WelcomeStep';
import { useFunnel } from '@/hooks/useFunnel';

const STEP = {
  WELCOME: 'welcome',
  EMAIL: 'email',
  JOIN: 'join',
  JOIN_COMPLETE: 'join-complete',
  CERTIFY: 'certify',
};

function LoginPage() {
  const router = useRouter();

  const { Funnel, Step, setStep } = useFunnel(STEP.WELCOME);

  const [email, setEmail] = useState('');

  // TODO: 로그인 임시 코드
  const handleCompleteSignUp = () => {
    localStorage.setItem('isAuthenticated', 'true');

    router.push('/');
  };

  return (
    <div>
      <Funnel>
        <Step name={STEP.WELCOME}>
          <WelcomeStep onNext={() => setStep(STEP.EMAIL)} />
        </Step>
        <Step name={STEP.EMAIL}>
          <EmailStep
            onBack={() => setStep(STEP.WELCOME)}
            onNext={(type, email) => {
              type === 'join' ? setStep(STEP.JOIN) : setStep(STEP.CERTIFY);
              setEmail(email);
            }}
          />
        </Step>
        <Step name={STEP.JOIN}>
          <JoinStep email={email} onBack={() => setStep(STEP.EMAIL)} onNext={() => setStep(STEP.JOIN_COMPLETE)} />
        </Step>
        <Step name={STEP.JOIN_COMPLETE}>
          <JoinCompleteStep onNext={handleCompleteSignUp} />
        </Step>
        <Step name={STEP.CERTIFY}>
          <CertifyStep email={email} onNext={handleCompleteSignUp} onBack={() => setStep(STEP.EMAIL)} />
        </Step>
      </Funnel>
    </div>
  );
}

export default LoginPage;
