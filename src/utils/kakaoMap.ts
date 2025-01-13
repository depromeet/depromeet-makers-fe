import * as Sentry from '@sentry/nextjs';

import type { SessionPlace } from '@/types/session';

const isIos = () => {
  const userAgent = navigator.userAgent;

  return Boolean(userAgent.match(/iPhone|iPad|iPod/i));
};

const isAndroid = () => {
  const userAgent = navigator.userAgent;

  return Boolean(userAgent.match(/Android/i));
};

export const isDesktop = () => {
  return Boolean(!isAndroid() && !isIos());
};

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

    const newWindow = window.open(kakaoMapSearchUrl);

    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      location.href = webUrl;
      return;
    }

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

    Sentry.captureException(error);
  }
};
