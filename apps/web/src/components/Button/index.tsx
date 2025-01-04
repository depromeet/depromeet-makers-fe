import React from 'react';
import styled from 'styled-components';

interface StyledProps {
  variant?: 'primary' | 'secondary';
}

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & StyledProps;

function Button(props: Props) {
  return <ButtonStyled {...props} onClick={(e) => !props.disabled && props.onClick?.(e)} />;
}

export default Button;

const ButtonStyled = styled.button<Partial<Props>>`
  padding: 18px 16px;
  border-radius: 12px;
  ${({ theme }) => theme.typo.title3};
  ${({ onClick }) => onClick && { cursor: 'pointer' }}

  &:disabled {
    cursor: not-allowed;
  }

  ${({ variant, theme }) => {
    switch (variant || 'primary') {
      case 'primary':
        return `
            background-color: ${theme.color.gray_900};
            border : 1px solid ${theme.color.gray_900};
            color: ${theme.color.white};
        `;
      case 'secondary':
        return `
            background-color:  ${theme.color.gray_200};
            border : 1px solid ${theme.color.gray_200};
            color: ${theme.color.gray_400};
        `;
    }
  }}

  &:disabled {
    background-color: ${({ theme }) => theme.color.gray_200};
    border: 1px solid ${({ theme }) => theme.color.gray_200};
    color: ${({ theme }) => theme.color.gray_400};
    cursor: not-allowed;
  }
`;
