import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions, translations } from '@/lib/layout.shared';
import { i18nProvider } from 'fumadocs-ui/i18n';
import { i18n, isLocale, localizedPath } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { SiteProvider } from '@/components/site-provider';
import type { ReactNode } from 'react';
import { createMetadata, baseUrl } from '@/lib/metadata';
import '../global.css';
import { AlbumIcon, UserIcon } from 'lucide-react';

export const metadata = createMetadata({
  title: {
    template: '%s | JIGSAWYE',
    default: 'JIGSAWYE',
  },
  metadataBase: baseUrl,
});

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const text = messages[lang];

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col">
        <SiteProvider
          locale={lang}
          search={{ enabled: false }}
          i18n={i18nProvider(translations, lang)}
        >
          <HomeLayout
            {...baseOptions(lang)}
            links={[
              {
                icon: <AlbumIcon />,
                text: text.blog,
                url: localizedPath('/blog', lang),
                active: 'nested-url',
              },
              {
                icon: <UserIcon />,
                text: text.about,
                url: localizedPath('/about', lang),
                active: 'nested-url',
              },
            ]}
          >
            {children}
          </HomeLayout>
        </SiteProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
