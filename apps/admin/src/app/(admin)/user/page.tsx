'use client';

import { H4, H5 } from '@/components/ui/typography';

import { columns } from './(components)/users-columns';
import { UsersDialogs } from './(components)/users-dialogs';
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
      <main className="peer-[.header-fixed]/header:mt-16 px-4 py-6 container mx-auto">
        <ul className="flex flex-col gap-8">
          <li>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <H4>승인 대기중</H4>
              <H5 className="font-light text-gray-400">00건</H5>
            </div>

            <div className="-mx-4 my-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
              {/* TODO: 승인 대기중 테이블로 변경 */}
              <UsersTable data={MEMBER_MOCK_DATA} columns={columns} />
            </div>
          </li>

          <li>
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <H4>멤버 목록</H4>
              <H5 className="font-light text-gray-400">00건</H5>
              <UsersPrimaryButtons />
            </div>

            <div className="-mx-4 my-2 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
              <UsersTable data={MEMBER_MOCK_DATA} columns={columns} />
            </div>
          </li>
        </ul>
      </main>

      <UsersDialogs />
    </UsersProvider>
  );
};

export default MemberPage;
