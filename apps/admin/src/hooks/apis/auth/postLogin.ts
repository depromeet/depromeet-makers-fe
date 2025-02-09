import type { UserRole } from '@/types/user';

interface LoginRequest {
  email: string;
  passCord: string;
}

interface PostLoginResponse {
  accessToken: string;
  refreshToken: string;
  currentRole: UserRole;
}

export const postLogin = async ({ email, passCord }: LoginRequest): Promise<PostLoginResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password: passCord }),
  });

  if (!response.ok) {
    throw new Error('로그인에 실패했습니다.');
  }

  return response.json();
};
