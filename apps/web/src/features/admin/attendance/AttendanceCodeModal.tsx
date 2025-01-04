import styled from 'styled-components';

import Button from '../../../components/Button';
import { Modal } from '../../../components/Modal';

interface AttendanceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
}

export const AttendanceCodeModal = ({ isOpen, onClose, code }: AttendanceCodeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Text>출석 코드</Text>
        <Code>{code}</Code>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.h3};
  color: #1e1e1e;
`;

const Code = styled.p`
  ${({ theme }) => theme.typo.h1};
  color: ${({ theme }) => theme.color.gray_900};
`;

const ConfirmButton = styled(Button)`
  width: 100%;
`;
