import React, { useState } from 'react';

import Input from '../../components/Input';
import { REGEX } from '../../constants/regex';
import { getHasMember } from '../../hooks/apis/auth/useGetHasMember';

import LoginLayout from './LoginLayout';

interface Props {
  onNext: (type: 'join' | 'login', email: string) => void;
  onBack: () => void;
}

function EmailStep(props: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isDisabled = !email || !!error;

  const onSubmit = async () => {
    if (!REGEX.EMAIL.test(email)) {
      setError('이메일 형식에 맞추어 입력해 주세요.');
      return;
    }

    try {
      const { isMemberExists, isPassCordAssigned } = await getHasMember({ email });
      if (!isMemberExists) {
        setError('현기수에 해당하는 이메일이 아닙니다. ');
        return;
      }

      if (isPassCordAssigned) {
        props.onNext('login', email);
      } else {
        props.onNext('join', email);
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim() === '') {
      setError('');
      setEmail('');
      return;
    }
    setError('');
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
