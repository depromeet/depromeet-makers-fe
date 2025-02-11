'use client';

import * as React from 'react';
import { type AttendanceItemType, useModifyAttendance } from '@depromeet-makers/api';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type ATTENDANCE_STATUS, ATTENDANCE_STATUS_KR, ATTENDANCE_STATUS_LIST } from '@/constants/attendance';

const AttendanceStatusSelect = ({
  attendanceId,
  attendanceStatus,
}: {
  attendanceId: string;
  attendanceStatus: ATTENDANCE_STATUS;
}) => {
  const [status, setStatus] = React.useState<ATTENDANCE_STATUS>(attendanceStatus);

  const { mutate } = useModifyAttendance({
    onSuccess: (data) => {
      toast.success(`출석 상태가 "${ATTENDANCE_STATUS_KR[data.attendanceStatus]}"으로 변경되었습니다.`);
      setStatus(data.attendanceStatus);
    },
    onError: () => {
      toast.error('출석 상태 변경에 실패했습니다.');
    },
  });

  const onChange = (value: ATTENDANCE_STATUS) => {
    mutate({ attendanceId, attendanceStatus: value });
  };

  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="출석 상태" />
      </SelectTrigger>
      <SelectContent>
        {ATTENDANCE_STATUS_LIST.map((status) => (
          <SelectItem key={status} value={status}>
            {ATTENDANCE_STATUS_KR[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

const columns: ColumnDef<AttendanceItemType>[] = [
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
  {
    accessorKey: 'memberName',
    header: '이름',
  },
  {
    accessorKey: 'memberPosition',
    header: '포지션',
  },
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

export default function AttendanceTable({ data }: { data: AttendanceItemType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="이름으로 검색..."
          value={(table.getColumn('memberName')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('memberName')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border bg-white ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
