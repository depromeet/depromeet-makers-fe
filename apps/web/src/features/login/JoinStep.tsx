import { useRef, useState } from 'react';

import { usePostLogin } from '../../hooks/apis/auth/usePostLogin';
import { useSetDefaultPassCord } from '../../hooks/apis/auth/useSetDefaultPassCord';

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
  const [error, setError] = useState('');
  const passwordValueRef = useRef<string>();

  const { mutate: onMutateLogin } = usePostLogin({
    onSuccess: () => {
      props.onNext();
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const { mutate: onMutatePassCord } = useSetDefaultPassCord({
    onSuccess: () => {
      if (!passwordValueRef.current) return;

      onMutateLogin({ email: props.email, passCord: passwordValueRef.current });
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const onSubmit = () => {
    if (!passwordValueRef.current) return;
    onMutatePassCord({ email: props.email, passCord: passwordValueRef.current });
  };

  if (isConfirmStep && passwordValueRef.current)
    return (
      <PasswordInputConfirmStep
        onBack={() => setIsConfirmStep(false)}
        onNext={onSubmit}
        password={passwordValueRef.current}
        error={error}
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

function PasswordInputConfirmStep(props: { onBack: () => void; onNext: () => void; password: string; error?: string }) {
  const [input, setInput] = useState('');

  const isNotEqual = input.length === PASSWORD_LENGTH && input !== props.password;
  const isDisabled = input.length !== PASSWORD_LENGTH || isNotEqual;

  const error = props.error ?? (isNotEqual ? '비밀번호가 일치하지 않습니다.' : '');

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
      <PasswordInput passwordLength={PASSWORD_LENGTH} inputLength={input.length} onChange={setInput} error={error} />
    </LoginLayout>
  );
}
