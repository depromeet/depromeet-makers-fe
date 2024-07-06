import type { StoryObj } from '@storybook/react';

import Button from '.';

const meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
  argTypes: {
    variant: {
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
      control: { type: 'radio' },
    },
    children: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};
