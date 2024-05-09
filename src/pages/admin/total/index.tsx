import styled from 'styled-components';

import { Badge } from '@/components/Badge';
import { Header } from '@/components/Header';
import Icon from '@/components/Icon';
import { InfoBox } from '@/features/total/InfoBox';
import { TeamAttendance } from '@/features/total/TeamAttendance';

// TODO: 응답값으로 변경
const TEAM_INFO = [
  { teamNumber: 1, attendantCount: 4, totalCount: 10 },
  { teamNumber: 2, attendantCount: 10, totalCount: 10 },
  { teamNumber: 3, attendantCount: 2, totalCount: 10 },
  { teamNumber: 4, attendantCount: 0, totalCount: 10 },
  { teamNumber: 5, attendantCount: 4, totalCount: 10 },
  { teamNumber: 6, attendantCount: 4, totalCount: 10 },
];

const RESPONSE = {
  week: 1,
  date: '4월 3일',
  attendanceCount: 80,
  totalCount: 100,
};

const TotalAttendance = () => {
  const { week, date, attendanceCount, totalCount } = RESPONSE;

  const attendanceRate = Math.floor((attendanceCount * 100) / totalCount);

  const handleRefresh = () => {
    // TODO: refetch 로직 추가
  };

  return (
    <>
      <Header title="전체 출석률" canBack />

      <SubHeader>
        <TextContainer>
          <Badge>{`${week}주차`}</Badge>
          <Text>{date}</Text>
        </TextContainer>
        <RefreshButton name="refresh" onClick={handleRefresh} />
      </SubHeader>

      <BoxContainer>
        <InfoBox title="출석률" content={`${attendanceRate}%`} isSuccess={attendanceRate >= 80} />
        <InfoBox title="출석" content={attendanceCount} />
        <InfoBox title="전체 멤버" content={totalCount} />
      </BoxContainer>

      <TeamContainer>
        {TEAM_INFO.map((team) => (
          <TeamAttendance key={team.teamNumber} {...team} />
        ))}
      </TeamContainer>
    </>
  );
};

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

  padding: 24px 20px;
  gap: 24px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

export default TotalAttendance;
