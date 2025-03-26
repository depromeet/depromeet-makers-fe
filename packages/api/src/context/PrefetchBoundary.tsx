import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import {
  isPrefetchInfiniteOptions,
  isPrefetchOptions,
  type PrefetchInfiniteOptions,
  type PrefetchOptions,
} from './type';

interface PrefetchBoundaryProps {
  prefetchOptions: PrefetchOptions[] | PrefetchInfiniteOptions[] | PrefetchOptions | PrefetchInfiniteOptions;
  children: React.ReactNode;
}

export const PrefetchBoundary = async ({ prefetchOptions, children }: PrefetchBoundaryProps) => {
  const queryClient = new QueryClient();

  const prefetch = async (option: PrefetchOptions | PrefetchInfiniteOptions) => {
    if (isPrefetchOptions(option)) {
      return queryClient.prefetchQuery(option);
    }

    if (isPrefetchInfiniteOptions(option)) {
      return queryClient.prefetchInfiniteQuery(option);
    }
  };

  const prefetchAll = async (options: PrefetchOptions[] | PrefetchInfiniteOptions[]) => {
    return Promise.all(options.map(prefetch));
  };

  Array.isArray(prefetchOptions) ? await prefetchAll(prefetchOptions) : await prefetch(prefetchOptions);

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};
