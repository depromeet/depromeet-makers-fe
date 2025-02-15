import dynamic from 'next/dynamic';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import { Badge } from '../components/Badge';
import { BottomNav } from '../components/BottomNav';
import { FAB } from '../components/FAB';
import { Metadata } from '../components/Metadata';
import { ATTENDANCE_STATUS, CURRENT_GENERATION } from '../constants/attendance';
import { USER_NAV_ITEMS } from '../constants/bottomNav';
import { TITLE } from '../constants/home';
import { Absence } from '../features/home/Absence';
import { Attendance } from '../features/home/Attendance';

const AttendanceCodeModal = dynamic(() => import('../features/home/AttendanceCodeModal'));

import type { GetStaticProps } from 'next';

import { Notification } from '../features/home/Notification';
import { useCheckIn } from '../hooks/apis/attendance/useCheckIn';
import { fetchAttendance, useGetAttendance } from '../hooks/apis/attendance/useGetAttendance';
import { useGetCheckIn } from '../hooks/apis/attendance/useGetCheckIn';
import { fetchSessionList, useGetSession } from '../hooks/apis/sessions/useGetSession';
import { fetchInfo } from '../hooks/apis/user/useGetInfo';
import { modalAtom } from '../store/modal';
import { getDateText } from '../utils/date';

const Home = () => {
  const { data: attendance } = useGetAttendance({ generation: CURRENT_GENERATION });
  const { data: sessionAttendance } = useGetCheckIn();
  const { data: session } = useGetSession();

  const { mutate } = useCheckIn();

  const [isVisibleCodeModal, setIsVisibleCodeModal] = useAtom(modalAtom);

  const { month, day } = getDateText(String(new Date()));
  const isVisibleFab = sessionAttendance?.needFloatingButton;

  const getSessionAttendanceStatus = () => {
    if (sessionAttendance?.isBeforeSession15minutes) return 'BEFORE_15MINUTE';

    if (sessionAttendance?.expectAttendanceStatus === ATTENDANCE_STATUS.지각) return 'AFTER_15MINUTE';
    return 'ON_TIME';
  };

  const handleClickCheckIn = () => {
    mutate();
  };

  return (
    <>
      <Metadata />

      <Container>
        <InfoContainer>
          <DateContainer>
            <Badge>{`${session?.week || 1}주차`}</Badge>
            <DateText>{`${month} ${day}`}</DateText>
          </DateContainer>
        </InfoContainer>

        <Title>{TITLE[session?.week || 1]}</Title>

        <Notification />

        <AttendanceContainer>
          <Attendance attendances={attendance?.attendances || []} />
          <Absence
            offlineAbsenceCount={attendance?.offlineAbsenceScore}
            totalAbsenceCount={attendance?.totalAbsenceScore || 0}
          />
        </AttendanceContainer>
      </Container>

      {isVisibleFab && (
        <FAB text="출석하기 🙌" sessionAttendanceStatus={getSessionAttendanceStatus()} onClick={handleClickCheckIn} />
      )}

      <AttendanceCodeModal isOpen={isVisibleCodeModal} setOpen={setIsVisibleCodeModal} />
      <BottomNav items={USER_NAV_ITEMS} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['attendances-me'],
        queryFn: () => fetchAttendance({ generation: CURRENT_GENERATION }),
      }),
      queryClient.prefetchQuery({
        queryKey: ['session'],
        queryFn: () => fetchSessionList({ generation: CURRENT_GENERATION }),
      }),
      queryClient.prefetchQuery({ queryKey: ['me'], queryFn: () => fetchInfo() }),
    ]);

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

const Container = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;

  height: calc(100dvh - 68px);
  padding: 32px 20px;
  overflow: auto;

  background-color: ${({ theme }) => theme.color.gray_100};

  @media ${({ theme }) => theme.media.mobile} {
    height: calc(100vh + 160px);
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 12px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const DateText = styled.p`
  ${({ theme }) => theme.typo.subtitle2};
  color: ${({ theme }) => theme.color.gray_700};
`;

const Title = styled.h2`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 34px;

  margin-bottom: 20px;
`;

const AttendanceContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  margin-bottom: 60px;
`;

export default Home;
