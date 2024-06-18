export type Role = 'ORGANIZER' | 'MEMBER';

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  generations: {
    generationId: number;
    role: Role;
    position: string;
  }[];
}
