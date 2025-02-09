import type { Metadata } from 'next';

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
