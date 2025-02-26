import type { ATTENDANCE_STATUS } from '@depromeet-makers/constant';
import { queryOptions } from '@tanstack/react-query';

import { api } from '../base';

interface GetGroupAttendanceRequest {
  generation: number;
  week: number;
  groupId: string;
}

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

export const fetchGroupAttendance = (params: GetGroupAttendanceRequest) =>
  api.get<GetGroupAttendanceResponse>(`/v1/attendances/groups/${params.groupId}`, { params });

export const getGroupAttendanceOptions = (params: GetGroupAttendanceRequest) =>
  queryOptions({
    queryKey: ['attendances-group', params],
    queryFn: () => fetchGroupAttendance(params),
  });
