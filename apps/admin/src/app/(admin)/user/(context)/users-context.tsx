import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import { createContext, useContext, useState } from 'react';

import useDialogState from '@/hooks/use-dialog-state';

import type { User } from '../(data)/schema';

type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete';

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: User | null;
  setCurrentRow: Dispatch<SetStateAction<User | null>>;
}

const UsersContext = createContext<UsersContextType | null>(null);

export default function UsersProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<User | null>(null);

  return <UsersContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>{children}</UsersContext.Provider>;
}

export const useUsers = () => {
  const usersContext = useContext(UsersContext);

  if (!usersContext) {
    throw new Error('useUsers has to be used within <UsersContext>');
  }

  return usersContext;
};
