import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote/dist/types';

import { PostType } from '../types';

const postsDirectory = join(process.cwd(), '_posts');

export function getPostSlugs(): string[] {
  return fs.readdirSync(postsDirectory);
}

export const getPostBySlug = async <K extends keyof PostType>(
  slug: string,
  fields: K[] = []
): Promise<Pick<PostType, K>> => {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const post: Record<string, string | MDXRemoteSerializeResult> = {};

  // Ensure only the minimal needed data is exposed
  // eslint-disable-next-line no-restricted-syntax
  for (const field of fields) {
    if (field === 'slug') {
      post.slug = realSlug.replace(
        /([0-9]+)-([0-9]+)-([0-9]+)-(.+)/g,
        '$1/$2/$3/$4'
      );
    } else if (field === 'content') {
      // eslint-disable-next-line no-await-in-loop
      post.content = await serialize(content);
    } else if (field === 'excerpt') {
      // eslint-disable-next-line no-await-in-loop
      post.excerpt = await serialize(content.split('<!-- more -->')[0]);
    } else if (field === 'date') {
      post.date = new Date(data[field]).toISOString();
    } else if (data[field]) {
      post[field] = data[field];
    }
  }

  return post as Pick<PostType, K>;
};

export const getPosts = async <K extends keyof PostType>(
  fields: K[] = []
): Promise<Pick<PostType, 'date' | K>[]> => {
  const slugs = getPostSlugs();

  const posts = (
    await Promise.all(
      slugs.map((slug) => getPostBySlug(slug, [...fields, 'date']))
    )
  )
    // sort posts by date in descending order
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
};
