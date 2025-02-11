import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/sonner';

import QueryClientProvider from './QueryClientProvider';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Depromeet Makers Admin',
  description: 'Depromeet Makers Admin',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider>{children}</QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
