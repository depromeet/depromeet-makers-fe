'use client';

import type { AttendanceItemType } from '@depromeet-makers/api';
import { getGroupAttendanceOptions } from '@depromeet-makers/api';
import { useQueries } from '@tanstack/react-query';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CURRENT_GENERATION, WEEK_LIST } from '@/constants/attendance';
import { useCurrentWeek } from '@/hooks/useCurrentWeek';

import { AttendanceTable } from './(component)/attendace-table';

const GROUP_COUNT = 6;
const GENERATION = CURRENT_GENERATION;

export default function AttendancePage() {
  const { week, setWeek, isOffline, code } = useCurrentWeek();

  const queries = useQueries({
    queries: [
      process.env.NODE_ENV === 'development'
        ? {
            ...getGroupAttendanceOptions({ generation: GENERATION, week, groupId: '7' }),
            select: (data: AttendanceItemType[]) => data?.map((item) => ({ ...item, groupId: '7' })),
          }
        : null,
      ...Array.from({ length: GROUP_COUNT }, (_, index) => {
        const groupId = (index + 1).toString();
        return {
          ...getGroupAttendanceOptions({ generation: GENERATION, week, groupId }),
          select: (data: AttendanceItemType[]) => data?.map((item) => ({ ...item, groupId })),
        };
      }),
    ].filter((query): query is NonNullable<typeof query> => query !== null),
  });

  const allAttendances = queries
    .map((query) => query.data)
    .filter((data) => data !== undefined)
    .flat();

  if (!allAttendances) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <WeekSelect value={week} onChange={setWeek} />
      <AttendanceTable attendances={allAttendances} />
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
      <SelectTrigger className="w-[120px]">
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
