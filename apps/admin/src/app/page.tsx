import Layout from '@/components/Layout';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <Layout>
      <div className="border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">전체 주차</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-5 gap-4 font-medium text-sm text-gray-500">
          <div>체크박스</div>
          <div>출결 status</div>
          <div>멤버 이름</div>
          <div>멤버 이메일</div>
          <div>소속 팀</div>
        </div>
        <Separator className="my-4" />
        {/* 여기에 실제 데이터 테이블 내용이 들어갈 수 있습니다 */}
      </div>
    </Layout>
  );
}
