import type { ComponentProps, PropsWithChildren } from 'react';
import type { AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

import Icon from '../Icon';
import AnimatePortal from '../Portal/AnimatePortal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: ComponentProps<typeof AnimatePresence>['mode'];
}

export const Modal = ({ isOpen, onClose, mode = 'wait', children }: PropsWithChildren<ModalProps>) => {
  return (
    <AnimatePortal isShowing={isOpen} mode={mode}>
      <Overlay onClick={onClose}>
        <Content>
          <Header>
            <CloseButton type="button" onClick={onClose}>
              <Icon name="x-icon" />
            </CloseButton>
          </Header>
          {children}
        </Content>
      </Overlay>
    </AnimatePortal>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.8);
`;

const Header = styled.div`
  display: flex;
  padding: 16px;
  gap: 10px;
`;

const Content = styled.div`
  position: relative;
  width: 351px;
  max-width: 100%;

  padding: 20px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
`;
