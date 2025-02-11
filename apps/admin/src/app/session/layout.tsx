import type { PropsWithChildren } from 'react';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const SessionLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarTrigger />
      {children}
    </SidebarProvider>
  );
};

export default SessionLayout;
