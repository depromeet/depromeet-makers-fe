import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '../../../apis';
import { api } from '../../../apis';

interface GetSessionRequest {
  generation: number;
}

interface GetSessionResponse {
  week: number;
}

const getSessionList = async (): Promise<GetSessionResponse> => {
  const generation = process.env.NEXT_PUBLIC_DEPROMEET_GENERATION;
  const request: GetSessionRequest = { generation: Number(generation) };

  return await api.get<GetSessionResponse>('/v1/sessions/info', { params: request });
};

export const useGetSession = (options?: UseQueryOptions<GetSessionResponse, CustomError, GetSessionResponse>) =>
  useQuery({
    queryKey: ['session'],
    queryFn: () => getSessionList(),
    ...options,
  });
