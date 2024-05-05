import type { PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

interface ChipProps {
  isSelected: boolean;
  onClick?: () => void;
}

function Chip(props: PropsWithChildren<ChipProps>) {
  return <ChipStyled {...props} />;
}

export default Chip;

const ChipStyled = styled.button<ChipProps>`
  min-width: 82px;
  padding: 8px 16px;
  border-radius: 24px;
  cursor: pointer;
  text-align: center;
  ${({ theme }) => theme.typo.subtitle3};

  ${({ isSelected, theme }) => {
    if (isSelected) {
      return `
            background-color: ${theme.color.gray_900};
            color: ${theme.color.white};
        `;
    }

    return ` 
        border: 1px solid ${theme.color.gray_300};
        background-color: ${theme.color.gray_50};
        color: ${theme.color.gray_400};
    `;
  }}
`;
