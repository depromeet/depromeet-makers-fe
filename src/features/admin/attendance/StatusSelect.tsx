import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import styled, { useTheme } from 'styled-components';

import Icon from '@/components/Icon';
import { ATTENDANCE_STATUS } from '@/constants/attendance';
import { ATTENDANCE_STATUS_LIST } from '@/constants/attendance';
import useOutsideClick from '@/hooks/useOutsideClick';

type DropdownPosition = 'top' | 'bottom';

interface Props {
  value: ATTENDANCE_STATUS;
  onClick: (value: ATTENDANCE_STATUS) => void;
}

function StatusSelect(props: Props) {
  const theme = useTheme();

  const selectRef = useRef<HTMLDivElement>(null);

  const [dropdownPosition, setDropdownPosition] = useState<DropdownPosition>();
  const [isShowing, setIsShowing] = useState(false);

  const getPosition = useCallback(() => {
    if (selectRef.current) {
      const { top, bottom } = selectRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const DROPDOWN_HEIGHT = 230 + 64;
      if (top < DROPDOWN_HEIGHT) {
        return 'bottom';
      }
      if (windowHeight - bottom < DROPDOWN_HEIGHT) {
        return 'top';
      }
      return 'bottom';
    }
  }, [selectRef.current?.getBoundingClientRect()]);

  useEffect(() => {
    if (selectRef.current) {
      const position = getPosition();
      setDropdownPosition(position);
    }
  }, [getPosition]);

  return (
    <Container ref={selectRef}>
      <Label
        onClick={() => {
          setIsShowing((prev) => !prev);
        }}
        status={props.value}
      >
        <span>{props.value}</span>
        <Icon name="arrow-down" color={theme.color.gray_400} width={16} height={16} />
      </Label>
      <AnimatePresence>
        {isShowing && (
          <Dropdown onClick={props.onClick} onClose={() => setIsShowing(false)} position={dropdownPosition} />
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Label = styled.button<{ status: ATTENDANCE_STATUS }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  padding: 8px;
  ${({ theme }) => theme.typo.subtitle2};

  color: ${({ status, theme }) => {
    switch (status) {
      case ATTENDANCE_STATUS.출석:
        return theme.color.green_300;
      case ATTENDANCE_STATUS.지각:
        return theme.color.yellow_300;
      case ATTENDANCE_STATUS.결석:
        return theme.color.red_300;
      case ATTENDANCE_STATUS.출석대기:
        return theme.color.gray_400;
    }
  }};
`;

export default StatusSelect;

interface DropdownProps {
  onClick: (value: ATTENDANCE_STATUS) => void;
  onClose: () => void;
  position?: DropdownPosition;
}

function Dropdown({ position = 'bottom', ...props }: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: dropdownRef,
    handler: () => {
      props.onClose();
    },
  });

  const variant = {
    initial: () => ({ opacity: 0, y: 0 }),
    animate: { opacity: 1, y: position === 'bottom' ? 8 : -8 },
    exit: { opacity: 0, y: 0 },
  };

  return (
    <DropdownContainer
      ref={dropdownRef}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant}
      style={{
        top: position === 'bottom' ? '100%' : 'auto',
        bottom: position === 'top' ? '100%' : 'auto',
      }}
    >
      {ATTENDANCE_STATUS_LIST.map((status) => (
        <DropdownItem
          key={`status-${status}`}
          onClick={() => {
            props.onClick(status);
            props.onClose();
          }}
        >
          {status}
        </DropdownItem>
      ))}
    </DropdownContainer>
  );
}

const DropdownContainer = styled(m.div)`
  position: absolute;
  right: 0;

  display: flex;
  flex-direction: column;
  width: 190px;
  padding: 0px 16px;
  border-radius: 6px;
  box-shadow: 8px 8px 16px 0px rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.gray_200};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

const DropdownItem = styled.button`
  padding: 16px 0;
  ${({ theme }) => theme.typo.subtitle3};
  font-weight: 400;
  text-align: left;
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 20px;
  & + & {
    border-top: 1px solid ${({ theme }) => theme.color.gray_200};
  }
`;
