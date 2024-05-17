import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import { STORAGE_KEY } from '@/constants/storage';

interface PostLoginRequest {
  email: string;
  passCord: string;
}

interface PostLoginResponse {
  accessToken: string;
  refreshToken: string;
}

const postLogin = async (request: PostLoginRequest): Promise<PostLoginResponse> => {
  return await api.post<PostLoginResponse>('/v1/auth/login', request);
};

export const usePostLogin = (options?: UseMutationOptions<PostLoginResponse, CustomError, PostLoginRequest>) =>
  useMutation({
    mutationFn: postLogin,
    ...options,
    onSuccess: (data, ...rest) => {
      window.localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      window.localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);

      options?.onSuccess?.(data, ...rest);
    },
  });
