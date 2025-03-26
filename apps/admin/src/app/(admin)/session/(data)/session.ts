import { z } from 'zod';

export const sessionScheme = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  description: z.string().optional(),
  type: z.enum(['OFFLINE', 'ONLINE']).default('OFFLINE'),
  week: z
    .number()
    .min(1, { message: '주차를 입력해주세요.' })
    .max(16, { message: '주차는 최대 16까지 입력 가능합니다.' }),
  startTime: z.date({
    required_error: '시작 시간을 선택해주세요.',
  }),
  endTime: z.date({
    required_error: '종료 시간을 선택해주세요.',
  }),
  place: z
    .object({
      address: z.string(),
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable(),
});

export type SessionForm = z.infer<typeof sessionScheme>;
