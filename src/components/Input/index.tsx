import React from 'react';
import styled from 'styled-components';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

function Input({ error, ...props }: InputProps) {
  return (
    <div>
      <InputStyled {...props} />
      {error && <ErrorStyled>{error}</ErrorStyled>}
    </div>
  );
}

export default Input;

const InputStyled = styled.input<InputProps>`
  width: 100%;
  padding: 0 12px;
  border-radius: 6px;
  line-height: 38px;
  ${({ theme }) => theme.typo.p};
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.color.gray_300};
  outline: none;
  background: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.gray_900};

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.gray_400};
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.gray_400};
  }
`;

const ErrorStyled = styled.p`
  margin-top: 6px;
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.red_300};
`;
