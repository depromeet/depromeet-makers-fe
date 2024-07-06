import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import MonitoringInitializer from '@depromeet-makers-fe/ui/src/components/MonitoringInitializer';
import { SnackBar } from '@depromeet-makers-fe/ui';
import theme from '@depromeet-makers-fe/ui/src/styles/theme';
import React from 'react';
import Layout from '~/components/Layout';
import GlobalStyle from '~/styles/GlobalStyle';
import QueryClientProvider from '~/apis/QueryClientProvider';
import { pretendard } from '~/assets/fonts/font';
import usePageTrack from '~/hooks/event/usePageTrack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <MonitoringInitializer />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <SnackBar.Provider />
          <PageViewTracker />
          <Layout>
            <Component {...pageProps} className={pretendard.className} />
          </Layout>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const PageViewTracker = () => {
  usePageTrack();

  return null;
};
