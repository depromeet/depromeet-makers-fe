import React, { useState } from 'react';
import styled from 'styled-components';

import type { ATTENDANCE_STATUS } from '../../../constants/attendance';
import type { AttendanceItemType } from '../../../hooks/apis/attendance/useGetGroupAttendance';
import { useModifyAttendance } from '../../../hooks/apis/attendance/useModifyAttendance';

import StatusSelect from './StatusSelect';

function UserItem(props: AttendanceItemType) {
  const [status, setStatus] = useState<ATTENDANCE_STATUS>(props.attendanceStatus);
  const { mutate } = useModifyAttendance();

  const onChange = (value: ATTENDANCE_STATUS) => {
    // optimistic update
    setStatus(value);
    console.log('value: ', value);

    // api call
    mutate({ attendanceId: props.attendanceId, attendanceStatus: value });
  };

  return (
    <Container>
      <TextWrapper>
        <Name>{props.memberName}</Name>
        <Position>{props.memberPosition}</Position>
      </TextWrapper>
      <StatusSelect onClick={onChange} value={status} />
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
