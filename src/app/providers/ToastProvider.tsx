'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

interface ToastProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ToastContainer /> */}
    </QueryClientProvider>
  );
}
