import { type BaseHTMLAttributes } from 'react';
import styled from 'styled-components';

interface BadgeProps extends BaseHTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'black' | 'line' | 'error';
}

export const Badge = ({ children, ...props }: BadgeProps) => {
  return <BadgeStyled {...props}>{children}</BadgeStyled>;
};

const BadgeStyled = styled.span<BadgeProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;

  ${({ theme }) => theme.typo.caption};
  font-weight: 500;

  ${({ variant = 'default', theme }) => {
    switch (variant) {
      case 'default':
        return `
          background-color: ${theme.color.gray_200};
          color: ${theme.color.gray_500};
        `;
      case 'black':
        return `
          background-color: ${theme.color.gray_900};
          color: ${theme.color.white};
        `;
      case 'line':
        return `
          background-color: ${theme.color.white};
          color: ${theme.color.gray_900};
          border: 1px solid ${theme.color.gray_900}
        `;
      case 'error':
        return `
          background-color: ${theme.color.red_100};
          color: ${theme.color.red_300};
        `;
    }
  }}
`;
