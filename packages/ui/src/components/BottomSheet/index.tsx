import { type ComponentProps, type MouseEventHandler, useEffect } from "react";
import { m, type Variants } from "framer-motion";
import styled from "styled-components";

import { useScrollLock } from "../../hooks/useScrollLock";

import { AnimatePortal } from "../Portal";
import { Icon } from "../Icon";

interface Props extends ComponentProps<typeof AnimatePortal> {
  /**
   * scrim을 클릭했을 때 실행되는 함수이며, 기본적으로 target을 확인한 후 실행됩니다
   */
  onClickOutside?: VoidFunction;
}

const BottomSheet = ({ onClickOutside, isShowing, children, mode }: Props) => {
  const { lockScroll, unlockScroll } = useScrollLock();

  const onClickOutsideDefault: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target !== e.currentTarget) return;
    if (onClickOutside) onClickOutside();
  };

  useEffect(() => {
    if (isShowing) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isShowing, lockScroll, unlockScroll]);

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
              <Icon name="x-icon" width={24} height={24} color="#000000" />
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
    willChange: "opacity",
  },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: easing },
    willChange: "opacity",
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: "opacity",
  },
};

const MobileScrim = styled(m.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  left: 0;
  margin: 0 auto;

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
  width: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
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
    willChange: "transform",
  },
  animate: {
    y: "-100%",
    transition: { duration: 0.3, ease: easing },
    willChange: "transform",
  },
  exit: {
    y: 0,
    transition: { duration: 0.3, ease: easing },
    willChange: "transform",
  },
};
