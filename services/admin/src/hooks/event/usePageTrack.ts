import { useEffect } from 'react';
import { useRouter } from 'next/router';
import mixpanel from 'mixpanel-browser';

import { isProduction } from '../../constants/environment';
import { pageview } from '../../utils/gtag';

const usePageTrack = () => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (!isProduction) return;

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
