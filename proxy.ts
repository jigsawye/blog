import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import { i18n } from '@/lib/i18n';
import { NextResponse, type NextRequest, type NextFetchEvent } from 'next/server';

const handleLocale = createI18nMiddleware(i18n);

export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const hasLocale = i18n.languages.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );
  if (!hasLocale && request.cookies.get('FD_LOCALE')?.value === 'en') {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return NextResponse.redirect(url);
  }
  return handleLocale(request, event);
}

export const config = {
  matcher: ['/', '/about', '/blog/:path*', '/en/:path*', '/zh-TW/:path*'],
};
