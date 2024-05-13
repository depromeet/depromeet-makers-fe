import React from 'react';
import styled from 'styled-components';

import type { IconComponentMap } from '../Icon';
import Icon from '../Icon';

export interface CheckedProps {
  week: number;
  variant: 'default' | 'lateness' | 'absent' | 'absent-proof';
}

interface UnCheckedProps {
  week: number;
  isOffline?: boolean;
}

export function AttendanceStatus(props: UnCheckedProps) {
  return (
    <UncheckedStyled {...props}>
      {props.isOffline && (
        <p>
          <strong>오프라인</strong>
        </p>
      )}
      <p>{props.week}주차</p>
    </UncheckedStyled>
  );
}

const BaseStyled = styled.div`
  ${({ theme }) => theme.typo.caption};

  width: 70px;
  height: 70px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const UncheckedStyled = styled(BaseStyled)<Partial<UnCheckedProps>>`
  color: ${({ theme }) => theme.color.gray_300};

  border: 1px dashed ${({ theme }) => theme.color.gray_300};
  background: ${({ theme }) => theme.color.gray_50};
  strong {
    color: ${({ theme }) => theme.color.gray_400};
  }
`;

const FACE_ICON_MAP: Record<CheckedProps['variant'], keyof typeof IconComponentMap> = {
  default: 'face',
  lateness: 'face-lateness',
  absent: 'face-absence',
  'absent-proof': 'face-absence',
};

export function AttendanceStatusChecked(props: CheckedProps) {
  return (
    <CheckedStyled {...props}>
      <Icon name={FACE_ICON_MAP[props.variant]} width={20} height={20} />
      <p>{props.week}주차</p>
    </CheckedStyled>
  );
}

const CheckedStyled = styled(BaseStyled)<Partial<CheckedProps>>`
  ${({ variant, theme }) => {
    switch (variant) {
      case 'default':
        return `
            background-color: ${theme.color.green_100};
            border: 1px solid ${theme.color.green_200};
            color: ${theme.color.green_300};

        `;
      case 'lateness':
        return `
            border: 1px solid ${theme.color.yellow_100};
            background: ${theme.color.yellow_200};
            color: ${theme.color.yellow_300};
        `;
      case 'absent':
        return `
            border: 1px solid ${theme.color.red_100};
            background: ${theme.color.red_200};
            color: ${theme.color.red_300};
        `;
      case 'absent-proof':
        return `
            border: 1px solid ${theme.color.red_100};
            background: ${theme.color.red_200};
            color: ${theme.color.red_300};

            &::after {
                content: '';
                position: absolute;
                background: ${theme.color.red_300};
                width: 5px;
                height: 5px;
                border-radius: 50%;
                top: 8px;
                right: 8px;
            }
        `;
    }
  }}
`;
