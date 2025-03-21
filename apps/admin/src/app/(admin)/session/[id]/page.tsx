'use client';

import { useMemo } from 'react';
import { useGetSessionList } from '@depromeet-makers/api';

import { SessionFormSkeleton } from '../(component)/session-form-skeleton';

import { SessionEditForm } from './(component)/session-edit-form';

const SessionDetailPage = ({ params }: { params: { id: string } }) => {
  const sessionId = params.id;

  const { data: sessionList } = useGetSessionList();

  // TODO: 세션 상세 정보 api 개발 후 변경 예정
  const session = useMemo(() => {
    return sessionList?.sessions.find((session) => session.sessionId === sessionId) ?? null;
  }, [sessionList, sessionId]);

  // TODO: suspense 적용
  if (!session) return <SessionFormSkeleton />;

  return <SessionEditForm session={session} />;
};

export default SessionDetailPage;
