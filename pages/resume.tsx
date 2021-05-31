import { GetStaticProps, NextPage } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';

import { Container, TitleSection } from '../components/common';
import MetaData from '../components/MetaData';
import serializeMdxSourceToText from '../lib/serializeMdxSourceToText';

const about = `
  ### 已經找到新工作囉，感謝所有有聯繫我的人！
`;

interface ResumePageProps {
  content: MDXRemoteSerializeResult;
}

const ResumePage: NextPage<ResumePageProps> = ({ content }) => {
  const excerpt = serializeMdxSourceToText(content);

  return (
    <>
      <MetaData title="[求職] 資深前端工程師" excerpt={excerpt} uri="resume" />

      <TitleSection>
        <del>[求職] 資深前端工程師</del>
      </TitleSection>

      <Container>
        <div
          style={{
            display: 'flex',
            minHeight: 'calc(100vh - 381px)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MDXRemote {...content} components={{ Link }} />
        </div>
      </Container>
    </>
  );
};

export default ResumePage;

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => ({
  props: {
    content: await serialize(about),
  },
});
