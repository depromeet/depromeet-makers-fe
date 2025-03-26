import { CURRENT_GENERATION } from '@depromeet-makers/constant';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';
import type { Session } from '../types';

interface EditSessionRequest extends Omit<Session, 'sessionId' | 'generation'> {}

interface EditSessionResponse extends Session {}

const editSession = (sessionId: Session['sessionId'], request: EditSessionRequest) => {
  return api.put<EditSessionResponse>(`/v1/sessions/${sessionId}`, {
    ...request,
    generation: CURRENT_GENERATION,
  });
};

export const useEditSession = (
  sessionId: Session['sessionId'],
  options?: UseMutationOptions<EditSessionResponse, CustomError, EditSessionRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: EditSessionRequest) => editSession(sessionId, request),
    ...options,
    onSuccess: (...params) => {
      options?.onSuccess?.(...params);

      queryClient.invalidateQueries({
        queryKey: ['sessions'],
      });
    },
  });
};
