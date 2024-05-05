import { useState } from 'react';

import LoginLayout from './LoginLayout';
import PasswordInput from './PasswordInput';

const PASSWORD_LENGTH = 6;
interface Props {
  onNext: () => void;
  onBack: () => void;
}
function JoinStep(props: Props) {
  const [value, setValue] = useState('');

  const title = '비밀번호로 사용할 숫자 6자리를 입력해 주세요.';
  return (
    <LoginLayout
      onBack={props.onBack}
      title={title}
      buttonProps={{
        children: '다음',
        onClick: props.onNext,
        disabled: value.length !== PASSWORD_LENGTH,
      }}
    >
      <PasswordInput
        passwordLength={PASSWORD_LENGTH}
        inputLength={value.length}
        onChange={setValue}
        error={value.length !== PASSWORD_LENGTH ? '비밀번호를 입력해 주세요.' : undefined}
      />
    </LoginLayout>
  );
}

export default JoinStep;
