import type { IconComponentMap } from '@/components/Icon';

export type NavItemType = {
  text: string;
  icon: keyof typeof IconComponentMap;
  path: string;
}[];

export const USER_NAV_ITEMS: NavItemType = [
  // TODO: path 수정 필요
  { text: '홈', icon: 'home', path: '/' },
  { text: '일정', icon: 'calendar', path: '/calendar' },
  { text: '마이페이지', icon: 'user', path: '/my' },
] as const;

export const ADMIN_NAV_ITEMS: NavItemType = [
  { text: '출석현황', icon: 'team', path: '/admin/attendance' },
  { text: '증빙', icon: 'paper', path: '#' },
];
