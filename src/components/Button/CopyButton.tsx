import React from 'react';
import styled, { useTheme } from 'styled-components';

import Icon from '../Icon';

function CopyButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const theme = useTheme();
  return (
    <ButtonStyled {...props}>
      <Icon name="clipboard-check" width={20} height={20} color={theme.color.gray_400} />
      {props.children}
    </ButtonStyled>
  );
}

export default CopyButton;

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
