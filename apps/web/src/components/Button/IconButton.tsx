import type { ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
import styled, { useTheme } from 'styled-components';

import type { IconComponentMap } from '../Icon';
import Icon from '../Icon';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: keyof typeof IconComponentMap;
  href?: string;
}

function IconButton({ iconName, href, ...props }: Props) {
  const theme = useTheme();

  if (href) {
    return (
      <Link href={href}>
        <ButtonStyled {...props}>
          <Icon name={iconName} width={20} height={20} color={theme.color.gray_400} />
          {props.children}
        </ButtonStyled>
      </Link>
    );
  }

  return (
    <ButtonStyled {...props}>
      <Icon name={iconName} width={20} height={20} color={theme.color.gray_400} />
      {props.children}
    </ButtonStyled>
  );
}

export default IconButton;

const ButtonStyled = styled.button`
  ${({ theme }) => theme.typo.subtitle3};
  display: inline-flex;
  padding: 6px;
  align-items: center;
  gap: 2px;

  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_300};
  background: ${({ theme }) => theme.color.gray_50};
  color: ${({ theme }) => theme.color.gray_400};
`;
