import { IconShield, IconUsersGroup, IconUserShield } from '@tabler/icons-react';

import type { UserStatus } from './schema';

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-green-100 text-green-300 dark:text-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['suspended', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
]);

export const CALL_TYPE_TEXT = new Map<UserStatus, string>([
  ['active', '활성'],
  ['inactive', '비활성'],
  ['suspended', '승인 대기중'],
]);

export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Member',
    value: 'member',
    icon: IconUsersGroup,
  },
] as const;
