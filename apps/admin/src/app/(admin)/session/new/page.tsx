'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useCreateSession } from '@depromeet-makers/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { addHours, setHours } from 'date-fns';

import { Button } from '@/components/ui/button';
import { H3 } from '@/components/ui/typography';

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
    <div className="container mx-auto">
      <div className="flex justify-between p-4 gap-6">
        <H3>새로운 세션 추가하기</H3>
        <Button type="submit" form="session-form" disabled={!form.formState.isValid}>
          세션 만들기
        </Button>
      </div>
      <FormProvider {...form}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 bg-gray-100 max-h-full lg:h-[750px] rounded-lg">
          <SessionPreview />
          <SessionForm onSubmit={createSession} />
        </div>
      </FormProvider>
    </div>
  );
};

export default SessionNewPage;
