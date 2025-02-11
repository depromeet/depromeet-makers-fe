import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';
import type { Session } from '../types/session';

interface GetSessionListRequest {
  generation: number;
}

interface GetSessionListResponse {
  generation: number;
  sessions: Session[];
}

export const getSessionList = async (): Promise<GetSessionListResponse> => {
  const generation = process.env.NEXT_PUBLIC_DEPROMEET_GENERATION;
  const request: GetSessionListRequest = { generation: Number(generation) };

  return await api.get<GetSessionListResponse>('/v1/sessions', { params: request });
};

export const useGetSessionList = (
  options?: UseQueryOptions<GetSessionListResponse, CustomError, GetSessionListResponse>,
) =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: () => getSessionList(),
    ...options,
  });
