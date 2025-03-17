import type { UsersDialogType } from '../(context)/users-context';
import { useUsers } from '../(context)/users-context';

import { UsersActionDialog } from './users-action-dialog';
import { UsersDeleteDialog } from './users-delete-dialog';

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers();

  const handleOpenRowDialog = (dialogType: UsersDialogType) => () => {
    setOpen(dialogType);

    setTimeout(() => {
      setCurrentRow(null);
    }, 500);
  };

  return (
    <>
      <UsersActionDialog key="user-add" open={open === 'add'} onOpenChange={() => setOpen('add')} />

      {currentRow && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={handleOpenRowDialog('edit')}
            currentRow={currentRow}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={handleOpenRowDialog('delete')}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  );
}
