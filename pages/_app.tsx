import { NextPage } from 'next';
import { AppProps } from 'next/app';

import Layout from '../components/Layout';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);

export default MyApp;
