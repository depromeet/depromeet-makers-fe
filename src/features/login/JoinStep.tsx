import { useRef, useState } from 'react';

import LoginLayout from './LoginLayout';
import PasswordInput from './PasswordInput';

const PASSWORD_LENGTH = 6;

interface Props {
  onNext: () => void;
  onBack: () => void;
  email: string;
}

function JoinStep(props: Props) {
  const [isConfirmStep, setIsConfirmStep] = useState(false);
  const passwordValueRef = useRef<string>();

  const onSubmit = () => {
    // TODO : API 연결
    props.onNext();
  };

  if (isConfirmStep && passwordValueRef.current)
    return (
      <PasswordInputConfirmStep
        onBack={() => setIsConfirmStep(false)}
        onNext={onSubmit}
        password={passwordValueRef.current}
      />
    );

  return (
    <PasswordInputStep
      onBack={props.onBack}
      onNext={(input) => {
        passwordValueRef.current = input;
        setIsConfirmStep(true);
      }}
    />
  );
}

export default JoinStep;

function PasswordInputStep(props: { onBack: () => void; onNext: (value: string) => void }) {
  const [input, setInput] = useState('');

  return (
    <LoginLayout
      onBack={props.onBack}
      title={`비밀번호로 사용할 \n숫자 6자리를 입력해 주세요.`}
      buttonProps={{
        children: '다음',
        onClick: () => props.onNext(input),
        disabled: input.length !== PASSWORD_LENGTH,
        type: 'submit',
      }}
    >
      <PasswordInput passwordLength={PASSWORD_LENGTH} inputLength={input.length} onChange={setInput} />
    </LoginLayout>
  );
}

function PasswordInputConfirmStep(props: { onBack: () => void; onNext: () => void; password: string }) {
  const [input, setInput] = useState('');

  const isError = input.length === PASSWORD_LENGTH && input !== props.password;
  const isDisabled = input.length !== PASSWORD_LENGTH || isError;

  return (
    <LoginLayout
      onBack={props.onBack}
      title={`동일한 비밀번호를\n한번 더 입력해 주세요.`}
      buttonProps={{
        children: '다음',
        onClick: props.onNext,
        disabled: isDisabled,
        type: 'submit',
      }}
    >
      <PasswordInput
        passwordLength={PASSWORD_LENGTH}
        inputLength={input.length}
        onChange={setInput}
        error={isError ? '비밀번호가 일치하지 않습니다.' : undefined}
      />
    </LoginLayout>
  );
}
