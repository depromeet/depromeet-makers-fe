import { useState } from 'react';
import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';
import Layout from '@/components/Layout';
import { ATTENDANCE_STATUS } from '@/constants/attendance';
import TeamSelect from '@/features/admin/attendance/TeamSelect';
import UserItem from '@/features/admin/attendance/UserItem';
import WeekSelect from '@/features/admin/attendance/WeekSelect';

function AdminAttendancePage() {
  const [week, setWeek] = useState(1);
  const [team, setTeam] = useState(1);

  return (
    <Layout>
      <Main>
        <TopSection>
          <WeekSelect value={week} onChange={(week) => setWeek(week)} />
          <IconButton iconName="state">전체 출석률</IconButton>
        </TopSection>
        <TeamSection>
          <TeamSelect value={team} onChange={(team) => setTeam(team)} />
        </TeamSection>
        <UserSection>
          {DUMMY_DATA.map((data) => (
            <UserItem key={data.id} {...data} />
          ))}
        </UserSection>
      </Main>
    </Layout>
  );
}

export default AdminAttendancePage;

const Main = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: 32px 20px;
  background-color: ${({ theme }) => theme.color.gray_100};
`;

const TopSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const TeamSection = styled.section`
  margin-bottom: 20px;
`;

const UserSection = styled.section`
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};

  > & + & {
    border-top: 1px solid ${({ theme }) => theme.color.gray_200};
  }
`;

const DUMMY_DATA: {
  id: number;
  name: string;
  position: string;
  status: ATTENDANCE_STATUS;
}[] = [
  {
    id: 1,
    name: '김민수',
    position: '개발자',
    status: ATTENDANCE_STATUS.출석대기,
  },
  {
    id: 2,
    name: '홍길동',
    position: '디자이너',
    status: ATTENDANCE_STATUS.지각,
  },
  {
    id: 3,
    name: '이영희',
    position: '디자이너',
    status: ATTENDANCE_STATUS.출석,
  },
  {
    id: 4,
    name: '박철수',
    position: '디자이너',
    status: ATTENDANCE_STATUS.결석,
  },
  {
    id: 5,
    name: '김지영',
    position: '디자이너',
    status: ATTENDANCE_STATUS.출석대기,
  },
  {
    id: 6,
    name: '이승호',
    position: '디자이너',
    status: ATTENDANCE_STATUS.출석대기,
  },
  {
    id: 7,
    name: '박지민',
    position: '디자이너',
    status: ATTENDANCE_STATUS.출석대기,
  },
];
