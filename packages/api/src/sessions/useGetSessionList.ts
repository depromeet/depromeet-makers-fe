import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';
import type { Session } from '../types/session';

interface GetSessionListRequest {
  generation: number;
}

interface SessionResponse extends Session {
  code: string;
}

interface GetSessionListResponse extends Array<SessionResponse> {}

export const getSessionList = async (): Promise<GetSessionListResponse> => {
  const generation = process.env.NEXT_PUBLIC_DEPROMEET_GENERATION;
  const request: GetSessionListRequest = { generation: Number(generation) };

  return await api.get<GetSessionListResponse>('/v1/sessions', { params: request });
};

export const getSuspenseSessionList = () => {
  const generation = process.env.NEXT_PUBLIC_DEPROMEET_GENERATION;
  const request: GetSessionListRequest = { generation: Number(generation) };

  return api.get<GetSessionListResponse>('/v1/sessions', { params: request });
};

export const getSuspenseSessionListOption = () => ({
  queryKey: ['sessions'],
  queryFn: () => getSuspenseSessionList(),
});

export const useGetSessionList = (
  options?: UseQueryOptions<GetSessionListResponse, CustomError, GetSessionListResponse>,
) =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: () => getSessionList(),
    ...options,
  });

export const useGetSuspenseSessionList = (
  options?: UseQueryOptions<GetSessionListResponse, CustomError, GetSessionListResponse>,
) =>
  useSuspenseQuery({
    ...getSuspenseSessionListOption(),
    ...options,
  });
