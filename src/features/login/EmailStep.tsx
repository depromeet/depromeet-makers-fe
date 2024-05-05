import React, { useState } from 'react';

import Input from '@/components/Input';

import LoginLayout from './LoginLayout';

interface Props {
  onNext: (type: 'join' | 'login') => void;
  onBack: () => void;
}

function EmailStep(props: Props) {
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    // TODO : email validation
    // 임시 valid
    if (email.indexOf('login') !== -1) {
      props.onNext('login');
    } else {
      props.onNext('join');
    }
  };

  return (
    <LoginLayout
      title={`디프만 지원 시 \n사용했던 이메일을 입력해 주세요.`}
      onBack={props.onBack}
      buttonProps={{
        children: '다음',
        onClick: onSubmit,
        disabled: !email,
      }}
    >
      <Input placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
    </LoginLayout>
  );
}

export default EmailStep;
