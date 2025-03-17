'use client';

import { useState } from 'react';
import { IconAlertTriangle } from '@tabler/icons-react';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

import type { User } from '../(data)/schema';

interface UsersDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: User;
}

export const UsersDeleteDialog = ({ open, onOpenChange, currentRow }: UsersDeleteDialogProps) => {
  const [value, setValue] = useState('');

  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return;

    onOpenChange(false);

    toast({
      title: '해닫 유저가 삭제됩니다:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(currentRow, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      title={
        <span className="text-destructive">
          <IconAlertTriangle className="mr-1 inline-block stroke-destructive" size={18} />
          사용자 삭제
        </span>
      }
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            <span className="font-bold">{currentRow.username}</span>을 삭제할까요?
          </p>

          <Label className="my-2">
            사용자 이름:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="삭제할 사용자 이름을 입력해주세요."
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>사용자를 제거하면 다시 되돌릴 수 없어요.</AlertDescription>
          </Alert>
        </div>
      }
      confirmText="삭제하기"
      destructive
    />
  );
};
