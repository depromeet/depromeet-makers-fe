import type { AppProps } from 'next/app';
import { AnimatePresence, domAnimation, LazyMotion, motion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import { pretendard } from '@/assets/fonts/font';
import Layout from '@/components/Layout';
import MonitoringInitializer from '@/components/MonitoringInitializer';
import { SnackBarProvider } from '@/components/SnackBar/SnackBarProvider';
import usePageTrack from '@/hooks/event/usePageTrack';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider>
      <MonitoringInitializer />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <SnackBarProvider />
          <PageViewTracker />
          <AnimatePresence mode="wait">
            <motion.div
              key={router.route}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Layout>
                <Component {...pageProps} className={pretendard.className} />
              </Layout>
            </motion.div>
          </AnimatePresence>
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const PageViewTracker = () => {
  usePageTrack();

  return null;
};
