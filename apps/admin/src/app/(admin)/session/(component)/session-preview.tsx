import { IconLeft } from 'react-day-picker';
import { useFormContext } from 'react-hook-form';
import { getDay, getMonth } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { H5 } from '@/components/ui/typography';
import { CURRENT_GENERATION } from '@/constants/attendance';

import type { SessionForm } from '../(data)/session';

export const SessionPreview = () => {
  const { watch } = useFormContext<SessionForm>();
  const session = watch();

  return (
    <div className="w-[375px] h-[670px] p-6 mx-auto bg-white rounded-xl shadow-xl invisible lg:visible fixed lg:right-[10%] top-[calc(20vh)]">
      <IconLeft />

      <H5 className="my-[24px]">{`디프만 ${CURRENT_GENERATION}기 일정`}</H5>

      <SessionItem {...session} />
    </div>
  );
};

// TODO: 추후 공통 ui 패키지로 분리하기
const SessionItem = ({ week, type, startTime, title, description, place }: SessionForm) => {
  const isOffline = type === 'OFFLINE';
  const month = getMonth(startTime);
  const day = getDay(startTime);

  return (
    <div className="flex flex-col p-[20px] gap-[20px] rounded-xl bg-white border border-gray-200">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge className="px-2 py-1 rounded-md border-none bg-gray-200 text-gray-500">{week}주차</Badge>
          <p className="text-[14px] font-semibold">{`${month}월 ${day}일`}</p>
        </div>

        {isOffline ? (
          <Badge className="px-2 py-1 rounded-md border-none bg-gray-900 text-white">오프라인</Badge>
        ) : (
          <Badge className="px-2 py-1 rounded-md border-none bg-white text-gray-900 border border-gray-900">
            온라인
          </Badge>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <p className="text-[16px] font-semibold">{title || '세션 이름을 입력해주세요.'}</p>
          <p className="text-gray-500">{description || '세션 설명을 입력해주세요.'}</p>

          {isOffline && (
            <button className="flex justify-between items-center py-[12px] my-[8px] rounded-[6px] border border-gray-200 px-4 bg-white text-gray-500">
              <span className="flex items-center gap-2 text-[12px] text-gray-400">
                {place?.title || '장소를 입력해주세요'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
