import { GetStaticProps, NextPage } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import { MdxRemote } from 'next-mdx-remote/types';
import { ArticleContent } from '../components/Article';
import { Container, TitleSection } from '../components/common';
import MetaData from '../components/MetaData';

const about = `

我是葉裕安 / Evan Ye，ID \`jigsawye\`，這裡是我個人的筆記及教學空間。

如果內文有錯各位可以告知我，我會馬上修正。

## Skill

### Front-end:

- react.js
  - next.js
  - react-spring
  - apollo-client
  - styled-components
- Vue
  - Vuex
- i18next
- TypeScript, JavaScript, ECMAScript
- Webpack, Babel, Rollup
- @graphql-codegen

### Backend:

- Node.js
  - GraphQL
  - DataLoader
  - apollo-server
  - Koa
  - knex
- PHP, Laravel
- WebSocket
- MySQL, PostgreSQL, MongoDB, SQLite
- Redis

### Testing

- Jest
- @testing-library/react
- apollo-server-testing

### Other:

- CI / CD
- Unix Command Line
- Git Version Control

## Slides

- 台中前端社群
    - [Design System](https://drive.google.com/file/d/1atuAFy3nz24bW7iw-qpZ8fN3ahytUXAv/view)
    - [React 的真理之門](http://slides.com/jigsawye/react-the-gate#/)
    - [絕不口是心非的 JavaScript](https://docs.google.com/presentation/d/16m7F_Z_AoMiVQcflnOgvpGDmZEI8m1wP1KqpOSfkgdg/edit)
    - [跳進屬於 JavaScript 循環迴圈](https://docs.google.com/presentation/d/1rdYS3Ia_4YOGSqcWmcT0l46ErwjviFgTtjG5xM9_sLw/edit)
    - [JavaScript 三代同堂](https://docs.google.com/presentation/d/1ckAiWwZOzsdQ4pkqlV1O9DUNdgg-UDJFMa2KKarrM_A/edit#slide=id.gd896f8a3e_0_1)
- Hackathon Taiwan x Taichung
    - [Webpack : Bundle Your Front-end Resources](https://slides.com/jigsawye/webpack-workshop)

## Contact

- jigsaw.ye@gmail.com
- [@GitHub](https://github.com/jigsawye)
- [@Facebook](https://facebook.com/jigsaw.ye)
- [@LinkedIn](https://www.linkedin.com/in/jigsawye)
`;

interface AboutPageProps {
  content: MdxRemote.Source;
}

const AboutPage: NextPage<AboutPageProps> = ({ content }) => (
  <>
    <MetaData title="About" uri="about" />

    <TitleSection>About</TitleSection>

    <Container>
      <ArticleContent>{hydrate(content)}</ArticleContent>
    </Container>
  </>
);

export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => ({
  props: {
    content: await renderToString(about),
  },
});
