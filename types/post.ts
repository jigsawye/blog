import { MdxRemote } from 'next-mdx-remote/types';

type PostType = {
  slug: string;
  title: string;
  date: string;
  excerpt: MdxRemote.Source;
  content: MdxRemote.Source;
};

export default PostType;
