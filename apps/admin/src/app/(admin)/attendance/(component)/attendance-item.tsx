'use client';

import type { AttendanceItemType } from '@depromeet-makers/api';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ATTENDANCE_STATUS_KR, ATTENDANCE_STATUS_LIST, ATTENDANCE_STATUS_TEXT_COLOR } from '@/constants/attendance';

interface MemberAttendance
  extends Pick<AttendanceItemType, 'memberId' | 'memberName' | 'memberPosition' | 'attendanceStatus'> {}

interface TeamAttendanceProps {
  team: number;
  attendances: MemberAttendance[];
}

export const TeamAttendance = ({ team, attendances }: TeamAttendanceProps) => {
  return (
    <Card className="w-[346px]">
      <CardHeader className="bg-gray-200 text-gray-500 py-[12px] px-[20px]">
        <CardTitle className="text-[14px]">{`${team}팀`}</CardTitle>
      </CardHeader>

      <ScrollArea>
        <CardContent className="p-0 h-[276px]">
          {attendances.map((memberAttendance) => (
            <MemberAttendance key={memberAttendance.memberId} member={memberAttendance} />
          ))}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

interface MemberAttendanceProps {
  member: MemberAttendance;
}

const MemberAttendance = ({ member }: MemberAttendanceProps) => {
  const handleChangeAttendance = () => {
    // TODO: api 연동
  };

  return (
    <li className="flex items-center justify-between py-[12px] px-[20px]">
      <div className="flex items-center gap-2">
        <span className="font-semibold">{member.memberName}</span>
        <span className="text-xs text-gray-400">{member.memberPosition}</span>
      </div>

      <Select value={member.attendanceStatus} onValueChange={handleChangeAttendance}>
        <SelectTrigger
          className={`w-[120px] border-0 text-sm font-semibold ${ATTENDANCE_STATUS_TEXT_COLOR[member.attendanceStatus]}`}
        >
          <SelectValue placeholder={ATTENDANCE_STATUS_KR[member.attendanceStatus]} />
        </SelectTrigger>
        <SelectContent>
          {ATTENDANCE_STATUS_LIST.map((status) => (
            <SelectItem key={status} value={status.toString()}>
              {ATTENDANCE_STATUS_KR[status]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </li>
  );
};
