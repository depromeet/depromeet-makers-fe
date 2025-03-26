import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const COLUMN_COUNT = 5;
const ROW_COUNT = 10;

export const SessionTableSkeleton = () => {
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>주차</TableHead>
            <TableHead>세션 종류</TableHead>
            <TableHead>세션 이름</TableHead>
            <TableHead>시작 시간</TableHead>
            <TableHead>세션 장소</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: ROW_COUNT }).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from({ length: COLUMN_COUNT }).map((_, colIndex) => (
                <TableCell key={colIndex} className="p-4">
                  <Skeleton className="h-4 w-full rounded-lg" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
