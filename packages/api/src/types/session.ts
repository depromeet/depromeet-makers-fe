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
  sessionType: 'ONLINE' | 'OFFLINE';
  place?: SessionPlace;
  generation: number;
  description?: string;
};
