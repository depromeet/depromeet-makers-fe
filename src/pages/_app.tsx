import type { AppProps } from 'next/app';
import { domAnimation, LazyMotion } from 'framer-motion';

import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LazyMotion features={domAnimation}>
      <Component {...pageProps} />
    </LazyMotion>
  );
}
