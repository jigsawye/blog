import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import Slugger from 'github-slugger';

import Layout from '../components/Layout';
import MDXProvider from '../components/MDXProvider';
import { SlugContext } from '../components/SlugContext/SlugContext';
import { GA_TRACKING_ID } from '../lib/constants';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const slugger = useRef(new Slugger());

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (process.env.NODE_ENV === 'production') {
        (
          window as typeof window & {
            gtag: (
              key: string,
              id: string,
              options: Record<string, string>
            ) => void;
          }
        ).gtag('config', GA_TRACKING_ID, {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <SlugContext.Provider value={slugger.current}>
      <Layout>
        <MDXProvider>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </SlugContext.Provider>
  );
};

export default MyApp;
