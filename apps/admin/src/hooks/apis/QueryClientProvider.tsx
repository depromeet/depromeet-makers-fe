'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import type { QueryClientConfig } from '@tanstack/react-query';
import { HydrationBoundary, QueryClient, QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClientOption: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
};

const QueryClientProvider = ({ pageProps, children }: PropsWithChildren<Pick<AppProps, 'pageProps'>>) => {
  const [queryClient] = useState(() => new QueryClient(queryClientOption));

  return (
    <BaseQueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {children}
        <ReactQueryDevtools />
      </HydrationBoundary>
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
