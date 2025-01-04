import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import ChipLine from './ChipLine';
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

export const ChipAll = () => {
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

export const LineAll = () => {
  const [selected, setSelected] = useState(1);
  return (
    <ChipLineWrapper>
      {[1, 2].map((index) => (
        <ChipLine key={index} isSelected={selected === index} onClick={() => setSelected(index)}>
          {index}주차
        </ChipLine>
      ))}
    </ChipLineWrapper>
  );
};

const ChipWrapper = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const ChipLineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
