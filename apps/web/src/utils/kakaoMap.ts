import type { SessionPlace } from '../types/session';

import { isDesktop, isIos } from './userAgent';

export const openKakaoMap = ({ address, latitude, longitude }: SessionPlace) => {
  const webUrl = `https://map.kakao.com/link/to/${address},${latitude},${longitude}`;

  if (isDesktop()) {
    location.href = webUrl;
    return;
  }

  if (!isIos()) return;

  const kakaoMapSearchUrl = `kakaomap://search?q=${address}&p=${latitude},${longitude}`;

  try {
    const start = new Date().getTime();

    location.href = kakaoMapSearchUrl;

    const timeout = setTimeout(() => {
      const end = new Date().getTime();

      if (end - start < 1500) {
        location.href = webUrl;
      }
    }, 500);

    window.addEventListener('pagehide', () => {
      clearTimeout(timeout);
    });
  } catch (error) {
    location.href = webUrl;

    // Sentry.captureException(error);
  }
};
