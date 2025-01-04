import type { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { BottomNav } from '../../components/BottomNav';
import { Metadata } from '../../components/Metadata';
import { CURRENT_GENERATION } from '../../constants/attendance';
import { USER_NAV_ITEMS } from '../../constants/bottomNav';
import ScheduleItem from '../../features/schedule/ScheduleItem';
import { getSessionList, useGetSessionList } from '../../hooks/apis/sessions/useGetSessionList';
import { isSameDate } from '../../utils/date';

function SchedulePage() {
  const today = new Date();

  const { data } = useGetSessionList();

  return (
    <>
      <Metadata />

      <PageLayout>
        <Hgroup>
          <h1>디프만 {data?.generation ?? CURRENT_GENERATION}기 일정</h1>
          <Divider />
          <p>토요일 오후 2시~5시 진행</p>
        </Hgroup>
        <ScheduleList>
          {data?.sessions.map((schedule) => {
            const isToday = isSameDate(today, new Date(schedule.startTime));

            return (
              <ScheduleItem
                isToday={isToday}
                isOffline={schedule.sessionType === 'OFFLINE'}
                key={schedule.sessionId}
                {...schedule}
              />
            );
          })}
        </ScheduleList>
      </PageLayout>

      <BottomNav items={USER_NAV_ITEMS} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    const sessions = await queryClient.prefetchQuery({
      queryKey: ['sessions'],
      queryFn: () => getSessionList(),
    });

    queryClient.setQueryData(
      ['session'],
      (sessions as unknown) ?? {
        generation: CURRENT_GENERATION,
        sessions: [],
      },
    );

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

export default SchedulePage;

const Hgroup = styled.hgroup`
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 24px;

  > h1 {
    color: ${({ theme }) => theme.color.gray_900};
    ${({ theme }) => theme.typo.h2};
  }

  > p {
    color: ${({ theme }) => theme.color.gray_600};
    ${({ theme }) => theme.typo.caption};
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.color.gray_400};
`;

const PageLayout = styled.main`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.color.gray_100};
  padding: 32px 20px;
  min-height: calc(100vh - 68px);
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
