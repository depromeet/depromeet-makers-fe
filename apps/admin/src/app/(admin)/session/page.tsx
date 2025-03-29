import { Suspense } from 'react';
import Link from 'next/link';
import { getSuspenseSessionListOption, PrefetchBoundary } from '@depromeet-makers/api';
import { IconPlus } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';

import { SessionTable } from './(component)/session-table';
import { SessionTableSkeleton } from './(component)/session-table-skeleton';

const SessionPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex items-center p-4 gap-6">
        <H3>세션 목록</H3>
        <Link href="/session/new">
          <Button size="sm" variant="secondary">
            <IconPlus />
            세션 추가하기
          </Button>
        </Link>
      </div>

      <Suspense fallback={<SessionTableSkeleton />}>
        <PrefetchBoundary prefetchOptions={getSuspenseSessionListOption()}>
          <SessionTable />
        </PrefetchBoundary>
      </Suspense>
    </div>
  );
};

export default SessionPage;
