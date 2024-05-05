import React from 'react';

import EmailStep from '@/features/login/EmailStep';
import WelcomeStep from '@/features/login/WelcomStep';
import { useFunnel } from '@/hooks/useFunnel';

const STEP = ['welcome', 'email', 'join', 'join-complete', 'certify'];
function LoginPage() {
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
        <Step name={STEP[2]}>Join</Step>
        <Step name={STEP[3]}>Join Complete</Step>
        <Step name={STEP[4]}>Certify</Step>
      </Funnel>
    </div>
  );
}

export default LoginPage;
