import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostBySlug, getPosts } from '../../../../lib/api';
import PostType from '../../../../types/post';
import Container from '../../../../components/common/Container';
import Disqus from '../../../../components/Disqus';
import Layout from '../../../../components/layout';
import MetaData from '../../../../components/MetaData';
import { ArticleContent, ArticleTitleSection, BackToIndexLink } from '../../../../components/Article';

type Props = {
  post: PostType
};

const Post = ({ post }: Props) => {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <MetaData
        title={post.title}
        excerpt={post.excerpt.replace(/<[^>]*>/g, '')}
        uri={post.slug}
      />

      <ArticleTitleSection title={post.title} date={post.date} />

      <Container>
        <ArticleContent dangerouslySetInnerHTML={{ __html: post.content }} />

        <Link href="/" passHref>
          <BackToIndexLink>
            ← Back to Home
          </BackToIndexLink>
        </Link>
      </Container>

      <Disqus
        slug={post.slug}
        title={post.title}
      />
    </Layout>
  );
};

export default Post;

export const getStaticProps: GetStaticProps<{
  post: PostType
}, {
  year: string;
  month: string;
  day: string;
  slug: string;
}> = async ({ params }) => {
  const {
    year, month, day, slug,
  } = params ?? {};
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
      post: post as PostType,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts(['slug']);
  const paths = posts.map((post) => {
    const [year, month, day, slug] = post.slug.split('/');

    return {
      params: {
        year, month, day, slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
