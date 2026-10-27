import { getPageImage, blog } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import { i18n, isLocale } from '@/lib/i18n';
import { messages } from '@/lib/messages';
import {
  getImageResponseOptions,
  MetadataDescription,
  MetadataImage,
  MetadataTitle,
} from '@/lib/og/generate';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/[...slug]'>) {
  const { slug } = await params;
  const lang = isLocale(slug[0]) ? slug[0] : i18n.defaultLanguage;
  const segments = isLocale(slug[0]) ? slug.slice(1) : slug;
  const text = messages[lang];
  if (segments.length === 1 && (segments[0] === 'home' || segments[0] === 'about')) {
    const about = segments[0] === 'about';
    return new ImageResponse(
      <MetadataImage>
        <MetadataTitle>{about ? text.about : messages.en.greeting}</MetadataTitle>
        <MetadataDescription>
          {about ? text.aboutDescription : messages.en.introduction}
        </MetadataDescription>
      </MetadataImage>,
      await getImageResponseOptions(),
    );
  }
  if (segments.at(-1) !== 'image.webp') notFound();
  const page = blog.getPage(segments.slice(0, -1), lang);

  if (!page) notFound();

  return new ImageResponse(
    <MetadataImage eyebrow={text.blog}>
      <MetadataTitle>{page.data.title}</MetadataTitle>
      <MetadataDescription>{page.data.description}</MetadataDescription>
    </MetadataImage>,
    await getImageResponseOptions(),
  );
}

export function generateStaticParams() {
  return i18n.languages.flatMap((lang) => [
    { slug: [lang, 'home'] },
    { slug: [lang, 'about'] },
    ...blog.getPages(lang).map((page) => ({ slug: [lang, ...getPageImage(page).segments] })),
  ]);
}
