import { useState } from 'react';
import { domMax, LazyMotion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import BottomSheet from '@depromeet-makers-fe/ui/src/components/BottomSheet'; // TODO (@kimyouknow) module export 설정 수정하기
import ChipLine from '@depromeet-makers-fe/ui/src/components/Chip/ChipLine'; // TODO (@kimyouknow) module export 설정 수정하기
import Icon from '@depromeet-makers-fe/ui/src/components/Icon/Icon/Icon'; // TODO (@kimyouknow) module export 설정 수정하기

const WEEK_COUNT = 16;
const WEEK_LIST = Array.from({ length: WEEK_COUNT }).map((_, index) => index + 1);

interface Props {
  value: number;
  onChange: (value: number) => void;
}

function WeekSelect(props: Props) {
  const [isShowing, setIsShowing] = useState(false);

  const toggleShowing = () => setIsShowing((prev) => !prev);

  const theme = useTheme();

  return (
    <LazyMotion features={domMax}>
      <Label onClick={toggleShowing}>
        <span>{props.value}주차</span>
        <Icon name="arrow-down" color={theme.color.gray_400} width={24} height={24} />
      </Label>
      <BottomSheet onClickOutside={toggleShowing} isShowing={isShowing}>
        {WEEK_LIST.map((week) => (
          <ChipLine
            key={week}
            isSelected={props.value === week}
            onClick={() => {
              props.onChange(week);
              toggleShowing();
            }}
          >
            {week}주차
          </ChipLine>
        ))}
      </BottomSheet>
    </LazyMotion>
  );
}

export default WeekSelect;

const Label = styled.div`
  ${({ theme }) => theme.typo.h2};
  color: ${({ theme }) => theme.color.gray_900};

  display: inline-flex;
  align-items: center;
  gap: 4px;
`;
