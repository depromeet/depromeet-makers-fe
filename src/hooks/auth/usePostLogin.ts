import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

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

interface PostLoginError extends AxiosError {
  data: {
    code: string;
    data?: string;
    message: string;
  };
}

const postLogin = async (request: PostLoginRequest): Promise<PostLoginResponse> => {
  const res = await api.post<PostLoginResponse>('/v1/auth/login', request);
  return res.data;
};

export const usePostLogin = (options?: UseMutationOptions<PostLoginResponse, PostLoginError, PostLoginRequest>) =>
  useMutation({
    mutationFn: postLogin,
    ...options,
    onSuccess: (data, v, c) => {
      window.localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, data.accessToken);
      window.localStorage.setItem(STORAGE_KEY.REFRESH_TOKEN, data.refreshToken);

      options?.onSuccess?.(data, v, c);
    },
  });
