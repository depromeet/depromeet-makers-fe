import { type PropsWithChildren, useState } from 'react';
import { AnimatePresence, domAnimation, LayoutGroup, LazyMotion, m, useWillChange } from 'framer-motion';
import styled from 'styled-components';

import { TRANSITION_VARIANTS } from '../../styles/theme/transition';

import Icon from '../Icon';

interface AccordionItemProps extends PropsWithChildren {
  title: string;
}

interface AccordionIcon {
  isOpen: boolean;
}

export const Accordion = ({ children }: PropsWithChildren) => {
  return <AccordionContainer>{children}</AccordionContainer>;
};

export const AccordionItem = ({ title, children }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const willChange = useWillChange();

  const isContentExist = Boolean(children);

  return (
    <AccordionItemContainer>
      <AccordionItemHeader onClick={() => isContentExist && setIsOpen((prev) => !prev)}>
        {title && <AccordionItemTitle>{title}</AccordionItemTitle>}
        {isContentExist && <AccordionItemArrow name="arrow-down" isOpen={isOpen} />}
      </AccordionItemHeader>

      <AnimatePresence initial={false}>
        {isOpen && (
          <LazyMotion features={domAnimation}>
            <m.section
              key="accordion-content"
              animate="enter"
              exit="exit"
              initial="exit"
              style={{ overflowY: 'hidden', willChange }}
              variants={TRANSITION_VARIANTS.collapse}
            >
              <AccordionItemContent>{children}</AccordionItemContent>
            </m.section>
          </LazyMotion>
        )}
      </AnimatePresence>
    </AccordionItemContainer>
  );
};

const AccordionContainer = styled(LayoutGroup)`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AccordionItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AccordionItemHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AccordionItemArrow = styled(Icon)<AccordionIcon>`
  transform: rotate(${({ isOpen }) => (isOpen ? '180deg' : '0deg')});
  transition: transform 0.3s ease;
`;

const AccordionItemTitle = styled.h2`
  ${({ theme }) => theme.typo.title3};

  font-weight: 600;
  color: ${({ theme }) => theme.color.gray_900};
`;

const AccordionItemContent = styled.p`
  ${({ theme }) => theme.typo.p};

  line-height: 22px;
  color: ${({ theme }) => theme.color.gray_900};
`;
