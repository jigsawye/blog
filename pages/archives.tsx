import { GetStaticProps, NextPage } from 'next';
import { getPosts } from '../lib/api';

import { PostType } from '../types';
import formatDate from '../lib/formatDate';
import ArchivesWrapper from '../components/ArchivesWrapper';
import { Container, TitleSection } from '../components/common';
import { DateWrapper, TitleLink } from '../components/Article';
import { SITE_URL } from '../lib/constants';
import MetaData from '../components/MetaData';

type ArchivesPageProps = {
  posts: Pick<PostType, 'slug' | 'title' | 'date'>[];
};

const ArchivesPage: NextPage<ArchivesPageProps> = ({ posts }) => (
  <>
    <MetaData title="Archives" uri="archives" />

    <TitleSection>Archives</TitleSection>

    {posts.map((post) => (
      <ArchivesWrapper key={post.slug}>
        <Container>
          <DateWrapper>{formatDate(post.date)}</DateWrapper>
          <TitleLink href={`${SITE_URL}${post.slug}`}>{post.title}</TitleLink>
        </Container>
      </ArchivesWrapper>
    ))}
  </>
);

export default ArchivesPage;

export const getStaticProps: GetStaticProps<ArchivesPageProps> = async () => {
  const posts = await getPosts(['title', 'date', 'slug']);

  return {
    props: { posts },
  };
};
