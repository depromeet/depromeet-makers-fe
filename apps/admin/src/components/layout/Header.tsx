'use client';

import Link from 'next/link';

import { Button } from '../ui/button';
import { SidebarTrigger } from '../ui/sidebar';

export const Header = () => {
  return (
    <header className="flex h-[50px] shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[50px]">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Link
              href="https://makers.depromeet.com/"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              메이커스
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
