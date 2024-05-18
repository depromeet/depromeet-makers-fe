import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { useGeolocation } from '@/hooks/useGeolocation';

interface CheckInResponse {
  code: string;
  message: string;
  data: unknown;
}

const SNACKBAR_MESSAGE: Record<string, string> = {
  '200': '✅ 출석이 완료되었습니다.',
  AT0006: '📍 세션 장소로 진입해야 출석이 가능합니다.',
  AT0002: '🚨 출석 인증기간이 초과되었습니다. \n출석 증빙은 담당 운영진에게 문의하세요.',
};

export const useCheckIn = (options?: UseMutationOptions<CheckInResponse, CustomError>) => {
  const location = useGeolocation();
  const { showSnackBar } = useSnackBar();

  return useMutation({
    mutationFn: () => api.post<CheckInResponse>(`/v1/check-in`, location),
    ...options,
    onSuccess: (data, ...rest) => {
      showSnackBar({ message: SNACKBAR_MESSAGE[data.code] ?? data.message });

      options?.onSuccess?.(data, ...rest);
    },
    onError: (data, ...rest) => {
      showSnackBar({ message: SNACKBAR_MESSAGE[data.code] ?? data.message });

      options?.onError?.(data, ...rest);
    },
  });
};
