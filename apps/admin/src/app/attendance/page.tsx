'use client';

import { getGroupAttendanceOptions } from '@depromeet-makers/api';
import { useQueries } from '@tanstack/react-query';

import { CURRENT_GENERATION } from '@/constants/attendance';
import { useCurrentWeek } from '@/hooks/useCurrentWeek';

import Table from './Table';

const GROUP_COUNT = 6;
const GENERATION = CURRENT_GENERATION;

export default function AttendancePage() {
  const { week, setWeek, isOffline, code } = useCurrentWeek();

  const queries = useQueries({
    queries: [
      ...Array.from({ length: GROUP_COUNT }, (_, index) =>
        getGroupAttendanceOptions({ generation: GENERATION, week: 1, groupId: (index + 1).toString() }),
      ),
    ],
  });

  const allAttendances = queries
    .map((query) => query.data)
    .filter((data) => data !== undefined)
    .flat();

  console.log('allAttendances: ', allAttendances);

  if (!allAttendances) return null;

  return <Table data={allAttendances} />;
}
