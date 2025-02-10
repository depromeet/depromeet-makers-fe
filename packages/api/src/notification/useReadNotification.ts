import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { CustomError } from '@/base';
import { api } from '@/base';

interface NotifcationRequest {
  notificationId: string;
}

interface NotificationResponse {
  id: string;
  memberId: string;
  content: string;
  type: 'DOCUMENT' | 'ATTENDANCE' | 'SESSION' | 'NONE';
  isRead: boolean;
}

export const useReadNotifiaction = (
  options?: UseMutationOptions<NotificationResponse, CustomError, NotifcationRequest>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ notificationId }: NotifcationRequest) =>
      api.post<NotificationResponse>(`/v1/notifications/${notificationId}/read`),
    ...options,
    onSuccess: (data, ...rest) => {
      options?.onSuccess?.(data, ...rest);

      return queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
