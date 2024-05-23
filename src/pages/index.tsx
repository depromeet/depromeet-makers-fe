import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Badge } from '@/components/Badge';
import { BottomNav } from '@/components/BottomNav';
import { FAB } from '@/components/FAB';
import { Metadata } from '@/components/Metadata';
import { CURRENT_GENERATION } from '@/constants/attendance';
import { USER_NAV_ITEMS } from '@/constants/bottomNav';
import { STORAGE_KEY } from '@/constants/storage';
import { Absence } from '@/features/home/Absence';
import { Attendance } from '@/features/home/Attendance';
import { RuleLink } from '@/features/home/RuleLink';
import { useGetAttendance } from '@/hooks/apis/attendance/useGetAttendance';
import { useGetCheckIn } from '@/hooks/apis/attendance/useGetCheckIn';
import { useGetInfo } from '@/hooks/apis/user/useGetInfo';

const Home = () => {
  const { data: attendance } = useGetAttendance({ generation: CURRENT_GENERATION });
  const { data: sessionAttendance } = useGetCheckIn();

  // TODO: 응답 값으로 수정 필요
  const title = `디프만 15기 첫출발,\n함께 시작해 볼까요? 🌱`;
  const week = '1주차';
  const date = '4월 3일';
  const isVisibleFab = sessionAttendance?.needFloatingButton;

  const getSessionAttendanceStatus = () => {
    if (sessionAttendance?.isBeforeSession15minutes) return 'BEFORE_15MINUTE';
    if (sessionAttendance?.expectAttendanceStatus === 'ABSENCE') return 'AFTER_15MINUTE';

    return 'ON_TIME';
  };

  const router = useRouter();

  // NOTE: 유저 정보 가져오기
  const { data } = useGetInfo();
  console.log('data: ', data);

  // TODO: 로그인 임시 코드
  useEffect(() => {
    const isAuthenticated = localStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);

    if (!isAuthenticated) router.push('/login');
  }, [router]);

  return (
    <>
      <Metadata />

      <Container>
        <InfoContainer>
          <DateContainer>
            <Badge>{week}</Badge>
            <DateText>{date}</DateText>
          </DateContainer>
          <RuleLink />
        </InfoContainer>

        <Title>{title}</Title>

        <AttendanceContainer>
          <Attendance attendances={attendance?.attendances || []} />
          <Absence
            offlineAbsenceCount={attendance?.offlineAbsenceScore}
            totalAbsenceCount={attendance?.totalAbsenceScore}
          />
        </AttendanceContainer>
      </Container>

      {isVisibleFab && <FAB text="출석하기 🙌" sessionAttendanceStatus={getSessionAttendanceStatus()} />}
      <BottomNav items={USER_NAV_ITEMS} />
    </>
  );
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
