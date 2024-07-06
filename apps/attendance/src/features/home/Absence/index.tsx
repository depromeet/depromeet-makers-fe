import styled from 'styled-components';

import { CheckBox } from './CheckBox';
import { Badge } from '@depromeet-makers-fe/ui';

const ABSENCE_LIMIT = {
  OFFLINE: 2,
  TOTAL: 4,
};

interface AbsenceProps {
  offlineAbsenceCount?: number;
  totalAbsenceCount?: number;
}

export const Absence = ({ offlineAbsenceCount = 0, totalAbsenceCount = 0 }: AbsenceProps) => {
  const isOverOfflineLimit = offlineAbsenceCount >= ABSENCE_LIMIT.OFFLINE;
  const isOverTotalLimit = totalAbsenceCount >= ABSENCE_LIMIT.TOTAL;

  return (
    <Container>
      <Row>
        <Title>오프라인 결석</Title>
        <CheckBox checkBoxCount={ABSENCE_LIMIT.OFFLINE} checkedCount={offlineAbsenceCount} />
        {isOverOfflineLimit && <BadgeStyled variant="error">🚨 수료기준 미충족</BadgeStyled>}
      </Row>

      <Row>
        <Title>누적 결석 수</Title>
        <CheckBox checkBoxCount={ABSENCE_LIMIT.TOTAL} checkedCount={totalAbsenceCount} />
        {totalAbsenceCount > ABSENCE_LIMIT.TOTAL && (
          <OverLimitText>{`+${totalAbsenceCount - ABSENCE_LIMIT.TOTAL}`}</OverLimitText>
        )}
        {isOverTotalLimit && <BadgeStyled variant="error">🚨 수료기준 미충족</BadgeStyled>}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  padding: 24px 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.subtitle2};
  color: ${({ theme }) => theme.color.gray_900};

  min-width: 76px;
  margin-right: 10px;
`;

const OverLimitText = styled.span`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.red_300};

  margin-left: 6px;
`;

const BadgeStyled = styled(Badge)`
  margin-left: 8px;
`;
