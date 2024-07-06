import { useState } from 'react';

import { useGetSession } from './apis/sessions/useGetSession';

export const useCurrentWeek = () => {
  const [week, setWeek] = useState<number | null>(null);

  const { data: session } = useGetSession();

  return {
    week: week ?? (session?.week || 1),
    setWeek,
  };
};
