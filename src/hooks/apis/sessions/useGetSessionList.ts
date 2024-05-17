import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';

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

const INIT_DATA = {
  generation: 15,
  sessions: [
    {
      sessionId: '01HWPNRE5TS9S7VC99WPETE5KE',
      generation: 15,
      week: 1,
      title: '오리엔테이션',
      description: '세션 설명을 입력해주세요.',
      startTime: '2021-10-01T19:00:00',
      sessionType: 'ONLINE',
      place: '온라인',
    },
    {
      sessionId: '01HWPNRE5TS9S7VC99WPETE5KE2',
      week: 2,
      title: '2주차 일정',
      generation: 15,
      startTime: '2021-10-02T19:00:00',
      description: '세션 설명을 입력해주세요.',
      sessionType: 'ONLINE',
      place: '게더',
    },
    {
      sessionId: '01HWPNRE5TS9S7VC99WPETE5KE3',
      week: 3,
      generation: 15,
      title: '3주차 일정',
      startTime: '2021-10-03T19:00:00',
      sessionType: 'OFFLINE',
      place: '오프라인',
    },
    {
      sessionId: '01HWPNRE5TS9S7VC99WPETE5KE4',
      generation: 15,
      week: 4,
      title: '4주차 일정',
      startTime: '2021-10-04T19:00:00',
      sessionType: 'ONLINE',
      place: '온라인',
    },
  ],
};

const getSessionList = async (): Promise<GetSessionListResponse> => {
  const generation = process.env.NEXT_PUBLIC_DEPROMEET_GENERATION;
  const request: GetSessionListRequest = { generation: Number(generation) };

  return await api.get<GetSessionListResponse>('/sessions', { params: request });
};

export const useGetSessionList = (
  options?: UseQueryOptions<GetSessionListResponse, CustomError, GetSessionListResponse>,
) =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: () => getSessionList(),
    initialData: INIT_DATA,
    ...options,
  });
