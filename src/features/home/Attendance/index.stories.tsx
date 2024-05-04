import type { Meta } from '@storybook/react';

import { Attendance } from '.';

const meta: Meta<typeof Attendance> = {
  title: 'home/Attendance',
  component: Attendance,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return <Attendance />;
};
