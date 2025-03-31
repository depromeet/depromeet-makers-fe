'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetInfo } from '@depromeet-makers/api';
import { Command } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { NavUser } from './nav/NavUser';

const MAKERS_MENUS = [
  {
    title: '멤버 관리',
    url: '/user',
  },
];

const DEPROMEET_MENUS = [
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
  const { data: user } = useGetInfo();

  const handleLogout = () => {
    // TODO: 로그아웃 처리
  };

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>

                <span className="text-base font-semibold">메이커스 어드민</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메이커스 관리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MAKERS_MENUS.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild size="lg" isActive={pathname === menu.url}>
                    <Link href={menu.url}>
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>디프만 관리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {DEPROMEET_MENUS.map((menu) => (
                <SidebarMenuItem key={menu.title}>
                  <SidebarMenuButton asChild size="lg" isActive={pathname === menu.url}>
                    <Link href={menu.url}>
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user ?? { name: '', email: '' }} />
      </SidebarFooter>
    </Sidebar>
  );
};
