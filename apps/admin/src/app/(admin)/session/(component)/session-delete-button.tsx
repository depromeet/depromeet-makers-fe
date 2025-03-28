import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { Session } from '@depromeet-makers/api';
import { useDeleteSession } from '@depromeet-makers/api';
import { IconTrash } from '@tabler/icons-react';

import { ConfirmDialog } from '@/components/confirm-dialog';
import { toast } from '@/hooks/use-toast';

interface SessionDeleteButtonProps {
  session: Session;
}

export const SessionDeleteButton = ({ session }: SessionDeleteButtonProps) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { mutate: deleteSession } = useDeleteSession();

  const handleDelete = () => {
    deleteSession(
      { sessionId: session.sessionId },
      {
        onSuccess: () => {
          toast({
            title: `${session.title} 세션이 삭제되었어요.`,
          });
        },
      },
    );
  };

  return (
    <td onClick={(event) => event.stopPropagation()}>
      <button
        onClick={() => setDialogOpen(true)}
        className="p-2 rounded-md text-red-500 hover:bg-red-200"
        aria-label={`${session.title} 세션 삭제`}
      >
        <IconTrash size={16} />
      </button>

      <SessionDeleteDialog
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        handleConfirm={handleDelete}
        sessionTitle={session.title}
      />
    </td>
  );
};

interface SessionDeleteDialogProps
  extends Pick<ComponentProps<typeof ConfirmDialog>, 'open' | 'onOpenChange' | 'handleConfirm'> {
  sessionTitle: Session['title'];
}

const SessionDeleteDialog = ({ open, onOpenChange, handleConfirm, sessionTitle }: SessionDeleteDialogProps) => {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleConfirm}
      title={<span className="text-destructive">세션 삭제</span>}
      desc={
        <div className="space-y-4">
          <p className="mb-2">
            <span className="font-bold">{sessionTitle}</span>을 삭제할까요?
          </p>
        </div>
      }
      confirmText="삭제하기"
      destructive
    />
  );
};
