import type { PropsWithChildren } from 'react';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { SidebarProvider } from '@/components/ui/sidebar';

const SessionLayout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <Header />
      <div className="pt-[60px] w-full p-4">{children}</div>
    </SidebarProvider>
  );
};

export default SessionLayout;
