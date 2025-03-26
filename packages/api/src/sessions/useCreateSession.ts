import { CURRENT_GENERATION } from '@depromeet-makers/constant';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';
import type { Session } from '../types';

interface CreateSessionRequest extends Omit<Session, 'sessionId' | 'generation'> {}

interface CreateSessionResponse extends Session {}

const createSession = (request: CreateSessionRequest) => {
  return api.post<CreateSessionResponse>('/v1/sessions', { ...request, generation: CURRENT_GENERATION });
};

export const useCreateSession = (
  options?: UseMutationOptions<CreateSessionResponse, CustomError, CreateSessionRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    ...options,
    onSuccess: (...params) => {
      options?.onSuccess?.(...params);

      queryClient.invalidateQueries({
        queryKey: ['sessions'],
      });
    },
  });
};
