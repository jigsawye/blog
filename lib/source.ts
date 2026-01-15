import { blog as blogCollection } from 'fumadocs-mdx:collections/server';
import { loader } from 'fumadocs-core/source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';


export const blog = loader(toFumadocsSource(blogCollection, []), {
  baseUrl: '/blog',
});
