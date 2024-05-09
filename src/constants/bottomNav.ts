import type { IconComponentMap } from '@/components/Icon';

export type NavItemType = {
  text: string;
  icon: keyof typeof IconComponentMap;
  path: string;
}[];

export const USER_NAV_ITEMS: NavItemType = [
  // TODO: path 수정 필요
  { text: '홈', icon: 'home', path: '/home' },
  { text: '일정', icon: 'calendar', path: '' },
  { text: '마이페이지', icon: 'user', path: '' },
] as const;
