import type {
  FetchInfiniteQueryOptions,
  FetchQueryOptions,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  UseSuspenseInfiniteQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export type PrefetchOptions = Pick<FetchQueryOptions, 'queryKey' | 'queryFn'>;
export type PrefetchInfiniteOptions = Pick<FetchInfiniteQueryOptions, 'queryKey' | 'queryFn' | 'initialPageParam'>;

export const isPrefetchOptions = (option: PrefetchOptions | PrefetchInfiniteOptions): option is FetchQueryOptions => {
  return 'queryKey' in option && 'queryFn' in option && !('initialPageParam' in option);
};

export const isPrefetchInfiniteOptions = (
  option: PrefetchOptions | PrefetchInfiniteOptions,
): option is FetchInfiniteQueryOptions => {
  return 'queryKey' in option && 'queryFn' in option && 'initialPageParam' in option;
};

export type BasicSuspenseQueryOptions<T> = Pick<UseSuspenseQueryOptions<T>, 'queryKey' | 'queryFn'>;
export type BasicQueryOptions<T> = Pick<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
export type BasicInfiniteQueryOptions<T> = Pick<
  UseInfiniteQueryOptions<T>,
  'queryKey' | 'queryFn' | 'initialPageParam'
>;
export type BasicSuspenseInifniteQueryOptions<T> = Pick<
  UseSuspenseInfiniteQueryOptions<T>,
  'queryKey' | 'queryFn' | 'initialPageParam'
>;
