import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomError } from '../../../apis';
import { api } from '../../../apis';
import type { Attendance } from '../../../types/attendance';

interface AttendanceParams {
  generation: number;
}

interface AttendanceResponse {
  generation: number;
  offlineAbsenceScore: number;
  totalAbsenceScore: number;
  attendances: Attendance[];
}

export const fetchAttendance = (params: AttendanceParams) =>
  api.get<AttendanceResponse>(`/v1/attendances/me`, { params });

export const useGetAttendance = (
  params: AttendanceParams,
  options?: UseQueryOptions<AttendanceResponse, CustomError>,
) => {
  return useQuery({
    queryKey: ['attendances-me', params.generation],
    queryFn: () => fetchAttendance(params),
    ...options,
  });
};
