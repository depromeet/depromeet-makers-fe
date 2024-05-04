import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import { FAB } from '.';

const meta: Meta<typeof FAB> = {
  title: 'FAB',
  component: FAB,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <FABWrapper>
      <FAB text="플로팅 버튼 텍스트" subText="서브 텍스트" />
    </FABWrapper>
  );
};

const FABWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 30px;
  width: 500px;
  height: 500px;
  background-color: ${({ theme }) => theme.color.gray_100};
`;
