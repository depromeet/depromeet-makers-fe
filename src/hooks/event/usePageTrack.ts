import { useEffect } from 'react';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';

import { pageview } from '@/utils/gtag';

// import { pageview } from '~/libs/gtag';
// import { isProd } from '~/utils/common';

const usePageTrack = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (!(process.env.NODE_ENV === 'production')) return;

      pageview(url);
      mixpanel.track('Page view', { label: url, category: process.env.WEB_VERSION });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default usePageTrack;
