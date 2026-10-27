import type { Experience } from './experience.en';

export const experiences: Experience[] = [
  {
    company: 'Dcard',
    role: 'Staff 前端工程師',
    period: '2021 年 8 月至今',
    location: '台灣台北',
    isCurrent: true,
    categories: [
      {
        title: '前端平台',
        items: [
          {
            title: 'CSS 架構演進',
            description:
              '推進 **styled-components → Linaria → Calico（JavaScript）→ Calico（Rust）** 的持續演進。透過 **AI 協作**，以 **oxc** 與 **NAPI-RS** 完成 Rust 編譯器重寫。',
          },
          {
            title: '團隊工具鏈換代',
            description:
              '將驗證過的 POC 推進到全團隊使用。導入 **Vitest**、**Turborepo**、**oxlint** 與 **oxfmt**，並完成 React 19、Next.js 16 與 TypeScript 7 升級。',
          },
          {
            title: '建置效能',
            description:
              '主導 **Turbopack** 遷移，將主站建置從 **4 分 35 秒縮短至 1 分 22 秒**。移除 webpack、Babel 與約 **3 萬行**舊程式碼，並讓每支 PR 自動附上 bundle 差異。',
          },
        ],
      },
      {
        title: '產品與商業成果',
        items: [
          {
            title: '產品定義',
            description:
              '用流量與營收資料推翻廣告假設、修正量測錯誤，重新排列工作優先順序。負責產品需求定義與 Web 變現的技術方向。',
          },
          {
            title: '廣告平台',
            description:
              '建立共用廣告投放、header bidding 與補量機制。將政策違規降低近 **60%**，正常投放比例提升至 **98%**。',
          },
          {
            title: '產品交付',
            description:
              '完成搜尋實驗，將外部訪客的推薦點擊率從 **0.52% 提升至 4.32%**。完成 Web 職業身份，以及職業與學校提及功能。',
          },
          {
            title: '營運自助工具',
            description:
              '建立可重用的活動控制機制，讓營運不必等待 App 發版就能上線活動。建立證件審核與活動管理後台，取代每次請工程師手動修改資料庫的流程。',
          },
          {
            title: '廣告素材工具',
            description:
              '定義需求並打造廣告素材工作台，讓業務、設計與營運能獨立產出符合規範的廣告素材。',
          },
        ],
      },
      {
        title: '架構與穩定性',
        items: [
          {
            title: 'App Router 與狀態管理',
            description:
              '完成並上線 **Pages Router → App Router** 遷移，改善使用者體驗。整合新舊 router 的歸因機制，並以 **React Query** 與 **Jotai** 取代 Redux。',
          },
          {
            title: '跨平台推進',
            description:
              '協調 API、Web、iOS 與 Android 的文章曝光數功能。直接修改原生端程式碼，再與各平台工程師共同審查。',
          },
          {
            title: '正式環境防護',
            description:
              '強化快取、驗證與隱私邊界。深夜評估重大安全漏洞，隔天上午完成修補上線，並恢復 **15 個案例全數通過**的每日正式環境冒煙測試。',
          },
        ],
      },
      {
        title: 'Design System 與 AI 協作',
        items: [
          {
            title: '跨平台 Design System',
            description:
              '定義 monorepo 架構、**Rust token generator** 與 component recipe 自動產生機制。協調 Web、iOS、Android 與設計，建立共用的元件規格。',
          },
          {
            title: '從設計到正式產品',
            description:
              '建立 AI prototype、視覺編輯、預覽與部署流程，並限制可修改的檔案範圍。讓設計師完成 **39 支 PR**，並將活動原型帶入正式產品。',
          },
          {
            title: 'AI 品質與團隊賦能',
            description:
              '建立工程、設計、PM 與 QA 共用的 AI 工作流程。運用 **characterization tests**、獨立 review 與驗收者，驗證大型重構及正式環境變更的品質。',
          },
        ],
      },
    ],
  },
  {
    company: 'Dcard',
    role: '資深前端工程師',
    period: '2021 年 8 月－2022 年 9 月',
    location: '台灣台北',
    items: [
      {
        title: '架構與交付',
        description: '兼顧快速的功能交付與**關鍵架構改善**，包含 React 18 升級及早期 CI 優化。',
      },
      {
        title: 'App 與 Web 功能整合',
        description: '完成**私訊**、**貼圖**與全站封鎖等功能，縮小 App 與 Web 的功能差距。',
      },
      {
        title: '人才招募',
        description: '改善實習生招募流程，一週內審查 **70 多份申請**，並指導錄取的成員。',
      },
      {
        title: '營運效率',
        description: '為 BD 與 CS 建立關鍵字管理、NSFW 審核等內部後台，減少人工操作。',
      },
    ],
  },
  {
    company: 'Yoctol Info. Inc.',
    role: '軟體工程師',
    period: '2018 年 4 月－2021 年 7 月',
    location: '台灣台北',
    items: [
      {
        title: 'Design System',
        description: '建立跨產品的 **Tailor UI** Design System，統一介面與元件。',
      },
      {
        title: 'TypeScript',
        description: '主導 TypeScript 導入，讓前端型別覆蓋率達到 **89%**。',
      },
      {
        title: '效能改善',
        description: '將事件回應速度提升 **8.15 倍**，初始載入大小減少 **46%**。',
      },
      {
        title: '全端開發',
        description: '負責從 GraphQL schema 設計到後端 resolver 的完整開發流程。',
      },
    ],
  },
  {
    company: 'ifalo',
    role: '前端工程師',
    period: '2016 年 12 月－2018 年 3 月',
    location: '台灣台中',
    items: [
      {
        title: 'Web 開發',
        description: '使用 **Vue.js** 與 **WebSocket**，建立互動遊戲介面及即時聊天系統。',
      },
      {
        title: 'DevOps',
        description: '導入 CI/CD，自動化測試與部署流程。',
      },
    ],
  },
];
