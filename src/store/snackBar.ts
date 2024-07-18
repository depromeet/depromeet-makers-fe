import type { ReactNode } from 'react';
import { atom } from 'jotai';

export interface SnackBarProps {
  id: string;
  message: ReactNode;
  duration?: number;
  showClose?: boolean;
  onClose?: (id: string) => void;
}

export const snackBarsAtom = atom<SnackBarProps[]>([]);
