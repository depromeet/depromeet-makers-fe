import styled from 'styled-components';

import { Badge } from '@/components/Badge';
import { BottomNav } from '@/components/BottomNav';
import { FAB } from '@/components/FAB';
import { Absence } from '@/features/home/Absence';
import { Attendance } from '@/features/home/Attendance';
import { RuleLink } from '@/features/home/RuleLink';

const Home = () => {
  // TODO: 응답 값으로 수정 필요
  const title = `디프만 15기 첫출발,\n함께 시작해 볼까요? 🌱`;
  const week = '1주차';
  const date = '4월 3일';
  const isVisibleFab = true;

  return (
    <>
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
          <Attendance />
          <Absence />
        </AttendanceContainer>
      </Container>

      {isVisibleFab && <FAB text="출석하기 🙌" subText="세션이 시작되었습니다." />}
      <BottomNav />
    </>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;

  padding-top: 32px;
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
  gap: 16px;
`;

export default Home;
