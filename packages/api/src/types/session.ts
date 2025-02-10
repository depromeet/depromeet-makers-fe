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
  sessionType: string;
  place?: SessionPlace;
  generation: number;
  description?: string;
};
