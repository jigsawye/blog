import Link from 'next/link';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { GetStaticProps, NextPage } from 'next';

import { getPosts } from '../lib/api';
import Post from '../types/post';
import Container from '../components/common/Container';
import formatDate from '../lib/formatDate';
import {
  ArticleContent,
  ArticleWrapper,
  DateWrapper,
  ReadMoreLink,
  TitleLink,
} from '../components/Article';
import MetaData from '../components/MetaData';

type IndexPageProps = {
  posts: Post[];
};

const IndexPage: NextPage<IndexPageProps> = ({ posts }) => (
  <>
    <MetaData />

    {posts.map((post) => (
      <ArticleWrapper key={post.slug}>
        <Container>
          <Link href={`/${post.slug}`} passHref>
            <TitleLink>{post.title}</TitleLink>
          </Link>
          <DateWrapper>{formatDate(post.date)}</DateWrapper>

          <ArticleContent>{hydrate(post.excerpt)}</ArticleContent>

          <Link href={`/${post.slug}`} passHref>
            <ReadMoreLink>Read More →</ReadMoreLink>
          </Link>
        </Container>
      </ArticleWrapper>
    ))}
  </>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts(['title', 'date', 'slug', 'excerpt']);

  let formattedPosts: Partial<Post>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const post of posts) {
    formattedPosts = [
      ...formattedPosts,
      {
        ...post,
        // eslint-disable-next-line no-await-in-loop
        excerpt: await renderToString(post.excerpt),
      },
    ];
  }

  return {
    props: { posts: formattedPosts },
  };
};
