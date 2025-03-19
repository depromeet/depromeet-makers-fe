'use client';

import { H4 } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

import { columns } from './(components)/users-columns';
import { UsersDialogs } from './(components)/users-dialogs';
import { UsersInfo } from './(components)/users-info';
import { UsersPrimaryButtons } from './(components)/users-primary-buttons';
import { UsersTable } from './(components)/users-table';
import UsersProvider from './(context)/users-context';

const MEMBER_MOCK_DATA = [
  {
    id: '1',
    username: 'user 1',
    email: '',
    status: 'active',
    role: 'superadmin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    username: 'user 2',
    email: '',
    status: 'inactive',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    username: 'user 4',
    email: '',
    status: 'suspended',
    role: 'member',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const MemberPage = () => {
  return (
    <UsersProvider>
      <main className={cn('peer-[.header-fixed]/header:mt-16', 'px-4 py-6')}>
        <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
          <H4>멤버 목록</H4>
          <UsersPrimaryButtons />
        </div>

        <UsersInfo />

        <div className="-mx-4 my-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <UsersTable data={MEMBER_MOCK_DATA} columns={columns} />
        </div>
      </main>

      <UsersDialogs />
    </UsersProvider>
  );
};

export default MemberPage;
