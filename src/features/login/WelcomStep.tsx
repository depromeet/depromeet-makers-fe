import React from 'react';

import LoginLayout from './LoginLayout';

interface Props {
  onNext: () => void;
}
function WelcomeStep(props: Props) {
  return (
    <LoginLayout
      title="간편한 디프만 출석체크, 한눈에 관리해보세요!"
      desc="출석 체크부터 출결 관리까지"
      buttonProps={{
        children: '입장하기',
        onClick: props.onNext,
      }}
    >
      {/* <Heading>간편한 디프만 출석체크, 한눈에 관리해보세요!</Heading> */}
    </LoginLayout>
  );
}

export default WelcomeStep;
