import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

import { api } from '@/apis';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { SNACKBAR_MESSAGE } from '@/constants/errorMessage';
import { modalAtom } from '@/store/modal';

interface CodeCheckInRequest {
  code: string;
}

interface CodeCheckInResponse {
  code: string;
  message: string;
  data: unknown;
}

interface CodeCheckInError {
  code: string;
  message: string;
  data?: {
    tryCount?: number;
  };
}

export const getErrorMessage = (tryCount?: number) => {
  return {
    '200': '✅ 출석이 완료되었습니다.',
    AT0008: `잘못된 출석 코드입니다. 다시 시도해주세요. (${tryCount}/3)`,
    AT0010: '출석 인증 횟수를 초과했습니다. 담당운영진에게 문의해주세요',
  } as { [key: string]: string };
};

export const useCodeCheckIn = (
  options?: UseMutationOptions<CodeCheckInResponse, CodeCheckInError, CodeCheckInRequest>,
) => {
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const setIsModalOpen = useSetAtom(modalAtom);

  return useMutation({
    mutationFn: (code: CodeCheckInRequest) => api.post<CodeCheckInResponse>(`/v1/check-in/code`, code),
    ...options,
    onSuccess: (data, ...rest) => {
      setIsModalOpen(false);

      showSnackBar({ message: SNACKBAR_MESSAGE['200'] ?? data.message });

      options?.onSuccess?.(data, ...rest);

      return queryClient.invalidateQueries({ queryKey: ['attendances-me'] });
    },
    onError: (data, ...rest) => {
      options?.onError?.(data, ...rest);
    },
  });
};
