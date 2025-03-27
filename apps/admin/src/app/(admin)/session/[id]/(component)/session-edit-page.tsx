'use client';

import { useGetSessionDetail } from '@depromeet-makers/api';

import { SessionEditForm } from './session-edit-form';

interface SessionEditPageProps {
  sessionId: string;
}

export const SessionEditPage = ({ sessionId }: SessionEditPageProps) => {
  const { data: session } = useGetSessionDetail(sessionId);

  return <SessionEditForm session={session} />;
};
