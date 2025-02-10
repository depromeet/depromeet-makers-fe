import { CURRENT_GENERATION } from '@depromeet-makers/constant';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';

interface GetSessionRequest {
  generation: number;
}

interface GetSessionResponse {
  week: number;
  startTime: string;
  sessionType: string;
  code: string;
}

export const fetchSessionList = (params: GetSessionRequest) => {
  return api.get<GetSessionResponse>('/v1/sessions/info', { params });
};

export const useGetSession = (
  params: GetSessionRequest = { generation: CURRENT_GENERATION },
  options?: UseQueryOptions<GetSessionResponse, CustomError, GetSessionResponse>,
) =>
  useQuery({
    queryKey: ['session', params.generation],
    queryFn: () => fetchSessionList(params),
    ...options,
  });
