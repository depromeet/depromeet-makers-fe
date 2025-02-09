import type { Attendance } from '@/types/attendance';

interface AttendanceParams {
  generation: number;
}

interface AttendanceResponse {
  generation: number;
  offlineAbsenceScore: number;
  totalAbsenceScore: number;
  attendances: Attendance[];
}

export const fetchAttendance = async (params: AttendanceParams): Promise<AttendanceResponse> => {
  const searchParams = new URLSearchParams({ generation: params.generation.toString() });
  const response = await fetch(`/api/attendances/me?${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('출석 정보를 가져오는데 실패했습니다.');
  }

  return response.json();
};

interface GetGroupAttendanceRequest {
  generation: number;
  week: number;
  groupId: string;
}

export const fetchGroupAttendance = async (params: GetGroupAttendanceRequest) => {
  const searchParams = new URLSearchParams({
    generation: params.generation.toString(),
    week: params.week.toString(),
    groupId: params.groupId,
  });
  const response = await fetch(`/api/attendances/groups?${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('출석 정보를 가져오는데 실패했습니다.');
  }

  return response.json();
};
