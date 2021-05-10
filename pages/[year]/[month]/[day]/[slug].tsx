import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { renderToStaticMarkup } from 'react-dom/server';

import { getPostBySlug, getPosts } from '../../../../lib/api';
import { PostType } from '../../../../types';
import Container from '../../../../components/common/Container';
import Disqus from '../../../../components/Disqus';
import MetaData from '../../../../components/MetaData';
import {
  ArticleTitleSection,
  BackToIndexLink,
} from '../../../../components/Article';

type PostPageProps = {
  post: Pick<PostType, 'slug' | 'title' | 'date' | 'excerpt' | 'content'>;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const excerpt = renderToStaticMarkup(<MDXRemote {...post.excerpt} />).replace(
    /<[^>]*>/g,
    ''
  );

  return (
    <>
      <MetaData title={post.title} excerpt={excerpt} uri={post.slug} />

      <ArticleTitleSection title={post.title} date={post.date} />

      <Container>
        <MDXRemote {...post.content} />

        <Link href="/" passHref>
          <BackToIndexLink>← Back to Home</BackToIndexLink>
        </Link>
      </Container>

      <Disqus slug={post.slug} title={post.title} />
    </>
  );
};

export default PostPage;

type ParamsType = {
  year: string;
  month: string;
  day: string;
  slug: string;
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  ParamsType
> = async ({ params }) => {
  const { year, month, day, slug } = params ?? {};
  const fullSlug = `${year}-${month}-${day}-${slug}`;

  const post = await getPostBySlug(fullSlug, [
    'title',
    'date',
    'slug',
    'content',
    'excerpt',
  ]);

  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths<ParamsType> = async () => {
  const posts = await getPosts(['slug']);

  const paths = posts.map((post) => {
    const [year, month, day, slug] = post.slug.split('/');

    return {
      params: {
        year,
        month,
        day,
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
