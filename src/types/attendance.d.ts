type AttendanceStatus = 'ATTENDANCE_ON_HOLD' | 'ATTENDANCE' | 'ABSENCE' | 'TARDY';

type SessionType = 'ONLINE' | 'OFFLINE';

export interface Attendance {
  attendanceId: string;
  generation: number;
  week: number;
  memberId: string;
  attendanceStatus: AttendanceStatus;
  sessionType: SessionType;
  attendanceTime: string;
}
