import type { MetadataRoute } from 'next';
import { baseUrl } from '@/lib/metadata';
import { blog } from '@/lib/source';
import { i18n, localizedPath, languageAlternates } from '@/lib/i18n';

export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, baseUrl).toString();
  const items = await Promise.all(
    i18n.languages
      .flatMap((lang) => blog.getPages(lang))
      .map(async (page) => {
        const { lastModified } = await page.data.load();

        return {
          url: url(page.url),
          lastModified: lastModified ? new Date(lastModified) : undefined,
          changeFrequency: 'weekly',
          priority: 0.5,
          alternates: {
            languages: Object.fromEntries(
              Object.entries(languageAlternates(`/blog/${page.slugs.join('/')}`)).map(
                ([lang, path]) => [lang, url(path)],
              ),
            ),
          },
        } as MetadataRoute.Sitemap[number];
      }),
  );

  return [
    ...i18n.languages.flatMap((lang) =>
      ['/', '/blog', '/about'].map((path) => ({
        url: url(localizedPath(path, lang)),
        changeFrequency: 'monthly' as const,
        priority: path === '/' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            Object.entries(languageAlternates(path)).map(([locale, href]) => [locale, url(href)]),
          ),
        },
      })),
    ),
    ...items,
  ];
}
