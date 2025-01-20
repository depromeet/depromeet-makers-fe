import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';

interface AttendanceStatsParams {
  generation: number;
  week: number;
}

interface AttendanceStats {
  teamNumber: number;
  attendanceCount: number;
  memberCount: number;
}

interface AttendanceStatsResponse {
  generation: number;
  week: number;
  sessionDate: string;
  attendancePercentage: number;
  attendanceCount: number;
  memberCount: number;
  teams: AttendanceStats[];
}

export const useGetAttendanceStats = (
  params: AttendanceStatsParams,
  options?: UseQueryOptions<AttendanceStatsResponse, CustomError>,
) => {
  return useQuery({
    queryKey: ['attendances-stats', params.generation, params.week],
    queryFn: () => api.get<AttendanceStatsResponse>(`/v1/attendances/stats`, { params }),
    ...options,
  });
};
