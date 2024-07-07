import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useGetInfo } from '~/hooks/apis/user/useGetInfo';

import LoginLayout from './LoginLayout';
import Img from './welcome-2.png';

function JoinCompleteStep() {
  const router = useRouter();
  const { data } = useGetInfo();

  const onNext = () => {
    if (data?.generations[0].role === 'ORGANIZER') {
      router.replace('/admin/attendance');
    } else {
      router.replace('/');
    }
  };

  return (
    <LoginLayout
      title="디프만 메이커스 가입 완료!"
      desc={`다시한번 디프만에 오신 걸 환영해요.\n지금 바로 디프만 메이커스를 사용해보세요.`}
      buttonProps={{
        children: '홈으로 바로가기',
        onClick: onNext,
      }}
    >
      <ImageContainer>
        <Image src={Img} width={300} height={300} alt="welcome" />
      </ImageContainer>
    </LoginLayout>
  );
}

export default JoinCompleteStep;

const ImageContainer = styled.div`
  text-align: center;
  height: calc(100vh - 340px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
