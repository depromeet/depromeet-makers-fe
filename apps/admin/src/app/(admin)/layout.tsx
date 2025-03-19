import type { PropsWithChildren } from 'react';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { Header } from '@/components/layout/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Header />
        <div className="w-full p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
