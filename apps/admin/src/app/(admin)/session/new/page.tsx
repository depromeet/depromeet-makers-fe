'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useCreateSession } from '@depromeet-makers/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { addHours, setHours } from 'date-fns';

import { SessionForm } from '../(component)/session-form';
import { SessionPreview } from '../(component)/session-preview';
import { type SessionForm as SessionFormType, sessionScheme } from '../(data)/session';

const SessionNewPage = () => {
  const form = useForm<SessionFormType>({
    resolver: zodResolver(sessionScheme),
    defaultValues: {
      title: '',
      description: '',
      type: 'OFFLINE',
      startTime: setHours(new Date().setMinutes(0), 14),
      endTime: addHours(setHours(new Date().setMinutes(0), 14), 2),
      place: null,
    },
  });

  const { mutate: createSession } = useCreateSession();

  return (
    <FormProvider {...form}>
      <div className="grid lg:grid-cols-2 grid-cols-1  gap-8 bg-gray-100 max-h-full">
        <SessionForm onSubmit={createSession} />
        <SessionPreview />
      </div>
    </FormProvider>
  );
};

export default SessionNewPage;
