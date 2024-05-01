import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import { Header } from '.';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    title: '헤더 텍스트',
    canBack: true,
  },
};

export const All = () => {
  return (
    <HeaderWrapper>
      <Header title="뒤로가기 헤더" canBack />
      <Header title="닫기 헤더" canClose />
      <Header title="뒤로가기 + 닫기 헤더" canBack canClose />
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
