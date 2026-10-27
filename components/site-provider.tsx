'use client';

import { RootProvider, type RootProviderProps } from 'fumadocs-ui/provider/next';
import { usePathname } from 'next/navigation';
import { i18n, isLocale, localizedPath, type Locale } from '@/lib/i18n';

export function SiteProvider({ locale, ...props }: RootProviderProps & { locale: Locale }) {
  const pathname = usePathname();

  function changeLocale(value: string) {
    if (!isLocale(value)) return;
    const path =
      locale === i18n.defaultLanguage ? pathname : pathname.slice(locale.length + 1) || '/';
    document.cookie = `FD_LOCALE=${value}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`;
    // A locale change remounts the theme provider. Load a new document to run its initialization script.
    window.location.assign(`${localizedPath(path, value)}${location.search}${location.hash}`);
  }

  return <RootProvider {...props} i18n={{ ...props.i18n, onLocaleChange: changeLocale }} />;
}
