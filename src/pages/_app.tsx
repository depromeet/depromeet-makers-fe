import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import { pretendard } from '@/assets/fonts/font';
import Layout from '@/components/Layout';
import MonitoringInitializer from '@/components/MonitoringInitializer';
import { SnackBarProvider } from '@/components/SnackBar/SnackBarProvider';
import usePageTrack from '@/hooks/event/usePageTrack';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <MonitoringInitializer />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <SnackBarProvider />
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
