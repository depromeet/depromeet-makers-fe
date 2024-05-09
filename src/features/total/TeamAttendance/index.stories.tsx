import type { Meta, StoryObj } from '@storybook/react';

import { TeamAttendance } from '.';

const meta: Meta<typeof TeamAttendance> = {
  title: 'totalAttendance/TeamAttendance',
  component: TeamAttendance,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TeamAttendance>;

export const Default: Story = {
  args: {
    teamNumber: 1,
    attendantCount: 0,
    totalCount: 10,
  },
};
