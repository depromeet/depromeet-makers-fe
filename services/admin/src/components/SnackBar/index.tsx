import styled, { css } from 'styled-components';

import type { SnackBarProps } from '../../store/snackBar';

import Icon from '../Icon';

export const SnackBar = ({ id, message, showClose, onClose, ...props }: SnackBarProps) => {
  const handleClose = () => {
    onClose?.(id);
  };

  return (
    <SnackBarStyled showClose={showClose} onClick={handleClose} {...props}>
      {message}
      {showClose && <Icon name="x-icon" />}
    </SnackBarStyled>
  );
};

const SnackBarStyled = styled.button<Pick<SnackBarProps, 'showClose'>>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ theme }) => `calc(${theme.maxWidth} - 40px)`};
  font-weight: 500;

  @media (max-width: ${({ theme }) => theme.media.mobileMax}px) {
    width: calc(100vw - 40px);
  }

  ${({ theme }) => theme.typo.p};

  ${({ showClose, theme }) =>
    showClose
      ? css`
          padding: 12px 12px 12px 16px;
          border-radius: 12px;

          background-color: ${theme.color.gray_200};
          color: ${theme.color.gray_700};
          font-weight: 400;
        `
      : css`
          padding: 16px;
          border-radius: 8px;

          background-color: ${theme.color.gray_700};
          color: ${theme.color.white};
          font-weight: 500;
        `}
`;
