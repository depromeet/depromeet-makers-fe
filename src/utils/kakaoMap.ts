import type { SessionPlace } from '@/types/session';

const isIos = () => {
  const userAgent = navigator.userAgent;

  return Boolean(userAgent.match(/iPhone|iPad|iPod/i));
};

const APP_STORE_LINK = 'itms-apps://itunes.apple.com/app/id304608425';

export const openKakaoMap = ({ address, latitude, longitude }: SessionPlace) => {
  if (!isIos()) return;

  const kakaoMapSearchUrl = `kakaomap://search?q=${address}&p=${latitude},${longitude}`;

  const start = new Date().getTime();

  location.href = kakaoMapSearchUrl;

  const successTimeout = setTimeout(() => {
    location.href = kakaoMapSearchUrl;
  }, 0);

  const fallbackTimeout = setTimeout(() => {
    const end = new Date().getTime();

    if (end - start < 1500) {
      location.href = APP_STORE_LINK;
    }
  }, 1000);

  window.addEventListener('blur', () => {
    clearTimeout(fallbackTimeout);
    clearTimeout(successTimeout);
  });
};
