import styled from 'styled-components';

import { Badge } from '@/components/Badge';
import { BottomNav } from '@/components/BottomNav';
import { FAB } from '@/components/FAB';
import { Metadata } from '@/components/Metadata';
import { ATTENDANCE_STATUS, CURRENT_GENERATION } from '@/constants/attendance';
import { USER_NAV_ITEMS } from '@/constants/bottomNav';
import { Absence } from '@/features/home/Absence';
import { Attendance } from '@/features/home/Attendance';
import { RuleLink } from '@/features/home/RuleLink';
import { useCheckIn } from '@/hooks/apis/attendance/useCheckIn';
import { useGetAttendance } from '@/hooks/apis/attendance/useGetAttendance';
import { useGetCheckIn } from '@/hooks/apis/attendance/useGetCheckIn';
import { useGetInfo } from '@/hooks/apis/user/useGetInfo';
import { getDateText } from '@/utils/date';

const TITLE = [
  `디프만 15기 첫출발,\n함께 시작해볼까요? 🌱`,
  `디프만 15기 첫출발,\n함께 시작해볼까요? 🌱`,
  `아이디어가\n퐁퐁 솟아오르는 시간 ⏰`,
  `디프만,\n친해지길 바래 💖`,
  `우리 팀의\n멋진 아이디어 발표 !`,
  '아직은 완벽하지 않아도 좋아요!',
  '사용자의 목소리를 들어볼 시간 🤓',
  `디프만 아직 반이나 남았잖아\n완전 럭키비키잔앙 🍀`,
  `서로 진행 상황을 공유하고\n동기부여를 얻어보아요 😤`,
  `회고 없는 성장은 없다!\n중간회고 시간 🤨`,
  `48시간의 열정,\n달릴 준비 완료 🏃🏻‍♀️🏃🏻`,
  '디프만과 함께하는 여름 🍉',
  `런칭,\n최종발표를 위해 전진 ⛳️`,
  '놀랄 일도 아닌 일에 “어?~” 금지',
  '드디어 런칭데이! ',
  '마지막까지 준비는 완벽하게 ✨',
  '디프만 15기 고생하셨습니다 💙',
];

const Home = () => {
  const { data: attendance } = useGetAttendance({ generation: CURRENT_GENERATION });
  const { data: sessionAttendance } = useGetCheckIn();
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

  const handleClickCheckIn = () => {
    mutate();
  };

  return (
    <>
      <Metadata />

      <Container>
        <InfoContainer>
          <DateContainer>
            <Badge>{`${sessionAttendance?.week || 1}주차`}</Badge>
            <DateText>{`${month} ${day}`}</DateText>
          </DateContainer>
          <RuleLink />
        </InfoContainer>

        <Title>{TITLE[sessionAttendance?.week || 0]}</Title>

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
