export type SessionPlace = {
  address: string;
  latitude: number;
  longitude: number;
};

export type Session = {
  sessionId: string;
  week: number;
  title: string;
  startTime: string;
  endTime: string;
  type: 'ONLINE' | 'OFFLINE';
  place: SessionPlace | null;
  generation: number;
  description?: string;
};
