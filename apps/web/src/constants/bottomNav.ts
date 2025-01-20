import type { IconComponentMap } from '../components/Icon';

export type NavItemType = {
  text: string;
  icon: keyof typeof IconComponentMap;
  path: string;
}[];

export const USER_NAV_ITEMS: NavItemType = [
  { text: '홈', icon: 'home', path: '/' },
  { text: '일정', icon: 'calendar', path: '/schedule' },
  // NOTE: 심사를 위해 임시 주석 처리
  // { text: '마이페이지', icon: 'user', path: '/my' },
] as const;

export const ADMIN_NAV_ITEMS: NavItemType = [
  { text: '출석현황', icon: 'team', path: '/admin/attendance' },
  { text: '설정', icon: 'setting', path: '/admin/setting' },
];
