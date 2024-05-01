import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';
import { ThemeProvider } from 'styled-components';

import QueryClientProvider from '@/apis/QueryClientProvider';
import { SnackBarProvider } from '@/components/SnackBar/SnackBarProvider';
import GlobalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <LazyMotion features={domAnimation}>
          <SnackBarProvider />
          <Component {...pageProps} />
        </LazyMotion>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
