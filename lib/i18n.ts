import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'zh-TW',
  languages: ['zh-TW', 'en'],
  hideLocale: 'default-locale',
  fallbackLanguage: null,
});

export type Locale = (typeof i18n.languages)[number];

export function isLocale(value: string): value is Locale {
  return i18n.languages.some((locale) => locale === value);
}

export function localizedPath(path: string, locale: Locale): string {
  return locale === i18n.defaultLanguage ? path : `/${locale}${path === '/' ? '' : path}`;
}

export function languageAlternates(path: string) {
  return {
    'zh-TW': localizedPath(path, 'zh-TW'),
    en: localizedPath(path, 'en'),
    'x-default': localizedPath(path, i18n.defaultLanguage),
  };
}

export function formatDate(value: string | Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'Asia/Taipei',
  }).format(new Date(value));
}
