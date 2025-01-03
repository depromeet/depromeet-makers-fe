import { useCallback, useEffect, useRef, useState } from 'react';
import type { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { m } from 'framer-motion';
import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import Layout from '@/components/Layout';
import { CURRENT_GENERATION } from '@/constants/attendance';
import { AttendanceCodeModal } from '@/features/admin/attendance/AttendanceCodeModal';
import TeamSelect from '@/features/admin/attendance/TeamSelect';
import UserItem from '@/features/admin/attendance/UserItem';
import WeekSelect from '@/features/admin/attendance/WeekSelect';
import { fetchGroupAttendace, useGetGroupAttendance } from '@/hooks/apis/attendance/useGetGroupAttendance';
import { useCurrentWeek } from '@/hooks/useCurrentWeek';

function AdminAttendancePage() {
  const { ref, isViewMiniHeader } = useScrollAction();

  const { week, setWeek, isOffline, code } = useCurrentWeek();

  const [team, setTeam] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const { data } = useGetGroupAttendance({ generation: CURRENT_GENERATION, week, groupId: String(team) });

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

        {isOffline && (
          <CodeContainer>
            <TextContainer>
              <CodeText>출석코드</CodeText>
              <CodeSubText>오프라인 위치 오류로 출석이 불가한 멤버에게 안내해주세요</CodeSubText>
            </TextContainer>
            <button onClick={() => setIsOpen(true)}>
              <Icon name="arrow-right" size={16} />
            </button>
          </CodeContainer>
        )}

        <UserSection ref={ref}>
          {data?.map((data) => <UserItem key={`${data.memberId}-${data.week}`} {...data} />)}
        </UserSection>
      </Main>
      {/* <BottomNav items={ADMIN_NAV_ITEMS} /> */}

      <AttendanceCodeModal isOpen={isOpen} onClose={() => setIsOpen(false)} code={code} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    const [groupAttendance] = await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['attendances-group'],
        queryFn: () => fetchGroupAttendace({ generation: CURRENT_GENERATION, week: 1, groupId: '1' }),
      }),
    ]);

    queryClient.setQueryData(['attendances-group'], (groupAttendance as unknown) ?? []);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
        revalidate: 10,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  } finally {
    queryClient.clear();
  }
};

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

const CodeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 16px;
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.gray_200};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CodeText = styled.p`
  ${({ theme }) => theme.typo.subtitle2};
  color: ${({ theme }) => theme.color.gray_700};
`;

const CodeSubText = styled.p`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.gray_500};
`;
