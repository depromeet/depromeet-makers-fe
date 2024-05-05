import React from 'react';
import styled from 'styled-components';

import { Accordion, AccordionItem } from '@/components/Accordion';
import { Badge } from '@/components/Badge';

import type { ScheduleType } from '../index.constants';

interface ScheduleItemProps extends ScheduleType {
  week: number;
  isToday?: boolean;
}

function ScheduleItem(props: ScheduleItemProps) {
  return (
    <Container>
      <Head>
        <HeadLeft>
          <Badge variant="default">{props.week}주차</Badge>
          <Title isToday={props.isToday}>{props.title}</Title>
        </HeadLeft>
        {props.isOffline ? <Badge variant="black">오프라인</Badge> : <Badge variant="line">온라인</Badge>}
      </Head>
      <Accordion>
        <AccordionItem title={props.title}>{props.desc}</AccordionItem>
      </Accordion>
    </Container>
  );
}

export default ScheduleItem;

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Title = styled.p<Pick<ScheduleItemProps, 'isToday'>>`
  ${({ theme }) => theme.typo.subtitle2};
  position: relative;

  &::after {
    display: ${({ isToday }) => (isToday ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: 0;
    right: -6px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.color.gray_500};
  }
`;
