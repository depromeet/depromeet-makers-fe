import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import { useSnackBar } from '@/components/SnackBar/useSnackBar';
import { SNACKBAR_MESSAGE } from '@/constants/errorMessage';
import { useGeolocation } from '@/useGeolocation';

interface CheckInResponse {
  code: string;
  message: string;
  data: unknown;
}

export const useCheckIn = (options?: UseMutationOptions<CheckInResponse, CustomError>) => {
  const location = useGeolocation();
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();

  return useMutation({
    mutationFn: () => api.post<CheckInResponse>(`/v1/check-in`, location),
    ...options,
    onSuccess: (data, ...rest) => {
      showSnackBar({ message: SNACKBAR_MESSAGE['200'] ?? data.message });

      options?.onSuccess?.(data, ...rest);

      return queryClient.invalidateQueries({ queryKey: ['attendances-me'] });
    },
    onError: (data, ...rest) => {
      showSnackBar({ message: SNACKBAR_MESSAGE[data.code] ?? data.message });

      options?.onError?.(data, ...rest);
    },
  });
};
