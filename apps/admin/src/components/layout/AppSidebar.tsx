'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGetInfo } from '@depromeet-makers/api';
import { IconInnerShadowTop } from '@tabler/icons-react';

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

const MENUS = [
  {
    title: '멤버 관리',
    url: '/user',
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
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">메이커스 Admin</span>
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
        <NavUser user={user ?? { name: '', email: ''}} />
      </SidebarFooter>
    </Sidebar>
  );
};
