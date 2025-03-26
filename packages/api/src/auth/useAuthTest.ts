import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';
import { setAccessToken, setRefreshToken } from '../base/token';

interface PostAuthTestResponse {
  accessToken: string;
  refreshToken: string;
}

const postAuthTest = () => {
  return api.post<PostAuthTestResponse>('/v1/auth/test');
};

export const useAuthTest = (options?: UseMutationOptions<PostAuthTestResponse, CustomError>) =>
  useMutation({
    mutationFn: postAuthTest,
    ...options,
    onSuccess: async (data, ...params) => {
      await setAccessToken(data.accessToken);
      await setRefreshToken(data.refreshToken);

      options?.onSuccess?.(data, ...params);
    },
  });
