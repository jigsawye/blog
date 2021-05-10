import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type PostType = {
  slug: string;
  title: string;
  date: string;
  excerpt: MDXRemoteSerializeResult;
  content: MDXRemoteSerializeResult;
};
