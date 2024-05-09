import { useState } from 'react';

import LoginLayout from './LoginLayout';
import PasswordInput from './PasswordInput';

const PASSWORD_LENGTH = 6;

const dummy_password = '111111';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

function CertifyStep(props: Props) {
  const [value, setValue] = useState('');

  const isError = value.length === PASSWORD_LENGTH && value !== dummy_password;
  const isDisabled = value.length !== PASSWORD_LENGTH || isError;

  const onSubmit = () => {
    // TODO: login API 연결
    props.onNext();
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
        onChange={setValue}
        error={isError ? '비밀번호가 일치하지 않습니다.' : undefined}
      />
    </LoginLayout>
  );
}

export default CertifyStep;
