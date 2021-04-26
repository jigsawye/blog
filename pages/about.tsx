import { GetStaticProps, NextPage } from 'next';

import { ArticleContent } from '../components/Article';
import { Container, TitleSection } from '../components/common';
import markdownToHtml from '../lib/markdownToHtml';
import MetaData from '../components/MetaData';

const about = `

### Website

這裡是我個人的筆記及教學空間。


如果內文有錯各位可以告知我，我會馬上修正

### Me

葉裕安 / Evan Ye，ID \`jigsawye\`


System Developer@Yoctol

### Skill

Front-end:

- React
  - next
  - react-apollo
  - styled-components
- HTML5
- CSS, SASS, PostCSS
- JavaScript, ECMAScript
- Webpack, Babel, Next.js

Backend:

- Node.js
  - GraphQL
  - apollo-server
  - Koa
- PHP, Laravel
- WebSocket
- MySQL, PostgreSQL, SQLite
- Redis

Other:

- CI / CD
- Unix Command Line
- Git Version Control

### Slides

- 台中前端社群
    - [React 的真理之門](http://slides.com/jigsawye/react-the-gate#/)
    - [絕不口是心非的 JavaScript](https://docs.google.com/presentation/d/16m7F_Z_AoMiVQcflnOgvpGDmZEI8m1wP1KqpOSfkgdg/edit)
    - [跳進屬於 JavaScript 循環迴圈](https://docs.google.com/presentation/d/1rdYS3Ia_4YOGSqcWmcT0l46ErwjviFgTtjG5xM9_sLw/edit)
    - [JavaScript 三代同堂](https://docs.google.com/presentation/d/1ckAiWwZOzsdQ4pkqlV1O9DUNdgg-UDJFMa2KKarrM_A/edit#slide=id.gd896f8a3e_0_1)
- Hackathon Taiwan x Taichung
    - [Webpack : Bundle Your Front-end Resources](https://slides.com/jigsawye/webpack-workshop)

### Contact

- jigsaw.ye@gmail.com
- [@GitHub](https://github.com/jigsawye)
- [@Facebook](https://facebook.com/jigsaw.ye)
- [@LinkedIn](https://www.linkedin.com/in/jigsawye)
`;

interface AboutPageProps {
  content: string;
}

const AboutPage: NextPage<AboutPageProps> = ({ content }) => (
  <>
    <MetaData title="ABOUT" uri="about" />

    <TitleSection>About</TitleSection>

    <Container>
      <ArticleContent>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </ArticleContent>
    </Container>
  </>
);

export default AboutPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: { content: await markdownToHtml(about) },
});
