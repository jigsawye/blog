import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { Fragment } from 'react';

export const metadata: Metadata = createMetadata({
  title: 'About',
  description:
    'My professional journey and experience with expertise in TypeScript, React, and modern web technologies.',
  openGraph: {
    images: '/og/about',
  },
  twitter: {
    images: '/og/about',
  },
});

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

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  /** For complex structure like Dcard */
  categories?: CategorySection[];
  /** For simple structure like Yoctol/ifalo */
  items?: SimpleItem[];
  isCurrent?: boolean;
}

const experiences: Experience[] = [
  {
    company: 'Dcard',
    role: 'Staff Frontend Engineer',
    period: 'Aug 2021 - Present',
    location: 'Taipei, Taiwan',
    description:
      "Taiwan's largest anonymous social media platform with millions of monthly active users.",
    isCurrent: true,
    categories: [
      {
        title: 'Architecture & Core Web Vitals (CWV)',
        items: [
          {
            title: 'Zero-Runtime CSS Strategy',
            description:
              'Led a multi-phase migration strategy to eliminate CSS-in-JS runtime overhead. Initially migrated from Styled-Components to Linaria, and subsequently architected and built a custom library, **@dcard/calico-css**, to further optimize compile times and ensure API compatibility. This initiative reduced CSS resource size by **10.2%** (unzip size by **78%**) and was crucial for improving TTFB.',
          },
          {
            title: 'Next.js Modernization & App Router',
            description:
              'Spearheaded the adoption of **React 18** and **Next.js App Router (Server Components)**. Orchestrated the complex migration of the OAuth portal—a critical infrastructure piece—from legacy architecture to the new stack, successfully reducing First Contentful Paint (FCP) by **29% (1.4s → 1.0s)** while maintaining 100% service availability.',
          },
          {
            title: 'SEO & Performance Engineering',
            description:
              'Driven by SEO targets, aggressively optimized bundle splitting and resource loading. Improved LCP (92% → **95%**) and FID (91% → **95%**) by removing heavy dependencies and implementing modern rendering patterns, directly contributing to organic traffic growth.',
          },
          {
            title: 'Technical Debt & Legacy Decoupling',
            description:
              'Executed a massive code cleanup initiative, including the complete deprecation of **Redux** in favor of modern server-state management (React Query/RSC). Removed thousands of lines of redundant code and deprecated legacy micro-services, significantly lowering maintenance costs and cognitive load for the team.',
          },
        ],
      },
      {
        title: 'Developer Experience (DX) & Infrastructure',
        items: [
          {
            title: 'CI/CD Revolution (Nx & pnpm)',
            description:
              'Transformed the frontend build infrastructure by adopting a **Monorepo** structure managed by **Nx** and switching the package manager to **pnpm**. Implemented intelligent computation caching and Docker layer caching, which slashed CircleCI credit usage by **70%** and reduced average pipeline duration by **~36% (from 22 mins to 14 mins)**.',
          },
          {
            title: 'High-Performance Build System (SWC)',
            description:
              'Modernized the build toolchain by replacing Babel with **SWC** (Rust-based compiler). This shift accelerated production build times from 50s to **35s** and improved local development server startup speed by **66% (180s → 60s)**, drastically improving daily developer productivity.',
          },
          {
            title: 'Resource Efficiency (Custom Containerization)',
            description:
              'Developed a custom containerization strategy and tool (`pack-standalone-output`) to optimize Next.js Docker image generation. This reduced image size and runtime memory footprint by **32% (3.8GB → 2.6GB)**, leading to significant cost savings in cloud infrastructure.',
          },
          {
            title: 'Internal Tooling Ecosystem',
            description:
              'Architected a suite of internal libraries (`@dcard/next-proxy`, `@dcard/next-csrf`, `@dcard/next-oauth`) to standardize security, authentication, and error handling patterns across multiple micro-frontends, reducing boilerplate and ensuring consistent security practices.',
          },
        ],
      },
      {
        title: 'Product Delivery & Business Impact',
        items: [
          {
            title: 'Monetization (Subscription System)',
            description:
              "Led the frontend architecture and implementation for Dcard's new **Subscription System**. Integrated complex payment flows with **Stripe**, managed cross-platform state synchronization, and successfully launched a key revenue-generating product vertical.",
          },
          {
            title: 'Creator Economy Features',
            description:
              'Empowered the creator ecosystem by delivering high-complexity features such as "**Personal Wall**," "**Pinned Comments**," and advanced "**Content Filtering**." These features enhanced creator-fan interaction and improved long-term user retention.',
          },
          {
            title: 'UX Architecture (Reveal Layout)',
            description:
              'Designed the "**Reveal Layout**" UI architecture, a highly reusable pattern for content reveals. This component became a standard across the codebase, significantly accelerating the development of subsequent features like post sharing and heavy-content views.',
          },
        ],
      },
      {
        title: 'Organization & Leadership',
        items: [
          {
            title: 'Hiring & Talent Development',
            description:
              'Served as a core member of the Hiring Committee, reshaping the interview process. Streamlined the intern recruitment pipeline (reviewing **72+ applications** in one week) and successfully mentored multiple interns and junior engineers, guiding them through their career paths to senior-level promotions.',
          },
          {
            title: 'Tech Branding & Evangelism',
            description:
              "Actively evangelized Dcard's engineering culture at major conferences (e.g., **SITCON**) and community meetups (**React.js TW**). Shared insights on large-scale architectural migrations (Linaria, pnpm), strengthening the company's employer brand in the tech community.",
          },
          {
            title: 'Process Innovation (AI Integration)',
            description:
              'Pioneered the integration of AI into the development workflow by implementing a **Claude-based Code Review bot** via GitHub Actions. This automated initial static analysis and code quality checks, allowing human reviewers to focus on high-level architecture and logic.',
          },
        ],
      },
    ],
  },
  {
    company: 'Yoctol Info. Inc.',
    role: 'Software Developer',
    period: 'Apr 2018 - Jul 2021',
    location: 'Taipei, Taiwan',
    description: 'A Chatbot/AI SaaS platform provider.',
    categories: [
      {
        title: 'Architecture & Developer Experience (DX)',
        items: [
          {
            title: 'Design System',
            description:
              'Established "**Tailor UI**" with designers to streamline component reuse across multiple products.',
          },
          {
            title: 'Testing & QA',
            description:
              "Implemented a dual-perspective testing strategy—writing frontend component tests from a user's perspective and backend integration tests from a developer's perspective.",
          },
          {
            title: 'Type Safety',
            description:
              'Integrated **graphql-codegen** to enforce strong typing across the frontend-backend boundary.',
          },
          {
            title: 'Dev Environment',
            description:
              'Optimized the client development server, reducing memory heap usage by **8%**.',
          },
        ],
      },
      {
        title: 'Performance Engineering',
        items: [
          {
            title: 'Load Time',
            description: 'Reduced first load size by **46%** via bundle optimization.',
          },
          {
            title: 'UX Responsiveness',
            description:
              'Implemented **optimistic UI updates** to ensure immediate visual feedback before server confirmation.',
          },
          {
            title: 'Optimization',
            description:
              'Utilized developer tools to identify and fix bottlenecks, speeding up event responses by up to **8.15x**.',
          },
        ],
      },
      {
        title: 'Feature & Stack',
        items: [
          {
            title: 'Animation',
            description:
              'Leveraged **react-spring** to create fluid, high-performance UI animations.',
          },
          {
            title: 'Stability',
            description: 'Integrated **Sentry** for automated real-time error tracking and triage.',
          },
          {
            title: 'Localization',
            description:
              'Implemented **i18n** workflows to support multi-language system requirements.',
          },
        ],
      },
    ],
  },
  {
    company: 'ifalo',
    role: 'Frontend Developer',
    period: 'Dec 2016 - Mar 2018',
    location: 'Taichung, Taiwan',
    description: 'A software development firm specializing in interactive web applications.',
    items: [
      {
        title: 'Complex UI Development',
        description:
          'Architected and built high-interactivity game interfaces from scratch using **Vue.js** and **Vuex**, managing complex state logic and animation frames.',
      },
      {
        title: 'Real-Time Systems',
        description:
          'Developed a low-latency customer service chat system leveraging **WebSocket** technology for real-time bi-directional communication.',
      },
      {
        title: 'Engineering Best Practices',
        description:
          'Introduced **CI/CD pipelines** to automate testing and deployment, reducing manual errors and release time.',
      },
      {
        title: 'Mentorship',
        description:
          'Provided technical guidance and mentorship to junior frontend developers, fostering a culture of code quality.',
      },
    ],
  },
];

/**
 * Parse markdown-style bold text (**text**) and inline code (`code`) into React elements
 */
function parseDescription(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      const codeText = part.slice(1, -1);
      return (
        <code key={index} className="text-fd-primary bg-fd-accent/50 px-1 py-0.5 rounded text-xs">
          {codeText}
        </code>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col bg-linear-to-b from-fd-background to-fd-accent/10 overflow-hidden">
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start gap-4 animate-fd-fade-up md:mb-16">
          <h1 className="text-balance text-4xl font-mono font-semibold tracking-tight text-fd-foreground sm:text-5xl lg:text-6xl">
            ABOUT
          </h1>
          <p className="text-balance text-base font-mono leading-relaxed text-fd-muted-foreground sm:text-lg">
            Staff Engineer specializing in scalable frontend architecture, performance engineering,
            and infrastructure modernization.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="flex flex-col">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.company}-${exp.role}`}
              className="group relative pl-8 mb-16 border-l-2 border-fd-border hover:border-fd-primary transition-colors duration-300 animate-fd-fade-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Timeline dot */}
              <div
                className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-fd-background border-2 transition-colors duration-300 ${
                  exp.isCurrent
                    ? 'border-fd-primary'
                    : 'border-fd-border group-hover:border-fd-primary'
                }`}
              />

              {/* Header */}
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-fd-foreground">{exp.company}</h3>
                <div className="flex flex-wrap items-center text-fd-muted-foreground text-sm mt-1 gap-x-4">
                  <span
                    className={`font-semibold ${exp.isCurrent ? 'text-fd-primary' : 'text-fd-foreground'}`}
                  >
                    {exp.role}
                  </span>
                  <span>{exp.period}</span>
                  <span className="hidden sm:inline text-fd-muted-foreground/30">|</span>
                  <span>{exp.location}</span>
                </div>
              </div>

              {/* Company Description */}
              <p className="text-fd-muted-foreground text-sm italic mb-6">{exp.description}</p>

              {/* Categories (for Dcard-style) */}
              {exp.categories && (
                <div className="space-y-8">
                  {exp.categories.map((category, catIndex) => (
                    <div key={catIndex}>
                      {/* Category Title */}
                      <h4 className="text-sm font-bold text-fd-primary uppercase tracking-wider mb-3">
                        {category.title}
                      </h4>

                      {/* Bullet Items */}
                      <ul className="space-y-3 pl-4">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="relative">
                            <span className="absolute -left-4 top-2 h-1.5 w-1.5 rounded-full bg-fd-muted-foreground/30" />
                            <p className="text-fd-muted-foreground leading-relaxed text-sm">
                              <strong className="text-fd-foreground">{item.title}:</strong>{' '}
                              {parseDescription(item.description)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* Simple Items (for Yoctol/ifalo-style) */}
              {exp.items && (
                <div className="space-y-4">
                  {exp.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h4 className="font-bold text-fd-foreground text-sm uppercase tracking-wide mb-1">
                        {item.title}
                      </h4>
                      <p className="text-fd-muted-foreground leading-relaxed text-sm">
                        {parseDescription(item.description)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
