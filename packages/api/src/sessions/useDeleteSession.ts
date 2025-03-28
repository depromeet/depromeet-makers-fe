import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomError } from '../base';
import { api } from '../base';
import type { Session } from '../types';

interface DeleteSessionRequest extends Pick<Session, 'sessionId'> {}

interface DeleteSessionResponse extends Session {}

const deleteSession = ({ sessionId }: DeleteSessionRequest) => {
  return api.delete<DeleteSessionResponse>(`/v1/sessions/${sessionId}`);
};

export const useDeleteSession = (
  options?: UseMutationOptions<DeleteSessionResponse, CustomError, DeleteSessionRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId }: DeleteSessionRequest) => deleteSession({ sessionId }),
    ...options,
    onSuccess: (...params) => {
      options?.onSuccess?.(...params);

      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });
};
