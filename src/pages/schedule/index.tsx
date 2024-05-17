import styled from 'styled-components';

import { BottomNav } from '@/components/BottomNav';
import { USER_NAV_ITEMS } from '@/constants/bottomNav';
import ScheduleItem from '@/features/schedule/ScheduleItem';
import { useGetSessionList } from '@/hooks/apis/sessions/useGetSessionList';
import { isSameDate } from '@/utils/date';

function SchedulePage() {
  const today = new Date();

  const { data } = useGetSessionList();

  return (
    <>
      <PageLayout>
        <Hgroup>
          <h1>디프만 {data?.generation}기 일정</h1>
          <hr />
          <p>토요일 오후 2시~5시 진행</p>
        </Hgroup>
        <ScheduleList>
          {data?.sessions.map((schedule) => {
            const isToday = isSameDate(today, new Date(schedule.startTime));

            return (
              <ScheduleItem
                key={schedule.sessionId}
                isToday={isToday}
                title={schedule.title}
                isOffline={schedule.sessionType === 'OFFLINE'}
                week={schedule.week}
                desc={schedule.description}
                date={schedule.startTime}
              />
            );
          })}
        </ScheduleList>
      </PageLayout>

      <BottomNav items={USER_NAV_ITEMS} />
    </>
  );
}

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
  > hr {
    width: 1px;
    height: 16px;
    color: ${({ theme }) => theme.color.gray_400};
    margin: 0;
  }

  > p {
    color: ${({ theme }) => theme.color.gray_600};
    ${({ theme }) => theme.typo.caption};
  }
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
