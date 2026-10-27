interface BulletItem {
  title: string;
  /** Use **text** for bold formatting */
  description: string;
}

interface CategorySection {
  title: string;
  items: BulletItem[];
}

interface SimpleItem {
  title: string;
  /** Use **text** for bold formatting */
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  /** For complex structure like Dcard */
  categories?: CategorySection[];
  /** For simple structure like Yoctol/ifalo */
  items?: SimpleItem[];
  isCurrent?: boolean;
}

export const experiences: Experience[] = [
  {
    company: 'Dcard',
    role: 'Staff Frontend Engineer',
    period: 'Aug 2021 - Present',
    location: 'Taipei, Taiwan',
    isCurrent: true,
    categories: [
      {
        title: 'Frontend Platform',
        items: [
          {
            title: 'CSS Architecture',
            description:
              'Evolved the CSS architecture: **styled-components → Linaria → Calico (JavaScript) → Calico (Rust)**. Used **AI collaboration** to rewrite the compiler in Rust with **oxc** and **NAPI-RS**.',
          },
          {
            title: 'Team Toolchain',
            description:
              'Moved proven experiments into team-wide use. Adopted **Vitest**, **Turborepo**, **oxlint**, and **oxfmt**, alongside React 19, Next.js 16, and TypeScript 7.',
          },
          {
            title: 'Build Performance',
            description:
              'Led the **Turbopack** migration, cutting main-site builds from **4m 35s to 1m 22s**. Removed webpack, Babel, and roughly **30,000 lines** of legacy code. Added automatic bundle comparisons to every pull request.',
          },
        ],
      },
      {
        title: 'Product & Business Impact',
        items: [
          {
            title: 'Product Definition',
            description:
              'Used traffic and revenue data to challenge advertising assumptions, correct measurement errors, and reset priorities. Owned product requirements and Web monetization engineering.',
          },
          {
            title: 'Advertising Platform',
            description:
              'Built shared ad delivery, header bidding, and fallback mechanisms. Reduced policy violations by nearly **60%** and raised compliant serving to **98%**.',
          },
          {
            title: 'Product Delivery',
            description:
              'Delivered search experiments that increased recommendation CTR from **0.52% to 4.32%** for external visitors. Delivered Web identity features and professional and school mentions.',
          },
          {
            title: 'Operations Tools',
            description:
              'Built reusable campaign controls that let operations launch campaigns without native app releases. Replaced manual database changes with verification and campaign management consoles.',
          },
          {
            title: 'Creative Studio',
            description:
              'Defined requirements and built an ad creative studio. Enabled sales, design, and operations to produce compliant creatives independently.',
          },
        ],
      },
      {
        title: 'Architecture & Reliability',
        items: [
          {
            title: 'App Router & State',
            description:
              'Shipped the **Pages Router to App Router** migration to improve UX. Unified attribution across routers and replaced Redux with **React Query** and **Jotai**.',
          },
          {
            title: 'Cross-Platform Delivery',
            description:
              'Coordinated article view counts across API, Web, iOS, and Android. Contributed native code directly and worked with platform engineers on review.',
          },
          {
            title: 'Production Safeguards',
            description:
              'Strengthened cache, authentication, and privacy boundaries. Shipped a critical security patch the next morning and restored nightly production smoke tests with **15 passing scenarios**.',
          },
        ],
      },
      {
        title: 'Design Systems & AI Collaboration',
        items: [
          {
            title: 'Cross-Platform Design System',
            description:
              'Defined the monorepo architecture, **Rust token generator**, and component recipe generation. Aligned Web, iOS, Android, and design on shared component specifications.',
          },
          {
            title: 'Design to Production',
            description:
              'Built AI prototype, visual editing, preview, and deployment workflows with controlled editing boundaries. Enabled designers to open **39 pull requests** and move a campaign prototype into production.',
          },
          {
            title: 'AI Quality & Enablement',
            description:
              'Established shared AI workflows for engineering, design, product, and QA. Used **characterization tests**, independent reviews, and separate verifiers to validate large refactors and production changes.',
          },
        ],
      },
    ],
  },
  {
    company: 'Dcard',
    role: 'Senior Frontend Developer',
    period: 'Aug 2021 - Sep 2022',
    location: 'Taipei, Taiwan',
    items: [
      {
        title: 'Architecture & Delivery',
        description:
          'Balanced high-paced feature delivery with **critical architectural initiatives** (e.g., React 18 upgrade, early CI optimizations).',
      },
      {
        title: 'Product Feature Parity',
        description:
          'Bridged the gap between App and Web by delivering complex features including **Direct Messages**, **Stickers**, and Global Blocking systems.',
      },
      {
        title: 'Talent Acquisition',
        description:
          'Revamped the intern recruitment process, reviewing **70+ applications** in one week and mentoring selected candidates.',
      },
      {
        title: 'Operational Efficiency',
        description:
          'Built internal consoles for BD/CS teams (Keyword Management, NSFW moderation), reducing manual operational overhead.',
      },
    ],
  },
  {
    company: 'Yoctol Info. Inc.',
    role: 'Software Developer',
    period: 'Apr 2018 - Jul 2021',
    location: 'Taipei, Taiwan',
    items: [
      {
        title: 'Design System',
        description:
          'Built "**Tailor UI**," a cross-product design system that standardized UI consistency.',
      },
      {
        title: 'TypeScript',
        description: 'Led the adoption of TypeScript, achieving **89%** frontend type coverage.',
      },
      {
        title: 'Performance',
        description:
          'Improved event response speed by **8.15x** and reduced initial load size by **46%**.',
      },
      {
        title: 'Full Stack',
        description:
          'Handled end-to-end development including GraphQL schema design and backend resolvers.',
      },
    ],
  },
  {
    company: 'ifalo',
    role: 'Frontend Developer',
    period: 'Dec 2016 - Mar 2018',
    location: 'Taichung, Taiwan',
    items: [
      {
        title: 'Web Development',
        description:
          'Built interactive game interfaces and real-time chat systems using **Vue.js** and **WebSocket**.',
      },
      {
        title: 'DevOps',
        description: 'Introduced CI/CD pipelines to automate testing and deployment workflows.',
      },
    ],
  },
];
