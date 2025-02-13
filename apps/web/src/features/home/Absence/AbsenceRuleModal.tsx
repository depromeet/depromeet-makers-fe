import styled from 'styled-components';

import Button from '@/components/Button';
import { Modal } from '@/components/Modal';

interface AbsenceRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  code?: string;
}

export const AbsenceRuleModal = ({ isOpen, onClose }: AbsenceRuleModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Text>수료 불가</Text>
        <Description>
          {`현재 지각/결석 횟수가 디프만 수료 기준을 초과하여\n 수료가 불가능합니다. 담당 운영진에게 문의하세요.`}
        </Description>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.h3};
  color: #1e1e1e;
`;

const Description = styled.p`
  line-height: 22px;
  ${({ theme }) => theme.typo.p};
  color: ${({ theme }) => theme.color.gray_500};
`;

const ConfirmButton = styled(Button)`
  width: 100%;
`;
