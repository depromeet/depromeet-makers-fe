import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import type { ATTENDANCE_STATUS } from '@/constants/attendance';

interface GetGroupAttendanceRequest {
  generation: number;
  week: number;
  groupId: string;
}

// TODO: schema 분리
export interface AttendanceItemType {
  attendanceId: string;
  generation: number;
  week: number;
  memberId: string;
  memberName: string;
  memberPosition: string;
  sessionType: string;
  attendanceStatus: ATTENDANCE_STATUS;
  attendanceTime: string;
}

type GetGroupAttendanceResponse = AttendanceItemType[];

export const fetchGroupAttendace = (params: GetGroupAttendanceRequest) =>
  api.get<GetGroupAttendanceResponse>(`/v1/attendances/groups/${params.groupId}`, { params });

export const useGetGroupAttendance = (
  params: GetGroupAttendanceRequest,
  options?: UseQueryOptions<GetGroupAttendanceResponse, CustomError>,
) => {
  return useQuery({
    queryKey: ['attendances-group', params],
    queryFn: () => fetchGroupAttendace(params),
    ...options,
  });
};
