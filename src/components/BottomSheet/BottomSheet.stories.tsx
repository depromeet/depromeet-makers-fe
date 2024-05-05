import { useState } from 'react';
import { type Meta } from '@storybook/react';
import { domMax, LazyMotion } from 'framer-motion';

import BottomSheet from './BottomSheet';

const meta: Meta<typeof BottomSheet> = {
  title: 'BottomSheet',
  component: BottomSheet,
};

export default meta;

export function Default() {
  const [isShowing, setIsShowing] = useState(true);

  const toggleShowing = () => setIsShowing((prev) => !prev);

  return (
    <LazyMotion features={domMax}>
      <button type="button" onClick={toggleShowing}>
        toggle
      </button>
      <BottomSheet onClickOutside={toggleShowing} isShowing={isShowing}>
        bottom sheet content
      </BottomSheet>
    </LazyMotion>
  );
}
