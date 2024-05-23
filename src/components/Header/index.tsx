import { useRouter } from 'next/router';
import styled from 'styled-components';

import theme from '@/styles/theme';

import Icon from '../Icon';

type HeaderProps = {
  title: string;
  canBack?: boolean;
  canClose?: boolean;
  onClose?: () => void;
  backgroundColor?: string;
};

export const Header = ({ title, canBack, canClose, onClose, backgroundColor = 'transparent' }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <HeaderStyled backgroundColor={backgroundColor}>
      <button type="button" onClick={handleBack}>
        {canBack && <Icon name="arrow-left" />}
      </button>
      <Title>{title}</Title>
      {canClose && (
        <button type="button" onClick={onClose}>
          <Icon name="x-icon" color={theme.color.black} width={24} height={24} />
        </button>
      )}
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header<Omit<HeaderProps, 'title'>>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  padding: 20px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.typo.title1};
  color: ${({ theme }) => theme.color.gray_900};
  line-height: 24px;
`;
