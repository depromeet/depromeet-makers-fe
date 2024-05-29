import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import type { AttendanceStatus } from '@/types/attendance';

interface CheckInResponse {
  generation: number;
  week: number;
  isBeforeSession15minutes: boolean;
  needFloatingButton: boolean;
  expectAttendanceStatus: AttendanceStatus;
}

const POLLING_INTERVAL = 6000;

export const useGetCheckIn = (options?: UseQueryOptions<CheckInResponse, CustomError>) => {
  return useQuery({
    queryKey: ['check-in'],
    queryFn: () => api.get<CheckInResponse>(`/v1/check-in`),
    ...options,
    refetchInterval: (data) => (data.state.error?.code ? 0 : POLLING_INTERVAL),
    refetchIntervalInBackground: true,
  });
};
