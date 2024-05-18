import { useState } from 'react';

import { usePostLogin } from '@/hooks/apis/auth/usePostLogin';

import LoginLayout from './LoginLayout';
import PasswordInput from './PasswordInput';

const PASSWORD_LENGTH = 6;

interface Props {
  onNext: () => void;
  onBack: () => void;
  email: string;
}

function CertifyStep(props: Props) {
  const [value, setValue] = useState('');

  const [error, setError] = useState('');

  const isDisabled = value.length !== PASSWORD_LENGTH || Boolean(error);

  const { mutate } = usePostLogin({
    onSuccess: () => {
      props.onNext();
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
      title="비밀번호를 입력해 주세요."
      buttonProps={{
        children: '다음',
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
