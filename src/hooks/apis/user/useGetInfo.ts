import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';

const GET_INFO_URL = '/v1/me';

import type { Role, UserInfo } from './user';

type GetInfoResponse = UserInfo;
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
