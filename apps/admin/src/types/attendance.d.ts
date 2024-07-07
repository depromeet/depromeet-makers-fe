type AttendanceStatus = 'ATTENDANCE_ON_HOLD' | 'ATTENDANCE' | 'ABSENCE' | 'TARDY';

type SessionType = 'ONLINE' | 'OFFLINE';

type SessionAttendanceStatus = 'BEFORE_15MINUTE' | 'ON_TIME' | 'AFTER_15MINUTE';

export interface Attendance {
  attendanceId: string;
  generation: number;
  week: number;
  memberId: string;
  attendanceStatus: AttendanceStatus;
  sessionType: SessionType;
  attendanceTime: string;
}
