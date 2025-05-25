// src/pages/_app.tsx
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { loginSuccess } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function InnerApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(loginSuccess(token));
  }, [dispatch]);

  return <Component {...pageProps} />;
}

function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <InnerApp {...props} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;