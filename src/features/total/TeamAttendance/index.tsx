import styled from 'styled-components';

import { Progress } from './Progress';

interface TeamStatus {
  teamNumber: number;
  attendantCount: number;
  totalCount: number;
}

export const TeamAttendance = ({ teamNumber, attendantCount, totalCount }: TeamStatus) => {
  const getAttendantCount = () => {
    if (attendantCount < 0) return 0;

    return attendantCount > totalCount ? totalCount : attendantCount;
  };

  const formattedAttendantCount = getAttendantCount();

  const attendanceRate = Math.floor((formattedAttendantCount * 100) / totalCount);

  return (
    <TeamContainer>
      <TeamText>{`${teamNumber}팀`}</TeamText>
      <Progress percent={attendanceRate} />
      <PercentText>{`${formattedAttendantCount}/${totalCount}`}</PercentText>
    </TeamContainer>
  );
};

const TeamContainer = styled.li`
  display: flex;
  align-items: center;
`;

const TeamText = styled.p`
  min-width: 26px;
  margin-right: 24px;

  ${({ theme }) => theme.typo.subtitle3};
  color: ${({ theme }) => theme.color.gray_900};
  white-space: nowrap;
`;

const PercentText = styled.p`
  min-width: 30px;
  margin-left: 8px;

  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.gray_400};
  text-align: right;
`;
