import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import type { CustomError } from '../../../apis';
import { api } from '../../../apis';
import { COOKIE_KEY } from '../../../constants/cookie';

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
    onSuccess: async (data, ...rest) => {
      Cookies.set(COOKIE_KEY.ACCESS_TOKEN, data.accessToken, { expires: 1 });
      Cookies.set(COOKIE_KEY.REFRESH_TOKEN, data.refreshToken, { expires: 7 });

      options?.onSuccess?.({ ...data }, ...rest);
    },
  });
