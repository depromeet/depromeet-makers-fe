import styled from 'styled-components';

import { AttendanceStatus, AttendanceStatusChecked } from '../../../components/AttendanceStatus';
import { type Attendance as AttendanceType } from '../../../types/attendance';

interface AttendanceProps {
  attendances: AttendanceType[];
}

export const Attendance = ({ attendances }: AttendanceProps) => {
  return (
    <Container>
      <Content>
        <Title>
          <Text>출석 현황</Text>
        </Title>

        <Grid>
          {attendances.map(({ week, sessionType, attendanceStatus }) =>
            attendanceStatus === 'ATTENDANCE_ON_HOLD' ? (
              <AttendanceStatus key={week} week={week} isOffline={sessionType === 'OFFLINE'} />
            ) : (
              <AttendanceStatusChecked key={week} week={week} variant={attendanceStatus} />
            ),
          )}
        </Grid>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px 20px;
  width: 100%;
  min-height: 392px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};

  @media ${({ theme }) => theme.media.mobile} {
    width: fit-content;
  }
`;

const Content = styled.div``;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
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
`;
