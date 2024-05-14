import styled from 'styled-components';

import type { CheckedProps } from '@/components/AttendanceStatus';
import { AttendanceStatus, AttendanceStatusChecked } from '@/components/AttendanceStatus';

// TODO: 응답 값으로 수정 필요
const attendanceResponse = [
  { id: 1, week: 1, checked: true, status: 'default' },
  { id: 2, week: 2, checked: true, status: 'lateness' },
  { id: 3, week: 3, checked: true, status: 'absent' },
  { id: 4, week: 4, checked: true, status: 'absent-proof' },
  { id: 5, week: 5, checked: false, isOffline: true },
  { id: 6, week: 6, checked: false, isOffline: true },
  { id: 7, week: 7, checked: false, isOffline: false },
  { id: 8, week: 8, checked: false, isOffline: false },
  { id: 9, week: 9, checked: false, isOffline: true },
  { id: 10, week: 10, checked: false, isOffline: true },
  { id: 11, week: 11, checked: false, isOffline: true },
  { id: 12, week: 12, checked: false, isOffline: true },
  { id: 13, week: 13, checked: false, isOffline: true },
  { id: 14, week: 14, checked: false, isOffline: true },
  { id: 15, week: 15, checked: false, isOffline: true },
  { id: 16, week: 16, checked: false, isOffline: true },
];

export const Attendance = () => {
  // TODO: 응답 값으로 수정 필요
  const isBefore15Min = true;

  return (
    <Container>
      <Title>
        <Text>출석 현황</Text>
        {isBefore15Min && <SubText>15분전입니다. 정각에 새로고침 해주세요.</SubText>}
      </Title>

      <Grid>
        {attendanceResponse.map(({ id, week, checked, isOffline = false, status = 'default' }) =>
          checked ? (
            // TODO: 응답 값에 맞게 타입 수정
            <AttendanceStatusChecked key={id} week={week} variant={status as CheckedProps['variant']} />
          ) : (
            <AttendanceStatus key={id} week={week} isOffline={isOffline} />
          ),
        )}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px 20px;

  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 20px;
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.p};
  color: ${({ theme }) => theme.color.gray_700};
  font-weight: 600;
  white-space: nowrap;
`;

const SubText = styled.p`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.green_300};
  white-space: nowrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  width: fit-content;
`;
