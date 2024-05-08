import { useState } from 'react';
import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';
import Layout from '@/components/Layout';
import TeamSelect from '@/features/admin/attendance/TeamSelect';
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
        <section>
          <TeamSelect value={team} onChange={(team) => setTeam(team)} />
        </section>
      </Main>
    </Layout>
  );
}

export default AdminAttendancePage;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  padding: 32px 20px;
  background-color: ${({ theme }) => theme.color.gray_100};
`;

const TopSection = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;
