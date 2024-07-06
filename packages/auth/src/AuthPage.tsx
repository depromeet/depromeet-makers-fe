import { useState } from 'react';
import type { GetServerSideProps } from 'next';

import { COOKIE_KEY } from '~/constants/cookie';
import CertifyStep from '~/features/login/CertifyStep';
import EmailStep from '~/features/login/EmailStep';
import JoinCompleteStep from '~/features/login/JoinCompleteStep';
import JoinStep from '~/features/login/JoinStep';
import WelcomeStep from '~/features/login/WelcomeStep';
import { useFunnel } from '~/hooks/useFunnel';
import { Metadata } from '~/components/Metadata';
import { cookieStringToObject } from '~/utils/cookie';

const STEP = {
  WELCOME: 'welcome',
  EMAIL: 'email',
  JOIN: 'join',
  JOIN_COMPLETE: 'join-complete',
  CERTIFY: 'certify',
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookieStringToObject(context.req?.headers?.cookie || '');

  if (cookies[COOKIE_KEY.ACCESS_TOKEN]) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export function LoginPage() {
  const { Funnel, Step, setStep } = useFunnel(STEP.WELCOME);

  const [email, setEmail] = useState('');

  return (
    <div>
      <Metadata />

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
          <JoinCompleteStep />
        </Step>
        <Step name={STEP.CERTIFY}>
          <CertifyStep email={email} onBack={() => setStep(STEP.EMAIL)} />
        </Step>
      </Funnel>
    </div>
  );
}
