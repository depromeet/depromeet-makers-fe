import { useRouter } from 'next/router';
import styled from 'styled-components';

import theme from '@/styles/theme';

import Icon from '../Icon';

type HeaderProps = {
  title: string;
  canBack?: boolean;
  canClose?: boolean;
  onClose?: () => void;
};

export const Header = ({ title, canBack, canClose, onClose }: HeaderProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <HeaderStyled>
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
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.typo.title1};
  color: ${({ theme }) => theme.color.gray_900};
  font-weight: 500;
  line-height: 24px;
`;
