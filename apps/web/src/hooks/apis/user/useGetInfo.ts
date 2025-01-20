import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import type { UserRole } from '@/types/user';

export interface GetInfoResponse {
  id: string;
  name: string;
  email: string;
  generations: {
    generationId: number;
    role: UserRole;
    position: string;
  }[];
}

export const getInfoByToken = async (token: string): Promise<GetInfoResponse> => {
  return await api.get<GetInfoResponse>('/v1/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserRoleByToken = async (token: string): Promise<UserRole> => {
  const { generations } = await getInfoByToken(token);

  return generations[0].role;
};

export const fetchInfo = () => api.get<GetInfoResponse>('/v1/me');

export const useGetInfo = (options?: UseQueryOptions<GetInfoResponse, CustomError>) =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => fetchInfo(),
    ...options,
  });
