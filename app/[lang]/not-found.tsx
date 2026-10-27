'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { i18n, isLocale, localizedPath } from '@/lib/i18n';
import { messages } from '@/lib/messages';

export default function NotFound() {
  const { lang } = useParams<{ lang: string }>();
  const locale = isLocale(lang) ? lang : i18n.defaultLanguage;
  const text = messages[locale];
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-16">
      <h1 className="mb-4 text-3xl font-semibold">{text.notFound}</h1>
      <p className="mb-6 text-fd-muted-foreground">{text.notFoundDescription}</p>
      <Link href={localizedPath('/', locale)} className="underline">
        {text.home}
      </Link>
    </section>
  );
}
