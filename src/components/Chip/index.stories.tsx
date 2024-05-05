import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import Chip from '.';

const meta: Meta<typeof Chip> = {
  title: 'Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    isSelected: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    isSelected: true,
    children: '1팀',
  },
};

export const All = () => {
  const [selected, setSelected] = useState(1);
  return (
    <ChipWrapper>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Chip key={index} isSelected={selected === index} onClick={() => setSelected(index)}>
          {index}팀
        </Chip>
      ))}
    </ChipWrapper>
  );
};

const ChipWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;
