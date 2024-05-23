import React from 'react';

import { BottomNav } from '@/components/BottomNav';
import Prepare from '@/components/Prepare';
import { USER_NAV_ITEMS } from '@/constants/bottomNav';

function Mypage() {
  return (
    <>
      <Prepare />
      <BottomNav items={USER_NAV_ITEMS} />
    </>
  );
}

export default Mypage;
