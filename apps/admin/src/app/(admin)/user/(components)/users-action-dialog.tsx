'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { SelectDropdown } from '@/components/select-dropdown';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';

import { userTypes } from '../(data)/data';
import type { User } from '../(data)/schema';

const formSchema = z.object({
  username: z.string().min(1, { message: '사용자 이름을 입력해주세요.' }),
  email: z.string().min(1, { message: '이메일을 입력해주세요.' }).email({ message: '유효하지 않은 이메일이에요.' }),
  // TODO: validation 문구 고민..
  role: z.string().min(1, { message: 'Role is required.' }),
  isEdit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface UsersActionDialogProps {
  currentRow?: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UsersActionDialog = ({ currentRow, open, onOpenChange }: UsersActionDialogProps) => {
  const isEdit = !!currentRow;

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          isEdit,
        }
      : {
          username: '',
          email: '',
          role: '',
          isEdit,
        },
  });

  const onSubmit = (values: UserForm) => {
    form.reset();

    toast({
      title: '제출할 내용을 확인해주세요:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? '사용자 편집하기' : '사용자 추가하기'}</DialogTitle>
          <DialogDescription>{isEdit ? '사용자 정보를 업데이트해요.' : '새로운 사용자를 등록해요.'}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="-mr-4 h-[26.25rem] w-full py-1 pr-4">
          <Form {...form}>
            <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">사용자 이름</FormLabel>
                    <FormControl>
                      <Input placeholder="john_doe" className="col-span-4" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">이메일</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@gmail.com" className="col-span-4" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1 space-y-0">
                    <FormLabel className="col-span-2 text-right">Role</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder="Select a role"
                      className="col-span-4"
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit" form="user-form">
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
