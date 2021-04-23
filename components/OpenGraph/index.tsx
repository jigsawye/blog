import Head from 'next/head';
import { FC } from 'react';

interface OpenGraphProps {
  excerpt: string;
  title: string;
  url: string;
}

const OpenGraph: FC<OpenGraphProps> = ({ excerpt, title, url }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={excerpt} />

    <meta property="og:url" content={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={excerpt} />

    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={excerpt} />
  </Head>
);

export default OpenGraph;
