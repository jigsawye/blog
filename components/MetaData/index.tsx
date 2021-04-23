import Head from 'next/head';
import { FC } from 'react';
import { SITE_URL } from '../../lib/constants';

interface MetaDataProps {
  title?: string;
  uri?: string;
  excerpt?: string;
}

const DEFAULT_TITLE = 'JIGSAWYE';
const DEFAULT_DESCRIPTION = '個人隨筆';

const MetaData: FC<MetaDataProps> = ({
  title, uri, excerpt = DEFAULT_DESCRIPTION,
}) => (
  <Head>
    <title>{title ? `${title} · ${DEFAULT_TITLE}` : DEFAULT_TITLE}</title>
    <meta name="description" content={excerpt} />

    <meta property="fb:app_id" content="495983917226031" />
    <meta property="og:title" content={title} />
    <meta property="og:url" content={uri ? `${SITE_URL}${uri}` : SITE_URL} />
    <meta property="og:description" content={excerpt} />
  </Head>
);

export default MetaData;
