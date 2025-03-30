'use client';

import { useMemo, useState } from 'react';
import { useGetSessionList } from '@depromeet-makers/api';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// TODO: 추후 API로부터 현재 주차를 받아오도록 수정
const CURRENT_WEEK = 1;

export const SessionCodeButton = () => {
  const [open, setOpen] = useState(false);

  const { data } = useGetSessionList();

  const currentSessionCode = useMemo(() => {
    return data?.find((session) => session.week === CURRENT_WEEK)?.code ?? '세션 코드가 없습니다.';
  }, [data]);

  return (
    <>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setOpen(true)}
        className="bg-orange-100 text-orange-500 hover:bg-orange-200"
      >
        이번주 세션 코드 보기
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-500">이번주 세션 코드</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-4xl text-black font-bold">{currentSessionCode}</DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};
