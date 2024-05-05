import LoginLayout from './LoginLayout';

interface Props {
  onNext: () => void;
}

function JoinCompleteStep(props: Props) {
  return (
    <LoginLayout
      title="디프만 메이커스 가입 완료!"
      desc={`다시한번 디프만에 오신 걸 환영해요.\n지금 바로 디프만 메이커스를 사용해보세요.`}
      buttonProps={{
        children: '홈으로 바로가기',
        onClick: props.onNext,
      }}
    ></LoginLayout>
  );
}

export default JoinCompleteStep;
