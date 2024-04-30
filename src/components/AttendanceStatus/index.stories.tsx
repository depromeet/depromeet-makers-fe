import styled from 'styled-components';

import { AttendanceStatusChecked } from '.';

const meta = {
  title: 'AttendanceStatus',
  component: AttendanceStatusChecked,
};

export default meta;

export function Default() {
  return (
    <AttendanceStatusWrapper>
      <AttendanceStatusChecked week={1} variant="default" />
      <AttendanceStatusChecked week={2} variant="lateness" />
      <AttendanceStatusChecked week={3} variant="absent" />
      <AttendanceStatusChecked week={4} variant="absent-proof" />
    </AttendanceStatusWrapper>
  );
}

const AttendanceStatusWrapper = styled.div`
  display: flex;
  gap: 16px;
`;
