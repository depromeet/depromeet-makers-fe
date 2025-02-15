import { useState } from 'react';
import { useGetSession } from '@depromeet-makers/api';

import { isSameDate } from '@/utils/date';

export const useCurrentWeek = () => {
  const [week, setWeek] = useState<number | null>(null);

  const { data: session } = useGetSession();

  const isSessionStarted = isSameDate(new Date(), new Date(session?.startTime ?? ''));

  return {
    week: week ?? (session?.week || 1),
    setWeek,
    isSessionStarted,
    isOffline: session?.sessionType === 'OFFLINE',
    code: session?.code,
  };
};
