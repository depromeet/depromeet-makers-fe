import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import ChipLine from '@/components/Chip/ChipLine';

import BottomSheet from '.';

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: BottomSheet,
};

export default meta;

export function Default() {
  const [selected, setSelected] = useState(1);
  const [isShowing, setIsShowing] = useState(true);

  const toggleShowing = () => setIsShowing((prev) => !prev);

  return (
    <LazyMotion features={domMax}>
      <div style={{ minHeight: '300vh' }}>
        <button type="button" onClick={toggleShowing}>
          toggle
        </button>
      </div>
      <BottomSheet onClickOutside={toggleShowing} isShowing={isShowing}>
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <ChipLine key={index} isSelected={selected === index} onClick={() => setSelected(index)}>
            {index}주차
          </ChipLine>
        ))}
      </BottomSheet>
    </LazyMotion>
  );
}
