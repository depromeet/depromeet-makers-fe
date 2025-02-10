import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { CustomError } from '@/base';
import { api } from '@/base';

interface NotificationResponse {
  id: string;
  memberId: string;
  content: string;
  type: 'DOCUMENT' | 'ATTENDANCE' | 'SESSION' | 'NONE';
  isRead: boolean;
}

export const getNotification = () => api.get<NotificationResponse>(`/v1/notifications`);

export const useGetNotification = (options?: UseQueryOptions<NotificationResponse, CustomError>) => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: getNotification,
    placeholderData: {
      id: '',
      memberId: '',
      content: '',
      type: 'NONE',
      isRead: true,
    },
    ...options,
  });
};
