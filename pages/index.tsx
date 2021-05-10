import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';
import { MDXRemote } from 'next-mdx-remote';

import { getPosts } from '../lib/api';
import { PostType } from '../types';
import Container from '../components/common/Container';
import formatDate from '../lib/formatDate';
import {
  ArticleWrapper,
  DateWrapper,
  ReadMoreLink,
  TitleLink,
} from '../components/Article';
import MetaData from '../components/MetaData';

type IndexPageProps = {
  posts: Pick<PostType, 'slug' | 'title' | 'date' | 'excerpt'>[];
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

          <MDXRemote {...post.excerpt} />

          <Link href={`/${post.slug}`} passHref>
            <ReadMoreLink>Read More →</ReadMoreLink>
          </Link>
        </Container>
      </ArticleWrapper>
    ))}
  </>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  const posts = await getPosts(['title', 'date', 'slug', 'excerpt']);

  return {
    props: { posts },
  };
};
