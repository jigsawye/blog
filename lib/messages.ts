import type { Locale } from './i18n';

export const messages = {
  en: {
    blog: 'Blog',
    blogHeading: 'BLOG',
    blogDescription: 'Thoughts on code, design, and everything in between.',
    about: 'About',
    aboutHeading: 'ABOUT',
    aboutDescription:
      'Staff Frontend Engineer building frontend platforms, improving product outcomes, and enabling teams through design systems and AI workflows.',
    greeting: "Hi, I'm Evan.",
    introduction:
      'Building digital experiences, curating fits, and capturing moments — usually in that order.',
    homeDescription:
      'Building digital experiences, curating fits, and capturing moments. Staff Frontend Engineer at Dcard.',
    readBlog: 'Read the blog',
    aboutMe: 'About me',
    experience: 'Experience',
    published: 'Published',
    back: 'Back to blog',
    share: 'Share post',
    copied: 'Copied URL',
    notFound: 'Page not found',
    notFoundDescription: 'This page does not exist or is no longer available.',
    home: 'Back to home',
  },
  'zh-TW': {
    blog: '文章',
    blogHeading: '文章',
    blogDescription: '記錄程式、設計，以及生活中的各種想法。',
    about: '關於我',
    aboutHeading: '關於我',
    aboutDescription:
      'Staff 前端工程師，專注前端平台與產品成果，透過 Design System 與 AI 工作流程提升團隊的產出能力。',
    greeting: '嗨，我是 Evan。',
    introduction: '打造數位體驗、研究穿搭、用相機記錄生活，通常照這個順序。',
    homeDescription: '打造數位體驗、研究穿搭、用相機記錄生活。現任 Dcard Staff 前端工程師。',
    readBlog: '閱讀文章',
    aboutMe: '認識我',
    experience: '工作經歷',
    published: '發布日期',
    back: '返回文章列表',
    share: '分享文章',
    copied: '已複製網址',
    notFound: '找不到頁面',
    notFoundDescription: '這個頁面不存在，或已經移除。',
    home: '返回首頁',
  },
} satisfies Record<Locale, Record<string, string>>;
