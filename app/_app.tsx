// app/_app.tsx
import { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/react';
import Layout from './layout';
import { NextComponentTypeWithLayout } from '../types';
import '../styles/globals.css';

// Import your next-auth.config.js file for configuration
import { options } from '../next-auth.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider options={options} session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
