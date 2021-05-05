import { GetStaticProps, NextPage } from 'next';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';

import { MdxRemote } from 'next-mdx-remote/types';
import Link from 'next/link';
import { ArticleContent } from '../components/Article';
import { Container, TitleSection } from '../components/common';
import MetaData from '../components/MetaData';

const about = `
- **<a href="https://www.cakeresume.com/s--3qgnC7TqWdPBhxH-FvJl_g--/jigsawye" target="_blank">線上履歷</a>**
- **[PDF 履歷下載](https://www.cakeresume.com/pdf/s--I0iaXf4MZ8vlfttiVsVK0w--/ZOLQL.pdf)**

## 自介

- 認為「在花費的時間與程式碼品質之間，取得最佳平衡」是資深工程師的核心價值。
- 時常關注套件改版，詳閱 release note。
- 看到新奇的套件或 UI Framework，會看 source code 來研究如何實作。
- 喜歡讀一些新功能的 RFC，如 TC39、React RFCs 等等。
- 偶爾撰寫技術文章，詳見<Link href="/" passHref><a>本站</a></Link>。
- 認同並遵守<a href="https://github.com/sparanoid/chinese-copywriting-guidelines" target="_blank">中文文案排版指北</a>。
- 10 歲立志成為工程師，11 歲架設仙境傳說私人伺服器與同學遊玩。

## 期望產業類型

- 以產品開發為主，排除博弈及接案公司。
- 技術部分以 React 為優先，不排斥使用其他框架。

## 期望待遇

年薪新台幣 150 萬元以上

預計上工日：2021 年 8 月 2 日（一）

## 工作地點

台北市

## 其他

英語的聽、說能力不佳，即時溝通有困難，期望就職環境以中文溝通。

## 聯絡方式

- jigsaw.ye@gmail.com
- <a href="https://www.linkedin.com/in/jigsawye" target="_blank">LinkedIn</a>
`;

interface ResumePageProps {
  content: MdxRemote.Source;
}

const ResumePage: NextPage<ResumePageProps> = ({ content }) => (
  <>
    <MetaData
      title="[求職] 資深前端工程師"
      excerpt={content.renderedOutput.replace(/<[^>]*>/g, '')}
      uri="resume"
    />

    <TitleSection>[求職] 資深前端工程師</TitleSection>

    <Container>
      <ArticleContent>
        {hydrate(content, {
          components: {
            Link,
          },
        })}
      </ArticleContent>
    </Container>
  </>
);

export default ResumePage;

export const getStaticProps: GetStaticProps<ResumePageProps> = async () => ({
  props: {
    content: await renderToString(about),
  },
});
