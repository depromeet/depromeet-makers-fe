import { BottomNav } from '@depromeet-makers-fe/ui';
import Prepare from '@depromeet-makers-fe/ui/src/components/Prepare'; // TODO (@kimyouknow) module export 설정 수정하기
import { USER_NAV_ITEMS } from '~/constants/bottomNav';

function Mypage() {
  return (
    <>
      <Prepare />
      <BottomNav items={USER_NAV_ITEMS} />
    </>
  );
}

export default Mypage;
