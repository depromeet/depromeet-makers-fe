import React, { useState } from 'react';

import Input from '@/components/Input';

import LoginLayout from './LoginLayout';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

function EmailStep(props: Props) {
  const [email, setEmail] = useState('');

  return (
    <LoginLayout
      title="디프만 지원 시 사용했던 이메일을 입력해 주세요."
      onBack={props.onBack}
      buttonProps={{
        children: '다음',
        onClick: props.onNext,
        disabled: !email,
      }}
    >
      <Input placeholder="이메일을 입력해주세요." value={email} onChange={(e) => setEmail(e.target.value)} />
    </LoginLayout>
  );
}

export default EmailStep;
