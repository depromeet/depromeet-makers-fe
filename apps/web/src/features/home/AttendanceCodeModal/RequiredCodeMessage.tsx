import { useSetAtom } from 'jotai';
import styled from 'styled-components';

import { modalAtom } from '@/store/modal';

export const RequiredCodeMessage = () => {
  const setIsModalOpen = useSetAtom(modalAtom);

  const handleShowCodeModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Container>
      <Text>{`오프라인 출석체크의 현재 위치정보가 누락되었습니다.\n코드를 입력해 출석해주세요.`}</Text>
      <Button onClick={handleShowCodeModal}>코드입력</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  width: 100%;
`;

const Text = styled.p`
  /* max-width: 236px; */
  ${({ theme }) => theme.typo.p}
  color: ${({ theme }) => theme.color.gray_200};
  line-height: 22px;
`;

const Button = styled.button`
  flex-shrink: 0;
  ${({ theme }) => theme.typo.subtitle3};
  color: ${({ theme }) => theme.color.green_300};
`;
