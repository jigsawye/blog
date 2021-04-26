import { GetStaticProps, NextPage } from 'next';
import { getPosts } from '../lib/api';

import Post from '../types/post';
import formatDate from '../lib/formatDate';
import ArchivesWrapper from '../components/Archives/ArchivesWrapper';
import { Container, TitleSection } from '../components/common';
import { DateWrapper, TitleLink } from '../components/Article';
import { SITE_URL } from '../lib/constants';
import MetaData from '../components/MetaData';

type ArchivesPageProps = {
  Posts: Post[];
};

const ArchivesPage: NextPage<ArchivesPageProps> = ({ Posts }) => (
  <>
    <MetaData title="ARCHIVES" uri="archives" />

    <TitleSection>Archives</TitleSection>

    {Posts.map((post) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const Posts = await getPosts(['title', 'date', 'slug']);

  return {
    props: { Posts },
  };
};
