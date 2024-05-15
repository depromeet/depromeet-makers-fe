import React, { useState } from 'react';

import Input from '@/components/Input';

import LoginLayout from './LoginLayout';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

interface Props {
  onNext: (type: 'join' | 'login') => void;
  onBack: () => void;
}

function EmailStep(props: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isDisabled = !email || !!error;

  const onSubmit = () => {
    // TODO : email validation
    // 임시 valid
    if (email.indexOf('login') !== -1) {
      props.onNext('login');
    } else {
      props.onNext('join');
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      setError('');
      setEmail('');
      return;
    }

    if (!EMAIL_REGEX.test(e.target.value)) {
      setError('이메일 형식이 올바르지 않습니다.');
    }

    setEmail(e.target.value);
  };

  return (
    <LoginLayout
      title={`디프만 지원 시 \n사용했던 이메일을 입력해 주세요.`}
      onBack={props.onBack}
      buttonProps={{
        children: '다음',
        onClick: onSubmit,
        disabled: isDisabled,
      }}
    >
      <Input autoFocus placeholder="이메일을 입력해주세요." value={email} onChange={onEmailChange} error={error} />
    </LoginLayout>
  );
}

export default EmailStep;
