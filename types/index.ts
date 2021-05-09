import { MdxRemote } from 'next-mdx-remote/types';

export type PostType = {
  slug: string;
  title: string;
  date: string;
  excerpt: MdxRemote.Source;
  content: MdxRemote.Source;
};
