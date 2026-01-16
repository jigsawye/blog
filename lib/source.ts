import { blog as blogCollection } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const blog = loader(toFumadocsSource(blogCollection, []), {
  baseUrl: '/blog',
});

export function getPageImage(page: InferPageType<typeof blog>) {
  const segments = [...page.slugs, 'image.webp'];
  return {
    segments,
    url: `/og/${segments.join('/')}`,
  };
}
