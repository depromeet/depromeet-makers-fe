import { useState } from 'react';
import { type AttendanceItemType, useModifyAttendance } from '@depromeet-makers/api';
import { Checkbox } from '@radix-ui/react-checkbox';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ATTENDANCE_STATUS } from '@/constants/attendance';
import { ATTENDANCE_STATUS_COLOR, ATTENDANCE_STATUS_KR, ATTENDANCE_STATUS_LIST } from '@/constants/attendance';
import { cn } from '@/lib/utils';

interface AttendanceStatusSelectProps {
  attendanceId: string;
  attendanceStatus: ATTENDANCE_STATUS;
}

const AttendanceStatusSelect = ({ attendanceId, attendanceStatus }: AttendanceStatusSelectProps) => {
  const [status, setStatus] = useState<ATTENDANCE_STATUS>(attendanceStatus);

  const { mutate } = useModifyAttendance({
    onSuccess: (data) => {
      toast.success(`출석 상태가 "${ATTENDANCE_STATUS_KR[data.attendanceStatus]}"으로 변경되었습니다.`);
      setStatus(data.attendanceStatus);
    },
    onError: () => {
      toast.error('출석 상태 변경에 실패했습니다.');
    },
  });

  const handleStatusChange = (attendanceStatus: ATTENDANCE_STATUS) => {
    mutate({ attendanceId, attendanceStatus });
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger>
        <SelectValue placeholder="출석 상태">
          <Badge className={cn('px-2', ATTENDANCE_STATUS_COLOR[status])}>{ATTENDANCE_STATUS_KR[status]}</Badge>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ATTENDANCE_STATUS_LIST.map((statusOption) => (
          <SelectItem key={statusOption} value={statusOption}>
            {ATTENDANCE_STATUS_KR[statusOption]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const createSortableColumn = (header: string, accessorKey: string): ColumnDef<AttendanceItemType> => ({
  accessorKey,
  header: ({ column }) => (
    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')} className="px-0">
      {header}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  ),
});

export const columns: ColumnDef<AttendanceItemType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="모두 선택"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="행 선택"
      />
    ),
  },
  createSortableColumn('소속 팀', 'groupId'),
  createSortableColumn('이름', 'memberName'),
  createSortableColumn('포지션', 'memberPosition'),
  {
    accessorKey: 'attendanceStatus',
    header: '출석 상태',
    cell: ({ row }) => (
      <AttendanceStatusSelect
        attendanceId={row.original.attendanceId}
        attendanceStatus={row.original.attendanceStatus}
        key={`${row.original.attendanceId}-${row.original.attendanceStatus}`}
      />
    ),
  },
  {
    accessorKey: 'attendanceTime',
    header: '출석 시간',
  },
];
