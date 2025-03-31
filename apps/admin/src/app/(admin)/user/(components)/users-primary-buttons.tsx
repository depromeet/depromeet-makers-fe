import { IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

import { useUsers } from '../(context)/users-context';

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();

  return (
    <Button size="sm" variant="secondary" onClick={() => setOpen('add')}>
      <IconPlus />
      <span>멤버 추가하기</span>
    </Button>
  );
}
