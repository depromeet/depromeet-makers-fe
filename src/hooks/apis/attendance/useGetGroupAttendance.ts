import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import type { CustomError } from '@/apis';
import { api } from '@/apis';
import { ATTENDANCE_STATUS } from '@/constants/attendance';

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

export const useGetGroupAttendance = (
  params: GetGroupAttendanceRequest,
  options?: UseQueryOptions<GetGroupAttendanceResponse, CustomError>,
) => {
  console.log('params: ', params);
  return useQuery({
    queryKey: ['attendances-group', params],
    queryFn: () => api.get<GetGroupAttendanceResponse>(`/v1/attendances/groupId/${params.groupId}`, { params }),
    ...options,
    initialData: dummy,
  });
};

const dummy: AttendanceItemType[] = [
  {
    attendanceId: '01HWPNRE5TS9S7VC99WPETE5KE',
    generation: 15,
    week: 1,
    memberId: '01HWPNRE5TS9S7VC99WPETE5KE',
    memberName: '김개발',
    memberPosition: 'DESIGN',
    sessionType: 'ONLINE',
    attendanceStatus: ATTENDANCE_STATUS.출석,
    attendanceTime: '2024-05-24T14:09:10.243Z',
  },
];
