import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Session } from '@/types';

import type { CustomError } from '../base';
import { api } from '../base';

export const fetchSessionDetail = (sessionId: Session['sessionId']) => {
  return api.get<Session>(`/v1/sessions/${sessionId}`);
};

export const useGetSessionDetail = (
  sessionId: Session['sessionId'],
  options?: UseQueryOptions<Session, CustomError, Session>,
) =>
  useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => fetchSessionDetail(sessionId),
    ...options,
  });
