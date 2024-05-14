import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

type FABProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  subText?: string;
};

export const FAB = ({ subText, text, children, ...props }: FABProps) => {
  return (
    <FABStyled {...props}>
      <SubText>{subText}</SubText>
      <Text>{text}</Text>
      {children}
    </FABStyled>
  );
};

const FABStyled = styled.button`
  position: fixed;
  left: 50%;
  bottom: 108px;
  transform: translate(-50%, 0%);
  z-index: ${({ theme }) => theme.zIndex.fab};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 300px;
  padding: 18px 32px;

  border-radius: 40px;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.gray_900};
`;

const Text = styled.p`
  ${({ theme }) => theme.typo.title3};
  color: ${({ theme }) => theme.color.white};
`;

const SubText = styled.p`
  ${({ theme }) => theme.typo.caption};
  color: ${({ theme }) => theme.color.gray_300};
`;
