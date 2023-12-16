import '@/styles/globals.css';
import Layout from '@/components/layout';
import React from 'react';

export default function App({ Component, pageProps, ...appProps }) {
  const isLayoutNeeded = appProps.router.pathname.startsWith(`/admin`);
  const LayoutComponent = isLayoutNeeded ? Layout : React.Fragment;
  return (
    <LayoutComponent>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}
