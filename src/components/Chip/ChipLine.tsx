import type { PropsWithChildren } from 'react';
import React from 'react';
import styled from 'styled-components';

import Icon from '../Icon';

interface ChipLineProps {
  isSelected: boolean;
  onClick?: () => void;
}

function ChipLine({ children, isSelected, onClick }: PropsWithChildren<ChipLineProps>) {
  return (
    <ChipLineStyled onClick={onClick}>
      <div>{children}</div>
      {isSelected && <Icon name="check" width={20} height={20} />}
    </ChipLineStyled>
  );
}

export default ChipLine;

const ChipLineStyled = styled.button`
  display: flex;
  width: 350px;
  padding: 24px 0px;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.typo.subtitle1};
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 20px;
`;
