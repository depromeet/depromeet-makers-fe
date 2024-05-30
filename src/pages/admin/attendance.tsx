import { useCallback, useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import styled from 'styled-components';

import { BottomNav } from '@/components/BottomNav';
import IconButton from '@/components/Button/IconButton';
import Layout from '@/components/Layout';
import { ADMIN_NAV_ITEMS } from '@/constants/bottomNav';
import TeamSelect from '@/features/admin/attendance/TeamSelect';
import UserItem from '@/features/admin/attendance/UserItem';
import WeekSelect from '@/features/admin/attendance/WeekSelect';
import { useGetGroupAttendance } from '@/hooks/apis/attendance/useGetGroupAttendance';

function AdminAttendancePage() {
  const { ref, isViewMiniHeader } = useScrollAction();

  const [week, setWeek] = useState(1);
  const [team, setTeam] = useState(1);

  const { data } = useGetGroupAttendance({ generation: 15, week, groupId: String(team) });

  return (
    <Layout>
      <Main>
        {isViewMiniHeader ? (
          <>
            <MiniHeaderBlank />
            <MiniHeader initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {week}주차 - {team}팀
            </MiniHeader>
          </>
        ) : (
          <>
            <TopSection>
              <WeekSelect value={week} onChange={(week) => setWeek(week)} />
              <IconButton href="/admin/total" iconName="state">
                전체 출석률
              </IconButton>
            </TopSection>
            <TeamSection>
              <TeamSelect value={team} onChange={(team) => setTeam(team)} />
            </TeamSection>
          </>
        )}
        <UserSection ref={ref}>{data?.map((data) => <UserItem key={data.memberId} {...data} />)}</UserSection>
      </Main>
      <BottomNav items={ADMIN_NAV_ITEMS} />
    </Layout>
  );
}

// UserSection 컴포넌트가 일정 높이 이상 스크롤이 되면, 상단에 고정된 간소화된 헤더가 보여지도록 구현
const MINI_HEADER_TRIGGER = 112;

const useScrollAction = () => {
  const [isViewMiniHeader, setIsViewMiniHeader] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const top = ref.current.getBoundingClientRect().top;

    setIsViewMiniHeader(top <= MINI_HEADER_TRIGGER);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { ref, isViewMiniHeader };
};

export default AdminAttendancePage;

const MiniHeader = styled(m.header)`
  height: 64px;
  text-align: center;
  line-height: 64px;
  background-color: ${({ theme }) => theme.color.gray_100};
  ${({ theme }) => theme.typo.title1};
  color: ${({ theme }) => theme.color.gray_900};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: ${({ theme }) => theme.zIndex.header};
`;

const MiniHeaderBlank = styled.div`
  height: 112px;
  background: transparent;
`;

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
