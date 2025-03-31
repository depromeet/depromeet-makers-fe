import { Suspense } from 'react';
import { getSessionDetailOptions, PrefetchBoundary } from '@depromeet-makers/api';

import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';

import { SessionFormSkeleton } from '../(component)/session-form-skeleton';

import { SessionEditPage } from './(component)/session-edit-page';

const SessionDetailPage = ({ params }: { params: { id: string } }) => {
  const sessionId = params.id;

  return (
    <main className="container mx-auto">
      <div className="flex justify-between p-4 gap-6">
        <H3>세션 수정하기</H3>
        <Button type="submit" form="session-form">
          수정하기
        </Button>
      </div>

      <Suspense fallback={<SessionFormSkeleton />}>
        <PrefetchBoundary prefetchOptions={getSessionDetailOptions(sessionId)}>
          <SessionEditPage sessionId={sessionId} />
        </PrefetchBoundary>
      </Suspense>
    </main>
  );
};

export default SessionDetailPage;
