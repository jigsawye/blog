import type { Metadata } from 'next/types';
import { languageAlternates, localizedPath, type Locale } from './i18n';

export function createLocalizedMetadata(
  locale: Locale,
  path: string,
  override: Metadata,
): Metadata {
  return createMetadata({
    ...override,
    alternates: {
      canonical: localizedPath(path, locale),
      languages: languageAlternates(path),
      ...override.alternates,
    },
    openGraph: {
      locale: locale === 'en' ? 'en_US' : 'zh_TW',
      alternateLocale: locale === 'en' ? 'zh_TW' : 'en_US',
      url: localizedPath(path, locale),
      ...override.openGraph,
    },
  });
}

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://jigsawye.com',
      images: '/og/home',
      siteName: 'JIGSAWYE',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@_jigsawye',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/og/home',
      ...override.twitter,
    },
    alternates: {
      types: {
        'application/rss+xml': [
          {
            title: 'JIGSAWYE Blog',
            url: 'https://jigsawye.com/blog/rss.xml',
          },
        ],
      },
      ...override.alternates,
    },
  };
}

export const baseUrl =
  process.env.NODE_ENV === 'development' || !process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
