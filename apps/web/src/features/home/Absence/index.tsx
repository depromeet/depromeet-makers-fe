import styled from 'styled-components';

import Icon from '@/components/Icon';

const ABSENCE_LIMIT = {
  OFFLINE: 2,
  TOTAL: 4,
};

interface AbsenceProps {
  offlineAbsenceCount?: number;
  totalAbsenceCount?: number;
}

const getLimitStatus = (count: number, limit: number) => {
  const isFail = count >= limit;

  if (isFail) {
    return 'error';
  }

  if (count > 0) {
    return 'active';
  }

  return 'inactive';
};

export const Absence = ({ offlineAbsenceCount = 0, totalAbsenceCount = 0 }: AbsenceProps) => {
  const getWarningText = () => {
    const isOverOfflineLimit = offlineAbsenceCount >= ABSENCE_LIMIT.OFFLINE;
    const isOverTotalLimit = totalAbsenceCount >= ABSENCE_LIMIT.TOTAL;

    // 수료 불가
    if (isOverOfflineLimit) return '🚨 오프라인 결석 2회로 수료가 불가합니다.';
    if (isOverTotalLimit) return '🚨 누적 결석 4회로 수료가 불가합니다.';

    // 수료 불가에 가까움
    if (offlineAbsenceCount === ABSENCE_LIMIT.OFFLINE - 1 && totalAbsenceCount === ABSENCE_LIMIT.TOTAL - 1)
      return '🚨 이대로라면 수료가 어려울 수 있어요. 체크해보세요!';

    // 경고
    if (offlineAbsenceCount > 0) return '🚨 오프라인 결석 2회 시, 수료가 불가합니다.';
    if (totalAbsenceCount > 0) return '🚨 누적 결석 4회 시, 수료가 불가합니다.';

    return null;
  };

  const offlineAbsenceStatus = getLimitStatus(offlineAbsenceCount, ABSENCE_LIMIT.OFFLINE);
  const totalAbsenceStatus = getLimitStatus(totalAbsenceCount, ABSENCE_LIMIT.TOTAL);

  const warningText = getWarningText();

  return (
    <Container>
      <Row>
        <Title>나의 출결 현황</Title>
        <AttendanceRuleButton>
          출석 규정
          <Icon name="arrow-right" />
        </AttendanceRuleButton>
      </Row>
      {warningText && <WarningText>{warningText}</WarningText>}

      <Row gap={8}>
        <AbsenceBox status={offlineAbsenceStatus}>
          오프라인 결석
          <CountText status={offlineAbsenceStatus}>{`${offlineAbsenceCount}회/${ABSENCE_LIMIT.OFFLINE}회`}</CountText>
        </AbsenceBox>
        <AbsenceBox status={totalAbsenceStatus}>
          누적 결석
          <CountText status={totalAbsenceStatus}>{`${totalAbsenceCount}회/${ABSENCE_LIMIT.TOTAL}회`}</CountText>
        </AbsenceBox>
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

const Row = styled.div<{ gap?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ gap }) => gap}px;
`;

const Title = styled.p`
  ${({ theme }) => theme.typo.subtitle2};
  color: ${({ theme }) => theme.color.gray_900};

  min-width: 76px;
  margin-right: 10px;
`;

const AttendanceRuleButton = styled.button`
  display: flex;
  align-items: center;

  gap: 4px;
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.gray_600};
`;

const WarningText = styled.p`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.red_300};
`;

const AbsenceBox = styled.div<{ status: 'inactive' | 'active' | 'error' }>`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  gap: 2px;
  border-radius: 8px;
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme, status }) => (status === 'error' ? theme.color.red_300 : theme.color.gray_400)};
  background-color: ${({ theme, status }) => (status === 'error' ? theme.color.red_100 : theme.color.gray_100)};
`;

const CountText = styled.span<{ status: 'inactive' | 'active' | 'error' }>`
  color: ${({ theme, status }) => {
    switch (status) {
      case 'error':
        return theme.color.red_300;
      case 'active':
        return theme.color.gray_700;
      default:
        return theme.color.gray_600;
    }
  }};
`;
