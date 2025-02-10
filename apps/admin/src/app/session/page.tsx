import Link from 'next/link';

import { SessionTable } from '@/components/session/SessionTable';
import { Button } from '@/components/ui/button';
import { H4 } from '@/components/ui/typography';

const SessionPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between p-3">
        <H4>세션 관리</H4>
        <Link href="/session/new">
          <Button>새로운 세션 추가</Button>
        </Link>
      </div>

      <SessionTable />
    </div>
  );
};

export default SessionPage;
