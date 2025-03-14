interface AuthRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface AuthRefreshRequest {
  refreshToken: string;
}

export const postAuthRefresh = async (request: AuthRefreshRequest): Promise<AuthRefreshResponse> => {
  const res = await fetch(`${process.env.API_URL}/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const responseToken = await res.json();

  return responseToken;
};
