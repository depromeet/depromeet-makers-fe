import type { ChangeEvent, FormEvent } from 'react';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import { Modal } from '@/components/Modal';

import { CodeInputs } from './CodeInputs';

export const AttendanceCodeModal = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [inputs, setInputs] = useState<string[]>(['', '', '', '']);

  // TODO: api 추가 후 에러 처리 필요
  const isError = true;

  const isDisabledSubmit = useMemo(() => inputs.some((input) => input === ''), [inputs]);

  const handleAutoFocusNextInput = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { maxLength, value } = event.target;

    if (value.length > maxLength) return;

    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);

    const currentInput = inputRefs.current[index];
    const nextInput = inputRefs.current[index + 1];

    // 마지막 input이거나 다음 input 값이 있으면 blur
    if (!nextInput || nextInput.value) {
      currentInput?.blur();
      return;
    }

    nextInput.focus();
  };

  const handleClearNextAllInputs = (currentIndex: number) => () => {
    const inputs = inputRefs.current.map((input, index) => {
      if (input && index >= currentIndex) {
        input.value = '';
        return '';
      }
      return input?.value ?? '';
    });

    setInputs(inputs);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = inputRefs.current.map((input) => input?.value || '').join('');

    // TODO: api 추가 예정
    console.log(code);
  };

  return (
    <Modal isOpen onClose={() => {}}>
      <Form onSubmit={handleSubmit}>
        <Text>출석 코드를 입력해주세요</Text>
        <CodeInputs inputRefs={inputRefs} onChange={handleAutoFocusNextInput} onFocus={handleClearNextAllInputs} />
        {isError && <ErrorMessage>본 세션에 해당하는 출석 코드가 아닙니다. 다시 입력해주세요.</ErrorMessage>}
        <SubmitButton type="submit" disabled={isDisabledSubmit}>
          확인
        </SubmitButton>
      </Form>
    </Modal>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.h3};

  margin-bottom: 32px;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 12px;
`;

const ErrorMessage = styled.p`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.red_300};
`;
