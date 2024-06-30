import type { PropsWithChildren } from "react";
import styled from "styled-components";

import Icon from "~/components/Icon";

interface ChipLineProps {
  isSelected: boolean;
  onClick?: () => void;
}

function ChipLine({
  children,
  isSelected,
  onClick,
}: PropsWithChildren<ChipLineProps>) {
  return (
    <ChipLineStyled onClick={onClick}>
      <div>{children}</div>
      {isSelected && <Icon name="check" width={20} height={20} />}
    </ChipLineStyled>
  );
}

export default ChipLine;

const ChipLineStyled = styled.button`
  width: 100%;
  display: flex;
  padding: 24px 0px;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.typo.subtitle1};
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 20px;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.gray_100};
  }
`;
