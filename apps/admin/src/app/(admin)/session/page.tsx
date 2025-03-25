import { Suspense } from 'react';
import Link from 'next/link';
import { getSuspenseSessionListOption } from '@depromeet-makers/api';

import { SessionTable } from '@/components/session/SessionTable';
import { Button } from '@/components/ui/button';
import { H4 } from '@/components/ui/typography';
import { PrefetchBoundary } from '@/context/PrefetchBoundary';

import { SessionTableSkeleton } from './(component)/session-table-skeleton';

const SessionPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between p-3">
        <H4>세션 관리</H4>
        <Link href="/session/new">
          <Button>새로운 세션 추가</Button>
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
