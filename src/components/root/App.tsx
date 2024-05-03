import { Router } from '~/components/router/Router';
import { StoreProvider, queryClient } from '../contexts/store';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';

export function App() {
  return (
    <HelmetProvider>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <main>
            <Router />
          </main>
        </QueryClientProvider>
      </StoreProvider>
    </HelmetProvider>
  );
}
