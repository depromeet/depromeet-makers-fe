'use client';

import { useRouter } from 'next/navigation';
import { type Session, useGetSessionList } from '@depromeet-makers/api';
import { type ColumnDef, createColumnHelper, type Row } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/data-table';
import { SESSION_TYPE_TEXT } from '@/constants/session';
import { formatDateTime } from '@/lib/date';

import { SessionDeleteButton } from './session-delete-button';

const columnHelper = createColumnHelper<Session>();

export const columns = [
  columnHelper.accessor('week', {
    header: '주차',
  }),
  columnHelper.accessor('type', {
    header: '세션 종류',
    cell: ({ getValue }) => {
      const sessionType = getValue();
      return (
        <p
          className={`flex justify-center rounded-md px-2 py-1 w-[70px] ${sessionType === 'OFFLINE' ? 'bg-green-100 text-green-300 font-semibold' : ''}`}
        >
          {SESSION_TYPE_TEXT[sessionType] ?? '-'}
        </p>
      );
    },
  }),
  columnHelper.accessor('title', {
    header: '세션 이름',
  }),
  columnHelper.accessor('startTime', {
    header: '시작 시간',
    cell: ({ getValue }) => formatDateTime(getValue()),
  }),
  columnHelper.accessor('place', {
    header: '세션 장소',
    cell: ({ getValue }) => getValue()?.address ?? '-',
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => <SessionDeleteButton session={row.original} />,
  }),
] as ColumnDef<Session, unknown>[];

export const SessionTable = () => {
  const { data } = useGetSessionList();
  const router = useRouter();

  const handleClickRow = (row: Row<Session>) => () => router.push(`/session/${row.original.sessionId}`);

  return <DataTable columns={columns} data={data ?? []} placeholder="세션 정보가 없어요" onRowClick={handleClickRow} />;
};
