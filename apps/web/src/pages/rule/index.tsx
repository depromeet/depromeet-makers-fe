import styled from 'styled-components';

import { Header } from '../../components/Header';
import { Metadata } from '../../components/Metadata';
import theme from '../../styles/theme';

// TODO: 추후 변경 필요

const CONTENT = `
  [출석 규정]
  80% 출석 필수 (정규 세션 16주 중에 13주 참석) ex. 4회 결석 시 수료 X

[출석 정책] *2시 세션기준

- 출석가능
    1.  15분 전 (1시 45분)~세션 시작 (2시)
    2. 세션 시작 (2시)~15분 후(2시 14분 59초)

- 지각처리 (출석은 가능합니다.)
    1. 세션 15분 후 (2시 15분)~세션 30분 후 (2시 29분 59초)

- 결석처리
    1. 세션 30분 후 (2시30분 이후)

[출석 인정 케이스]

  - 가족 경조사 → 출석 인정
  - 결혼, 사망으로 인한 장례에 한정

  - 지인 경조사 → 결석처리

  - 오프라인 활동 2회 불참시 → 수료 불가

  - 코딩 테스트 및 취업 관련 활동 → 증빙 서류 제출 시 지각으로 처리. 단, 2회까지 지각이며 3회부터 결석 처리
  - 코딩 테스트 완료 스크린샷 / 코딩 테스트 관련 안내 메일 스크린샷 (개인 정보는 지워주세요.)
  - 면접이면, 면접 시간이 들어간 이메일의 스크린샷 (개인 정보는 지워주세요.)

  - 회사관련 출장 및 워크숍 관련 활동 → 증빙 서류 제출 시 지각으로 처리. 단, 2회까지 지각이며 3회부터 결석 처리
  - 워크숍 관련, 출장 관련 인증 가능한 일자/시간있는 문서의 스크린샷 (개인 정보는 지워주세요.)

  - 모든 서류는 일자와 시간이 기입되어 있어야합니다.
`;

const Rule = () => {
  return (
    <>
      <Metadata />

      <Header title="출석 규정" canBack backgroundColor={theme.color.white} />
      <Content>{CONTENT}</Content>
    </>
  );
};

const Content = styled.p`
  margin-top: 68px;
  padding: 24px 20px;
  ${({ theme }) => theme.typo.p};
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 22px;
`;

export default Rule;
