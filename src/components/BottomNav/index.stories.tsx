import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import { BottomNav } from '.';

const meta: Meta<typeof BottomNav> = {
  title: 'BottomNav',
  component: BottomNav,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <BottomNavWrapper>
      <BottomNav />
    </BottomNavWrapper>
  );
};

const BottomNavWrapper = styled.div`
  width: 500px;
  height: 500px;
`;
