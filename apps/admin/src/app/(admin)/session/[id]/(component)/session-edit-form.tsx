import { FormProvider, useForm } from 'react-hook-form';
import type { Session } from '@depromeet-makers/api';
import { zodResolver } from '@hookform/resolvers/zod';

import { SessionForm } from '../../(component)/session-form';
import type { SessionForm as SessionFormType } from '../../(data)/session';
import { sessionScheme } from '../../(data)/session';

interface SessionEditFormProps {
  session: Session;
}

export const SessionEditForm = ({ session }: SessionEditFormProps) => {
  const form = useForm<SessionFormType>({
    resolver: zodResolver(sessionScheme),
    defaultValues: { ...session, startTime: new Date(session.startTime) },
  });

  return (
    <FormProvider {...form}>
      <SessionForm />
    </FormProvider>
  );
};
