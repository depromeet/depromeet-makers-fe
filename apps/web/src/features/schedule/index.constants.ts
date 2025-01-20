import type { SessionPlace } from '@/types/session';

export interface ScheduleType {
  date: string;
  isOffline?: boolean;
  title: string;
  startTime: string;
  desc?: string;
  place?: SessionPlace;
}
