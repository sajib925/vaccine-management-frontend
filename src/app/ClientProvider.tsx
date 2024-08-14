"use client"

import {QueryClientProvider, QueryClient} from 'react-query'


export default function ClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const queryClient = new QueryClient()
  return (
        <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
          
  );
}
