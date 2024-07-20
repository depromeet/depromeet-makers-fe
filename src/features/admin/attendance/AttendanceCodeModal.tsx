import type { MouseEvent } from 'react';
import styled from 'styled-components';

import Button from '@/components/Button';
import IconButton from '@/components/Button/IconButton';
import { Modal } from '@/components/Modal';
import { Spinner } from '@/components/Spinner';
import { useRefreshCode } from '@/hooks/apis/attendance/useRefreshCode';

interface AttendanceCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
  sessionId?: string;
}

export const AttendanceCodeModal = ({ isOpen, onClose, code, sessionId }: AttendanceCodeModalProps) => {
  const { mutate, isPending } = useRefreshCode();

  const handleRefresh = (event: MouseEvent<HTMLButtonElement>) => {
    if (!sessionId) return;

    event.stopPropagation();

    mutate(sessionId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Text>출석 코드</Text>
        <IconButton iconName="refresh" onClick={handleRefresh} />
        <Code>{isPending ? <Spinner /> : code}</Code>
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
