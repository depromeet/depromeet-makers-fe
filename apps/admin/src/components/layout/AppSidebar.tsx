'use client';

import { usePathname } from 'next/navigation';

import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const MENUS = [
  {
    title: '멤버 관리',
    url: '/member',
  },
  {
    title: '세션 관리',
    url: '/session',
  },
  {
    title: '출석 관리',
    url: '/attendance',
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    // TODO: 로그아웃 처리
  };

  return (
    <BaseSidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메이커스 어드민</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENUS.map((menu) => {
                const isActive = pathname === menu.url;

                return (
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton asChild size="lg" isActive={isActive}>
                      <a href={menu.url}>
                        <span>{menu.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <span>로그아웃</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </BaseSidebar>
  );
};
