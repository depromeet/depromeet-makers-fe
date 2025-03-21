'use client';

import { useGetSessionDetail } from '@depromeet-makers/api';

import { SessionFormSkeleton } from '../(component)/session-form-skeleton';

import { SessionEditForm } from './(component)/session-edit-form';

const SessionDetailPage = ({ params }: { params: { id: string } }) => {
  const sessionId = params.id;

  const { data: session } = useGetSessionDetail(sessionId);

  // TODO: suspense 적용
  if (!session) return <SessionFormSkeleton />;

  return <SessionEditForm session={session} />;
};

export default SessionDetailPage;
