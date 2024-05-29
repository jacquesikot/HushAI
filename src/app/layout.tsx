import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StoreProvider from './providers/StoreProvider';
import ToastProvider from './providers/ToastProvider';
import { ReactQueryClientProvider } from './providers/ReactQueryClientProvider';
import ThemeProvider from './providers/ThemeProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

inject();
injectSpeedInsights();

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Learn ICT - Accelerated ICT Forex Learning Platform',
  description: 'Providing an accelerated and personalised learning experience',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <StoreProvider>
        <ThemeProvider>
          <html lang="en">
            <body className={inter.className} style={{ margin: 0 }}>
              <StyledComponentsRegistry>
                <ToastProvider>{children}</ToastProvider>
              </StyledComponentsRegistry>
            </body>
          </html>
        </ThemeProvider>
      </StoreProvider>
    </ReactQueryClientProvider>
  );
}
