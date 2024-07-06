import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import { Badge } from '.';

const meta: Meta<typeof Badge> = {
  title: 'Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: '뱃지 텍스트',
  },
};

export const All = () => {
  return (
    <BadgeWrapper>
      <Badge variant="default">뱃지 텍스트</Badge>
      <Badge variant="black">뱃지 텍스트</Badge>
      <Badge variant="line">뱃지 텍스트</Badge>
      <Badge variant="error">뱃지 텍스트</Badge>
    </BadgeWrapper>
  );
};

const BadgeWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;
