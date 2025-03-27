import { Skeleton } from '@/components/ui/skeleton';

const FORM_FIELDS = [
  { label: '주차' },
  { label: '종류' },
  { label: '이름' },
  { label: '설명' },
  { label: '시작 시간' },
  { label: '종료 시간' },
  { label: '장소' },
];

export const SessionFormSkeleton = () => {
  return (
    <form className="space-y-8 p-6 bg-white rounded-lg border border-gray-200 overflow-y-auto">
      {FORM_FIELDS.map(({ label }) => (
        <div key={label} className="space-y-2">
          <span className="text-sm">{label}</span>
          <Skeleton className="flex h-10 w-full rounded-md px-3 py-2" />
        </div>
      ))}
    </form>
  );
};
