import type { UseQueryOptions } from '@tanstack/react-query';
import { useSuspenseQuery } from '@tanstack/react-query';

import type { Session } from '@/types';

import type { CustomError } from '../base';
import { api } from '../base';

const fetchSessionDetail = (sessionId: Session['sessionId']) => {
  return api.get<Session>(`/v1/sessions/${sessionId}`);
};

export const getSessionDetailOptions = (sessionId: string) => ({
  queryKey: ['session', sessionId],
  queryFn: () => fetchSessionDetail(sessionId),
});

export const useGetSessionDetail = (
  sessionId: Session['sessionId'],
  options?: UseQueryOptions<Session, CustomError, Session>,
) =>
  useSuspenseQuery({
    ...getSessionDetailOptions(sessionId),
    ...options,
  });
