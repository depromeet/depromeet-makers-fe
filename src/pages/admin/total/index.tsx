import { useMemo } from 'react';
import styled from 'styled-components';

import { Badge } from '@/components/Badge';
import { Header } from '@/components/Header';
import Icon from '@/components/Icon';
import { CURRENT_GENERATION } from '@/constants/attendance';
import { InfoBox } from '@/features/total/InfoBox';
import { TeamAttendance } from '@/features/total/TeamAttendance';
import { useGetAttendanceStats } from '@/hooks/apis/attendance/useGetAttendanceStats';
import { useCurrentWeek } from '@/hooks/useCurrentWeek';
import { getDateText } from '@/utils/date';

const TotalAttendance = () => {
  // TODO: 아래 옵셔널 체이닝 관련 값들 변경해야함
  const { week, isSessionStarted } = useCurrentWeek();

  const currentWeek = useMemo(() => {
    if (isSessionStarted) return week;
    if (week === 1) return 1;
    return week - 1;
  }, [week, isSessionStarted]);

  const { data, refetch, isLoading } = useGetAttendanceStats({
    week: currentWeek,
    generation: CURRENT_GENERATION,
  });

  const { month, day } = getDateText(data?.sessionDate || '');

  const handleRefresh = () => {
    refetch();
  };

  // TODO: 로딩 컴포넌트 추가
  if (isLoading) return <></>;

  return (
    <Container>
      <Header title="전체 출석률" canBack />

      <ContentContainer>
        <SubHeader>
          <TextContainer>
            <Badge>{`${data?.week}주차`}</Badge>
            <Text>{`${month} ${day}`}</Text>
          </TextContainer>
          <RefreshButton name="refresh" onClick={handleRefresh} />
        </SubHeader>

        <BoxContainer>
          <InfoBox
            title="출석률"
            content={`${data?.attendancePercentage || 0}%`}
            isSuccess={(data?.attendancePercentage || 0) >= 80}
          />
          <InfoBox title="출석" content={data?.attendanceCount || 0} />
          <InfoBox title="전체 멤버" content={data?.memberCount || 0} />
        </BoxContainer>

        <TeamContainer>{data?.teams?.map((team) => <TeamAttendance key={team.teamNumber} {...team} />)}</TeamContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.gray_100};
  height: 100dvh;
`;

const ContentContainer = styled.div`
  margin-top: 68px;
  padding: 0 20px;
`;

const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RefreshButton = styled(Icon)`
  cursor: pointer;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.p};
  color: ${({ theme }) => theme.color.gray_700};
  font-weight: 600;
`;

const TeamContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: 276px;
  padding: 24px 20px;
  gap: 24px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

export default TotalAttendance;
