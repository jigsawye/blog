import NextHead from 'next/head';
import { FC } from 'react';

const Head: FC = () => (
  <NextHead>
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <meta property="og:site_name" content="JIGSAWYE" />
    <meta property="og:type" content="website" />
    <meta
      property="og:image"
      content="https://avatars1.githubusercontent.com/u/8567270?v=3&s=300"
    />

    <meta name="twitter:card" content="summary" />

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
