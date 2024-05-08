import React from 'react';
import styled from 'styled-components';

import type { ATTENDANCE_STATUS } from '@/constants/attendance';

import StatusSelect from './StatusSelect';

interface Props {
  id: number;
  name: string;
  position: string;
  status: ATTENDANCE_STATUS;
}

function UserItem(props: Props) {
  return (
    <Container>
      <TextWrapper>
        <Name>{props.name}</Name>
        <Position>{props.position}</Position>
      </TextWrapper>
      <StatusSelect onClick={() => null} value={props.status} />
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
