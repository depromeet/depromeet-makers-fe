import { useEffect } from 'react';
import Script from 'next/script';
import mixpanel from 'mixpanel-browser';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? 'G-CVL3MG6TPV';
const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

const MonitoringInitializer = () => {
  useEffect(() => {
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'production') {
      mixpanel.init(MIXPANEL_ID ?? '', { debug: true });
    }
    // }
  }, []);

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
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
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
            `,
            }}
          />
        </>
      )}
    </>
  );
};

export default MonitoringInitializer;
