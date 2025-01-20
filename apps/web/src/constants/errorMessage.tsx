import type { ReactNode } from 'react';

import { RequiredCodeMessage } from '../features/home/AttendanceCodeModal/RequiredCodeMessage';

export const SNACKBAR_MESSAGE: Record<string, ReactNode> = {
  '200': '✅ 출석이 완료되었습니다.',
  AT0005: <RequiredCodeMessage />,
  AT0006: '📍 세션 장소로 진입해야 출석이 가능합니다.',
  AT0002: '🚨 출석 인증기간이 초과되었습니다. \n출석 증빙은 담당 운영진에게 문의하세요.',
};
