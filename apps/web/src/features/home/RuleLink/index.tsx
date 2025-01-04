import Link from 'next/link';
import styled from 'styled-components';

import Icon from '../../../components/Icon';

const RuleLink = () => {
  return (
    <RuleLinkStyled href="/rule">
      <Icon name="clipboard-check" />
      출석 규정
    </RuleLinkStyled>
  );
};

export default RuleLink;

const RuleLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 2px;
  width: fit-content;
  padding: 6px;

  background-color: ${({ theme }) => theme.color.gray_50};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.color.gray_300};

  ${({ theme }) => theme.typo.subtitle3};
  color: ${({ theme }) => theme.color.gray_400};
`;
