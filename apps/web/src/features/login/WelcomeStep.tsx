import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

import LoginLayout from './LoginLayout';
import Img from './welcome-1.png';

interface Props {
  onNext: () => void;
}
function WelcomeStep(props: Props) {
  return (
    <LoginLayout
      title={`간편한 디프만 출석체크,\n한눈에 관리해보세요!`}
      desc="출석 체크부터 출결 관리까지"
      buttonProps={{
        children: '입장하기',
        onClick: props.onNext,
      }}
    >
      <ImageContainer>
        <Image src={Img} width={300} height={300} alt="welcome  " />
      </ImageContainer>
    </LoginLayout>
  );
}

export default WelcomeStep;

const ImageContainer = styled.div`
  text-align: center;
  height: calc(100vh - 340px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
