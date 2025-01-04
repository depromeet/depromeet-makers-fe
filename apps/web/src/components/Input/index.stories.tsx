import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import Input from '.';

const meta: Meta<typeof Input> = {
  title: 'Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const All = () => {
  return (
    <InputWrapper>
      <Input />
      <Input placeholder="이메일을 입력해주세요." />
      <Input value="pietro.schirano@gmail.com" />
      <Input value="pietro.schirano@gmail.com" error="현 기수에 해당하는 이메일이 아닙니다." />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;
