import styled from 'styled-components';

import { AttendanceStatus, AttendanceStatusChecked } from '.';

const meta = {
  title: 'AttendanceStatus',
  component: AttendanceStatusChecked,
};

export default meta;

export function Default() {
  return (
    <div>
      <AttendanceStatusWrapper>
        <AttendanceStatus week={1} />
        <AttendanceStatus week={2} isOffline />
      </AttendanceStatusWrapper>

      <AttendanceStatusWrapper>
        <AttendanceStatusChecked week={1} variant="ATTENDANCE" />
        <AttendanceStatusChecked week={2} variant="ABSENCE" />
        <AttendanceStatusChecked week={3} variant="TARDY" />
      </AttendanceStatusWrapper>
    </div>
  );
}

const AttendanceStatusWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;
