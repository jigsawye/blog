import { getPageImage, blog } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import {
  getImageResponseOptions,
  MetadataDescription,
  MetadataImage,
  MetadataTitle,
} from '@/lib/og/generate';

export const revalidate = false;

export async function GET(_req: Request, { params }: RouteContext<'/og/[...slug]'>) {
  const { slug } = await params;

  const page = blog.getPage(slug);

  if (!page) notFound();

  return new ImageResponse(
    <MetadataImage eyebrow="Blog">
      <MetadataTitle>{page.data.title}</MetadataTitle>
      <MetadataDescription>{page.data.description}</MetadataDescription>
    </MetadataImage>,
    await getImageResponseOptions(),
  );
}

export function generateStaticParams() {
  return blog.getPages().map((page) => ({
    lang: page.locale,
    slug: getPageImage(page).segments,
  }));
}
