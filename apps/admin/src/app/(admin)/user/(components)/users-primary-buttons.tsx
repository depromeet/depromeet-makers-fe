import { IconUserPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

import { useUsers } from '../(context)/users-context';

export function UsersPrimaryButtons() {
  const { setOpen } = useUsers();

  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen('add')}>
        <IconUserPlus size={18} />
        <span>멤버 추가하기</span>
      </Button>
    </div>
  );
}
