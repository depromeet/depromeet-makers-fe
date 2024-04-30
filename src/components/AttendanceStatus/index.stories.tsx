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
        <AttendanceStatusChecked week={1} variant="default" />
        <AttendanceStatusChecked week={2} variant="lateness" />
        <AttendanceStatusChecked week={3} variant="absent" />
        <AttendanceStatusChecked week={4} variant="absent-proof" />
      </AttendanceStatusWrapper>
    </div>
  );
}

const AttendanceStatusWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;
