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

export const useCheckIn = (options?: UseMutationOptions<CheckInResponse, CustomError>) => {
  const location = useGeolocation();
  const { showSnackBar } = useSnackBar();

  return useMutation({
    mutationFn: () => api.post<CheckInResponse>(`/v1/check-in`, location),
    ...options,
    onSuccess: (data, ...rest) => {
      showSnackBar({ message: data.message });

      options?.onSuccess?.(data, ...rest);
    },
    onError: (data, ...rest) => {
      console.log(data);
      showSnackBar({ message: data.message });

      options?.onError?.(data, ...rest);
    },
  });
};
