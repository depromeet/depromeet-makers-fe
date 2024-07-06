import type { Meta } from '@storybook/react';
import styled from 'styled-components';

import { Accordion, AccordionItem } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;

export const Default = () => {
  return (
    <AccordionWrapper>
      <Accordion>
        <AccordionItem title="아코디언 제목">
          아코디언 내용 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게
          길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게 길게
        </AccordionItem>
      </Accordion>
    </AccordionWrapper>
  );
};

const AccordionWrapper = styled.div`
  width: 500px;
  padding: 16px;
`;
