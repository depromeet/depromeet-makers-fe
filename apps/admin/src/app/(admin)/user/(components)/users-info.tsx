import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export const UsersInfo = () => {
  return (
    <header>
      <Card className="flex w-fit">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">사용자수</CardTitle>
          <p className="text-sm font-semibold">00명</p>
        </CardHeader>

        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">승인대기중</CardTitle>
          <p className="text-sm font-semibold">00명</p>
        </CardHeader>
      </Card>
    </header>
  );
};
