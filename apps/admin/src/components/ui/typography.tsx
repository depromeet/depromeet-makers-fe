import { cn } from '@/lib/utils';
import type { ComponentProps, PropsWithChildren } from 'react';

export const H1 = ({ className,children }: ComponentProps<'h1'>) => {
  return <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>{children}</h1>;
};

export const H2 = ({ className,children }: ComponentProps<'h2'>) => {
  return <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>{children}</h2>;
};

export const H3 = ({ className,children }: ComponentProps<'h3'>) => {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>;
};

export const H4 = ({ className,children }: ComponentProps<'h4'>) => {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h4>;
};

export const P = ({ className,children }: ComponentProps<'p'>) => {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>;
};
