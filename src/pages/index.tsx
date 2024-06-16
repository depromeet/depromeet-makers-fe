import styled from 'styled-components';

import { Badge } from '@/components/Badge';
import { BottomNav } from '@/components/BottomNav';
import { FAB } from '@/components/FAB';
import { Metadata } from '@/components/Metadata';
import { ATTENDANCE_STATUS, CURRENT_GENERATION } from '@/constants/attendance';
import { USER_NAV_ITEMS } from '@/constants/bottomNav';
import { TITLE } from '@/constants/home';
import { Absence } from '@/features/home/Absence';
import { Attendance } from '@/features/home/Attendance';
import { RuleLink } from '@/features/home/RuleLink';
import { useCheckIn } from '@/hooks/apis/attendance/useCheckIn';
import { useGetAttendance } from '@/hooks/apis/attendance/useGetAttendance';
import { useGetCheckIn } from '@/hooks/apis/attendance/useGetCheckIn';
import { useGetSession } from '@/hooks/apis/sessions/useGetSession';
import { useGetInfo } from '@/hooks/apis/user/useGetInfo';
import { getDateText } from '@/utils/date';

const Home = () => {
  const { data: attendance } = useGetAttendance({ generation: CURRENT_GENERATION });
  const { data: sessionAttendance } = useGetCheckIn();
  const { data: session, isLoading } = useGetSession();
  const { mutate } = useCheckIn();

  const { month, day } = getDateText(String(new Date()));
  const isVisibleFab = sessionAttendance?.needFloatingButton;

  const getSessionAttendanceStatus = () => {
    if (sessionAttendance?.isBeforeSession15minutes) return 'BEFORE_15MINUTE';

    if (sessionAttendance?.expectAttendanceStatus === ATTENDANCE_STATUS.지각) return 'AFTER_15MINUTE';
    return 'ON_TIME';
  };

  // NOTE: 유저 정보 가져오기
  const { data } = useGetInfo();
  console.log('data: ', data);

  const handleClickCheckIn = () => {
    mutate();
  };

  if (isLoading) return null;

  return (
    <>
      <Metadata />

      <Container>
        <InfoContainer>
          <DateContainer>
            <Badge>{`${session?.week || 1}주차`}</Badge>
            <DateText>{`${month} ${day}`}</DateText>
          </DateContainer>
          <RuleLink />
        </InfoContainer>

        <Title>{TITLE[session?.week || 1]}</Title>

        <AttendanceContainer>
          <Attendance attendances={attendance?.attendances || []} />
          <Absence
            offlineAbsenceCount={attendance?.offlineAbsenceScore}
            totalAbsenceCount={Math.floor(attendance?.totalAbsenceScore || 0)}
          />
        </AttendanceContainer>
      </Container>

      {isVisibleFab && (
        <FAB text="출석하기 🙌" sessionAttendanceStatus={getSessionAttendanceStatus()} onClick={handleClickCheckIn} />
      )}
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
