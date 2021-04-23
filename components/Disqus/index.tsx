import { FC } from 'react';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

import Container from '../common/Container';
import { SITE_URL } from '../../lib/constants';

const CommentWrapper = styled.div`
  margin: 40px 0 20px;
`;

interface DisqusProps {
  slug: string;
  title: string;
}

const Disqus: FC<DisqusProps> = ({ slug, title }) => (
  <Container>
    <CommentWrapper>
      <DiscussionEmbed
        shortname="jigsawnotes"
        config={{
          url: `${SITE_URL}${slug}`,
          identifier: slug,
          title,
        }}
      />
    </CommentWrapper>
  </Container>
);

export default Disqus;
