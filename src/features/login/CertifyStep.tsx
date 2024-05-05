import { useState } from 'react';

import LoginLayout from './LoginLayout';
import PasswordInput from './PasswordInput';

const PASSWORD_LENGTH = 6;

interface Props {
  onNext: () => void;
  onBack: () => void;
}

function CertifyStep(props: Props) {
  const [value, setValue] = useState('');
  return (
    <LoginLayout
      onBack={props.onBack}
      title="비밀번호를 입력해 주세요."
      buttonProps={{
        children: '다음',
        onClick: props.onNext,
        disabled: value.length !== PASSWORD_LENGTH,
      }}
    >
      <PasswordInput passwordLength={PASSWORD_LENGTH} inputLength={value.length} onChange={setValue} />
    </LoginLayout>
  );
}

export default CertifyStep;
