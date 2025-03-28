import { Suspense } from 'react';
import { getSessionDetailOptions, PrefetchBoundary } from '@depromeet-makers/api';

import { SessionFormSkeleton } from '../(component)/session-form-skeleton';

import { SessionEditPage } from './(component)/session-edit-page';

const SessionDetailPage = ({ params }: { params: { id: string } }) => {
  const sessionId = params.id;

  return (
    <Suspense fallback={<SessionFormSkeleton />}>
      <PrefetchBoundary prefetchOptions={getSessionDetailOptions(sessionId)}>
        <SessionEditPage sessionId={sessionId} />
      </PrefetchBoundary>
    </Suspense>
  );
};

export default SessionDetailPage;
