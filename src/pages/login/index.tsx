import React from 'react';
import { useRouter } from 'next/router';

import EmailStep from '@/features/login/EmailStep';
import JoinCompleteStep from '@/features/login/JoinCompleteStep';
import JoinStep from '@/features/login/JoinStep';
import WelcomeStep from '@/features/login/WelcomStep';
import { useFunnel } from '@/hooks/useFunnel';

const STEP = ['welcome', 'email', 'join', 'join-complete', 'certify'];
function LoginPage() {
  const router = useRouter();
  const { Funnel, Step, setStep } = useFunnel(STEP[0]);

  return (
    <div>
      <Funnel>
        <Step name={STEP[0]}>
          <WelcomeStep onNext={() => setStep(STEP[1])} />
        </Step>
        <Step name={STEP[1]}>
          <EmailStep
            onBack={() => setStep(STEP[0])}
            onNext={(type) => (type === 'join' ? setStep(STEP[2]) : setStep(STEP[4]))}
          />
        </Step>
        <Step name={STEP[2]}>
          <JoinStep onBack={() => setStep(STEP[1])} onNext={() => setStep(STEP[3])} />
        </Step>
        <Step name={STEP[3]}>
          <JoinCompleteStep onNext={() => router.push('/')} />
        </Step>
        <Step name={STEP[4]}>Certify</Step>
      </Funnel>
    </div>
  );
}

export default LoginPage;
