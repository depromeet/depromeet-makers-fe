import { FormProvider, useForm } from 'react-hook-form';
import { type Session, useEditSession } from '@depromeet-makers/api';
import { zodResolver } from '@hookform/resolvers/zod';

import { SessionForm } from '../../(component)/session-form';
import { SessionPreview } from '../../(component)/session-preview';
import type { SessionForm as SessionFormType } from '../../(data)/session';
import { sessionScheme } from '../../(data)/session';

interface SessionEditFormProps {
  session: Session;
}

export const SessionEditForm = ({ session }: SessionEditFormProps) => {
  const form = useForm<SessionFormType>({
    resolver: zodResolver(sessionScheme),
    defaultValues: { ...session, startTime: new Date(session.startTime), endTime: new Date(session.endTime) },
  });

  const { mutate: editSession } = useEditSession(session.sessionId);

  return (
    <FormProvider {...form}>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-gray-100 max-h-full lg:h-[750px] rounded-lg">
        <SessionPreview />
        <SessionForm onSubmit={editSession} />
      </div>
    </FormProvider>
  );
};
