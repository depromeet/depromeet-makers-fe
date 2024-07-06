import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '../../../apis';
import { api } from '../../../apis';

interface SessionType {
  sessionId: string;
  week: number;
  title: string;
  startTime: string;
  sessionType: string;
  place: string;
  generation: number;
  description?: string;
}

interface GetSessionListRequest {
  generation: number;
}

interface GetSessionListResponse {
  generation: number;
  sessions: SessionType[];
}

const getSessionList = async (): Promise<GetSessionListResponse> => {
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
