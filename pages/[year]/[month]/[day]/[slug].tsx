import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import hydrate from 'next-mdx-remote/hydrate';

import renderToString from 'next-mdx-remote/render-to-string';
import { getPostBySlug, getPosts } from '../../../../lib/api';
import PostType from '../../../../types/post';
import Container from '../../../../components/common/Container';
import Disqus from '../../../../components/Disqus';
import MetaData from '../../../../components/MetaData';
import {
  ArticleContent,
  ArticleTitleSection,
  BackToIndexLink,
} from '../../../../components/Article';
import CodeBlock from '../../../../components/CodeBlock';

type PostPageProps = {
  post: PostType;
};

const PostPage: NextPage<PostPageProps> = ({ post }) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <MetaData
        title={post.title}
        excerpt={post.excerpt.renderedOutput.replace(/<[^>]*>/g, '')}
        uri={post.slug}
      />

      <ArticleTitleSection title={post.title} date={post.date} />

      <Container>
        <ArticleContent>
          {hydrate(post.content, {
            components: {
              code: CodeBlock,
            },
          })}
        </ArticleContent>

        <Link href="/" passHref>
          <BackToIndexLink>← Back to Home</BackToIndexLink>
        </Link>
      </Container>

      <Disqus slug={post.slug} title={post.title} />
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps<
  {
    post: PostType;
  },
  {
    year: string;
    month: string;
    day: string;
    slug: string;
  }
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

  const formattedPost = {
    ...post,
    content: await renderToString(post.content),
    excerpt: await renderToString(post.excerpt),
  };

  return {
    props: {
      post: formattedPost,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
