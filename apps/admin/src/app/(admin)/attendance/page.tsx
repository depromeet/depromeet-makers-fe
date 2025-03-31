'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ATTENDANCE_STATUS, WEEK_LIST } from '@/constants/attendance';
import { useCurrentWeek } from '@/hooks/useCurrentWeek';

import { TeamAttendance } from './(component)/attendance-item';

// TODO: 출석 api 연동
const MOCK_ATTENDANCES = [
  {
    memberId: '1',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석,
  },
  {
    memberId: '2',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.결석,
  },
  {
    memberId: '3',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.지각,
  },
  {
    memberId: '4',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석대기,
  },
  {
    memberId: '5',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석대기,
  },
  {
    memberId: '6',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석대기,
  },
  {
    memberId: '7',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석대기,
  },
  {
    memberId: '8',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석대기,
  },
  {
    memberId: '9',
    memberName: '강성민',
    memberPosition: '개발자',
    attendanceStatus: ATTENDANCE_STATUS.출석대기,
  },
];

export default function AttendancePage() {
  const { week, setWeek, isOffline, code } = useCurrentWeek();

  return (
    <div className="flex flex-col gap-4 w-full">
      <WeekSelect value={week} onChange={setWeek} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {/* TODO: api 연동 후 수정 예정 */}
        {Array.from({ length: 6 }).map((_, index) => (
          <TeamAttendance key={index} team={index + 1} attendances={MOCK_ATTENDANCES} />
        ))}
      </div>
    </div>
  );
}

interface Props {
  value: number;
  onChange: (value: number) => void;
}

function WeekSelect(props: Props) {
  return (
    <Select value={props.value.toString()} onValueChange={(value) => props.onChange(Number(value))}>
      <SelectTrigger className="w-[120px] border-0 text-xl font-semibold">
        <SelectValue placeholder={`${props.value}주차`} />
      </SelectTrigger>
      <SelectContent>
        {WEEK_LIST.map((week) => (
          <SelectItem key={week} value={week.toString()}>
            {week}주차
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
