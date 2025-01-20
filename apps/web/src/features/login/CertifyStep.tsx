import { useState } from 'react';
import { useRouter } from 'next/router';

import { usePostLogin } from '@/hooks/apis/auth/usePostLogin';

import LoginLayout from './LoginLayout';
import PasswordInput from './PasswordInput';

const PASSWORD_LENGTH = 6;

interface Props {
  onBack: () => void;
  email: string;
}

function CertifyStep(props: Props) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const isDisabled = value.length !== PASSWORD_LENGTH || Boolean(error);

  const { mutate } = usePostLogin({
    onSuccess: ({ currentRole }) => {
      if (currentRole === 'GRADUATE') {
        setError('졸업생은 로그인할 수 없습니다.');
        return;
      }

      if (currentRole === 'ORGANIZER') {
        router.replace('/admin/attendance');
        return;
      }

      if (currentRole === 'MEMBER') {
        router.replace('/');
        return;
      }
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onChangeValue = (value: string) => {
    setValue(value);
    setError('');
  };

  const onSubmit = () => {
    mutate({ email: props.email, passCord: value });
  };

  return (
    <LoginLayout
      onBack={props.onBack}
      title="비밀번호 숫자 6자리를 입력해 주세요."
      buttonProps={{
        children: '로그인하기',
        onClick: onSubmit,
        disabled: isDisabled,
        type: 'submit',
      }}
    >
      <PasswordInput
        passwordLength={PASSWORD_LENGTH}
        inputLength={value.length}
        onChange={onChangeValue}
        error={error}
      />
    </LoginLayout>
  );
}

export default CertifyStep;
