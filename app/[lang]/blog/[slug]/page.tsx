import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { blog, getPageImage } from '@/lib/source';
import { createLocalizedMetadata } from '@/lib/metadata';
import { formatDate, localizedPath, type Locale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import { buttonVariants } from '@/components/button';
import { ShareButton } from './page.client';
import { getMDXComponents } from '@/mdx-components';
import path from 'node:path';
import { cn } from '@/lib/cn';

export default async function Page(props: { params: Promise<{ lang: Locale; slug: string }> }) {
  const params = await props.params;
  const text = messages[params.lang];
  const page = blog.getPage([params.slug], params.lang);

  if (!page) notFound();
  const { body: Mdx, toc } = await page.data.load();

  return (
    <article className="flex flex-col mx-auto w-full max-w-[800px] px-4 py-8">
      <div className="flex flex-row gap-4 text-sm mb-8">
        <div>
          <span className="mb-1 text-sm text-fd-muted-foreground">{text.published}</span>{' '}
          <span className="font-medium">
            {formatDate(
              page.data.date ?? path.basename(page.path, path.extname(page.path)),
              params.lang,
            )}
          </span>
        </div>
      </div>

      <h1 className="text-3xl font-semibold mb-4">{page.data.title}</h1>
      <p className="text-fd-muted-foreground mb-8">{page.data.description}</p>

      <div className="prose min-w-0 flex-1">
        <div className="flex flex-row gap-2 mb-8 not-prose">
          <ShareButton url={page.url} shareLabel={text.share} copiedLabel={text.copied} />
          <Link
            href={localizedPath('/blog', params.lang)}
            className={cn(
              buttonVariants({
                variant: 'secondary',
              }),
            )}
          >
            {text.back}
          </Link>
        </div>

        <InlineTOC items={toc} />
        <Mdx components={getMDXComponents()} />
      </div>
    </article>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = blog.getPage([params.slug], params.lang);

  if (!page) notFound();

  return createLocalizedMetadata(params.lang, `/blog/${params.slug}`, {
    title: page.data.title,
    description: page.data.description ?? page.data.title,
    openGraph: {
      images: getPageImage(page).url,
    },
    twitter: { images: getPageImage(page).url },
  });
}

export function generateStaticParams({ params }: { params: { lang: string } }): { slug: string }[] {
  return blog.getPages(params.lang).map((page) => ({
    slug: page.slugs[0],
  }));
}
