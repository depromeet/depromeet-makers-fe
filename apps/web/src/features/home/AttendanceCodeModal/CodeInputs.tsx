import type { ChangeEvent, MutableRefObject } from 'react';
import styled from 'styled-components';

interface CodeInputsProps {
  inputRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  onChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  onFocus: (index: number) => () => void;
}

export const CodeInputs = ({ inputRefs, onChange, onFocus }: CodeInputsProps) => {
  return (
    <InputContainer>
      {Array.from({ length: 4 }).map((_, index) => (
        <Input
          autoFocus={index === 0}
          key={index}
          type="number"
          ref={(element) => (inputRefs.current[index] = element)}
          onChange={(event) => onChange(event, index)}
          onFocus={onFocus(index)}
          maxLength={1}
          placeholder="*"
        />
      ))}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
`;

const Input = styled.input<{ ref: (element: HTMLInputElement | null) => void }>`
  width: 57px;
  height: 70px;
  padding: 10px;

  ${({ theme }) => theme.typo.title3};
  text-align: center;
  caret-color: transparent;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.color.gray_100};

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_300};
  }
`;
