'use client';

import { cn } from '@/lib/utils';

import { SidebarTrigger, useSidebar } from '../ui/sidebar';

export const Header = () => {
  const { open } = useSidebar();

  return (
    <header
      className={cn(
        'flex fixed bg-sidebar p-2 top-0 left-0 w-full border-b border-sidebar-border',
        open ? 'left-[255px] w-[calc(100%-255px)]' : 'px-4',
      )}
    >
      <SidebarTrigger />
    </header>
  );
};
