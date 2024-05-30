import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';

const GET_INFO_URL = '/v1/me';

type Role = 'ORGANIZER' | 'MEMBER';

interface GetInfoResponse {
  id: string;
  name: string;
  email: string;
  generations: {
    generationId: number;
    role: Role;
    position: string;
  }[];
}

export const getInfoByToken = async (token: string): Promise<GetInfoResponse> => {
  return await api.get<GetInfoResponse>(GET_INFO_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserRoleByToken = async (token: string): Promise<Role> => {
  const { generations } = await getInfoByToken(token);

  return generations[0].role;
};

export const getInfo = () => api.get<GetInfoResponse>(GET_INFO_URL);

export const useGetInfo = (options?: UseQueryOptions<GetInfoResponse, CustomError>) =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => getInfo(),
    ...options,
  });

// export const fetchUserInfo = () => fetch(GET_INFO_URL)
export const fetchUserInfo = async (accessToken: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await response.json();

  return data;
};

export const fetchUserRole = async (accessToken: string): Promise<Role> => {
  const data = await fetchUserInfo(accessToken);
  return data.generations[0].role;
};
