'use client';

import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import type { useCreateSession } from '@depromeet-makers/api';

import { SelectDropdown } from '@/components/select-dropdown';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

import { SESSION_TYPES } from '../(constant)/session';
import { type SessionForm as SessionFormType } from '../(data)/session';

import { DateTimePicker } from './date-time-picker';

interface SessionFormProps {
  onSubmit: ReturnType<typeof useCreateSession>['mutate'];
}

export const SessionForm = ({ onSubmit }: SessionFormProps) => {
  const router = useRouter();
  const form = useFormContext<SessionFormType>();

  const handleDateSelect = (selectedDate?: Date) => {
    if (!selectedDate) return;

    form.setValue('startTime', selectedDate);
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    const currentDate = form.getValues('startTime') || new Date();
    const newDate = new Date(currentDate);

    if (type === 'hour') {
      newDate.setHours(parseInt(value, 10));
    }

    if (type === 'minute') {
      newDate.setMinutes(parseInt(value, 10));
    }

    form.setValue('startTime', newDate);
  };

  const handleSubmit = (formValues: SessionFormType) => {
    form.reset();

    onSubmit(
      {
        ...formValues,
        startTime: formValues.startTime.toISOString(),
        endTime: formValues.endTime.toISOString(),
      },
      {
        onSuccess: () => {
          toast({
            title: '세션이 생성되었어요:',
            description: (
              <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                <code className="text-white">{JSON.stringify(formValues, null, 2)}</code>
              </pre>
            ),
          });

          router.push('/session');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        id="session-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 p-6 bg-white rounded-lg border border-gray-200 overflow-y-auto"
      >
        <FormField
          control={form.control}
          name="week"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주차</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="1~16 사이의 숫자로 입력해주세요."
                  onChange={(event) => field.onChange(+event.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>종류</FormLabel>
              <SelectDropdown
                defaultValue={field.value}
                onValueChange={field.onChange}
                placeholder="오프라인/온라인"
                items={SESSION_TYPES.map(({ label, value }) => ({
                  label,
                  value,
                }))}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input type="text" placeholder="세션 이름을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea placeholder="세션 설명을 입력해주세요." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>시작 시간</FormLabel>
              <FormDescription>기본 세션 시작 시간은 14시로 설정돼요.</FormDescription>
              <DateTimePicker field={field} onChangeTime={handleTimeChange} onSelectDate={handleDateSelect} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>종료 시간</FormLabel>
              <FormDescription>기본 세션 종료 시간은 시작 시간 + 2시간으로 설정돼요.</FormDescription>
              <DateTimePicker field={field} onChangeTime={handleTimeChange} onSelectDate={handleDateSelect} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* TODO: 카카오맵에서 장소 고르기 추가 */}
        <FormField
          control={form.control}
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>장소</FormLabel>
              <FormDescription>오프라인 세션인 경우 세션 장소를 입력해주세요.</FormDescription>
              <FormControl>
                <Input type="text" placeholder="오프라인일 경우 세션 장소를 입력해주세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" form="session-form" className="w-full" disabled={!form.formState.isValid}>
          완료
        </Button>
      </form>
    </Form>
  );
};
