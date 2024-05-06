import { Router } from '~/components/router/Router';
import { StoreProvider } from '../contexts/store';
import { HelmetProvider } from 'react-helmet-async';
// import { QueryClientProvider } from '@tanstack/react-query';

export function App() {
  return (
    <HelmetProvider>
      <StoreProvider>
        <main>
          <Router />
        </main>
      </StoreProvider>
    </HelmetProvider>
  );
}
