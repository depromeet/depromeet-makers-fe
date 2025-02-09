import { api } from '..';

interface AuthRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthRefreshRequest {
  refreshToken: string;
}

// 토큰 재발급 확인 필요
export const postAuthRefresh = async (request: AuthRefreshRequest): Promise<AuthRefreshResponse> => {
  const res = await api.post<AuthRefreshResponse>('/auth/refresh', request);

  return res;
};
