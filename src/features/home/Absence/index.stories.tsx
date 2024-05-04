import type { Meta, StoryObj } from '@storybook/react';

import { Absence } from '.';

const meta: Meta<typeof Absence> = {
  title: 'home/Absence',
  component: Absence,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Absence>;

export const Default: Story = {
  args: {
    offlineAbsenceCount: 1,
    totalAbsenceCount: 2,
  },
};
