import React from 'react';
import styled from 'styled-components';

import type { ATTENDANCE_STATUS } from '@/constants/attendance';
import type { AttendanceItemType } from '@/hooks/apis/attendance/useGetGroupAttendance';

import StatusSelect from './StatusSelect';

interface Props {
  id: number;
  name: string;
  position: string;
  status: ATTENDANCE_STATUS;
}

function UserItem(props: AttendanceItemType) {
  const onChange = (value: ATTENDANCE_STATUS) => {
    console.log(value);
  };

  return (
    <Container>
      <TextWrapper>
        <Name>{props.memberName}</Name>
        <Position>{props.memberPosition}</Position>
      </TextWrapper>
      <StatusSelect onClick={onChange} value={props.attendanceStatus} />
    </Container>
  );
}

export default UserItem;

const Container = styled.div`
  padding: 24px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Name = styled.span`
  ${({ theme }) => theme.typo.title3};
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 22px;
`;

const Position = styled.span`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.gray_400};
`;
