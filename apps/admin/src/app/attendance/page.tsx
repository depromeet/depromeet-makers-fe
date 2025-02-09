'use client';

import { fetchAttendance, fetchGroupAttendance } from '@/hooks/apis/attendance';
import Table from './Table';
import { useQuery } from '@tanstack/react-query';

export default function AttendancePage() {
  const { data } = useQuery({
    queryKey: ['attendances', 16],
    queryFn: () => fetchGroupAttendance({ generation: 16, week: 1, groupId: '1' }),
  });

  console.log('data: ', data);

  return <Table />;
}
