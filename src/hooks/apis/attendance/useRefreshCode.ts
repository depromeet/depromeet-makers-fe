import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';

interface RefreshResponse {
  code: string;
  message: string;
  data: unknown;
}

export const useRefreshCode = (options?: UseMutationOptions<RefreshResponse, CustomError, string>) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => api.patch<RefreshResponse>(`/v1/sessions/${sessionId}/code`),
    ...options,
    onSuccess: (data, ...rest) => {
      options?.onSuccess?.(data, ...rest);

      return queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};
