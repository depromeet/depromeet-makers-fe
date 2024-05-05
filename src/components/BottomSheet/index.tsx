import { type ComponentProps, type MouseEventHandler } from 'react';
import { m, type Variants } from 'framer-motion';
import styled from 'styled-components';

import Icon from '../Icon';
import AnimatePortal from '../Portal/AnimatePortal';

interface Props extends ComponentProps<typeof AnimatePortal> {
  /**
   * scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
   */
  onClickOutside?: VoidFunction;
}

const BottomSheet = ({ onClickOutside, isShowing, children, mode }: Props) => {
  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  return (
    <AnimatePortal isShowing={isShowing} mode={mode}>
      <MobileScrim
        onClick={onClickOutsideDefault}
        variants={bottomSheetFadeInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Content variants={bottomSheetVariants}>
          <Header>
            <button onClick={onClickOutside}>
              <Icon name="x-icon" width={16} height={16} color="#000000" />
            </button>
          </Header>
          <ScrollableContent>{children}</ScrollableContent>
        </Content>
      </MobileScrim>
    </AnimatePortal>
  );
};

export default BottomSheet;

const easing = [0.6, -0.05, 0.01, 0.99];

const bottomSheetFadeInVariants: Variants = {
  initial: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'opacity',
  },
};

const MobileScrim = styled(m.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  left: 0;

  overflow: hidden;

  width: 100vw;
  height: 100%;

  background: rgba(15, 23, 42, 0.5);
  max-width: ${({ theme }) => theme.maxWidth};
  z-index: ${({ theme }) => theme.zIndex.backdrop};
`;

const Content = styled(m.div)`
  position: absolute;
  z-index: ${({ theme }) => theme.zIndex.modal};
  top: 100%;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 0px 20px;

  /* TODO: 디자인에 따라 변경 필요 */
  max-height: calc(100vh - 175px);
  background-color: #fff;
  border-radius: 24px 24px 0 0;
`;

const ScrollableContent = styled.div`
  width: calc(100% + 14px);
  overflow-y: auto;
  position: relative;
  left: 7px;

  &::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  &::-webkit-scrollbar-thumb {
    outline: none;
    border-radius: 10px;
    border: 4px solid transparent;
    box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.15);
  }

  &::-webkit-scrollbar-thumb:hover {
    border: 4px solid transparent;
    box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
  }

  &::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 16px 0px;

  > button {
    float: right;
    height: 16px;
  }
`;

const bottomSheetVariants: Variants = {
  initial: {
    y: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'transform',
  },
  animate: {
    y: '-100%',
    transition: { duration: 0.3, ease: easing },
    willChange: 'transform',
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: 'transform',
  },
};
