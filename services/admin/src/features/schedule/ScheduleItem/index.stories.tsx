import type { Meta, StoryObj } from '@storybook/react';

import ScheduleItem from '.';

const SCHEDULE = {
  date: '2024-05-05',
  isOffline: true,
  title: '오리엔테이션',
};

const meta: Meta<typeof ScheduleItem> = {
  title: 'schedule/ScheduleItem',
  component: ScheduleItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px', padding: '16px', backgroundColor: '#F1F5F9' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...SCHEDULE,
    week: 1,
  },
};
export default meta;

type Story = StoryObj<typeof ScheduleItem>;

export const Today: Story = {
  args: {
    desc: "Yes. It's animated by default, but you can disable it if you prefer.",
    isToday: true,
  },
};

export const NotToday: Story = {
  args: {
    desc: "Yes. It's animated by default, but you can disable it if you prefer.",
    isToday: false,
  },
};

export const NoDesc: Story = {
  args: {
    isToday: false,
  },
};
