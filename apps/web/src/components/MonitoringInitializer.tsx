import { useEffect } from 'react';
import Script from 'next/script';
import mixpanel from 'mixpanel-browser';

import { isProduction } from '../constants/environment';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

const MonitoringInitializer = () => {
  useEffect(() => {
    if (isProduction) {
      mixpanel.init(MIXPANEL_ID ?? '', { debug: true });
    }
    // }
  }, []);

  if (!isProduction) return <></>;

  return (
    <>
      <>
        <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </>
    </>
  );
};

export default MonitoringInitializer;
