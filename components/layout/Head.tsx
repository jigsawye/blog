import NextHead from 'next/head';
import { SITE_URL } from '../../lib/constants';

const metadata = {
  title: 'JIGSAWYE',
  description: '個人隨筆',
};

const Head = () => (
  <NextHead>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={metadata.description} />
    <title>{metadata.title}</title>
    <meta property="og:title" content={metadata.title} />
    <meta property="og:url" content={SITE_URL} />
    <meta property="og:site_name" content={metadata.title} />
    <meta
      property="og:image"
      content="https://avatars1.githubusercontent.com/u/8567270?v=3&s=300"
    />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={metadata.title} />
    <meta name="twitter:description" content={metadata.description} />

    <link rel="icon" href="/favicon.png" />

    <link
      rel="search"
      type="application/opensearchdescription+xml"
      href="/rss.xml"
      title="JIGSAWYE"
    />
  </NextHead>
);

export default Head;
