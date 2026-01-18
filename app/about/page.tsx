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
  /** For complex structure like Dcard */
  categories?: CategorySection[];
  /** For simple structure like Yoctol/ifalo */
  items?: SimpleItem[];
  isCurrent?: boolean;
}

const experiences: Experience[] = [
  {
    company: 'Dcard',
    role: 'Staff Engineer',
    period: 'Aug 2021 - Present',
    location: 'Taipei, Taiwan',

    isCurrent: true,
    categories: [
      {
        title: 'Architecture & Performance',
        items: [
          {
            title: 'Zero-Runtime CSS',
            description:
              'Architected a custom library to replace runtime CSS-in-JS. Reduced CSS size by **78%** and eliminated runtime overhead.',
          },
          {
            title: 'Next.js App Router',
            description:
              'Migrated to React 18 & App Router. Optimized critical portals (OAuth), reducing FCP by **29%** (1.4s → 1.0s).',
          },
          {
            title: 'SEO Engineering',
            description:
              'Achieved **95%+** LCP/FID via aggressive bundle splitting and removing legacy deps (Redux).',
          },
          {
            title: 'Legacy Decoupling',
            description:
              'Deprecated legacy micro-services and migrated state management to React Query, lowering maintenance costs.',
          },
        ],
      },
      {
        title: 'Developer Experience (DX) & Infrastructure',
        items: [
          {
            title: 'CI/CD Revolution',
            description:
              'Implemented **Nx** monorepo and **pnpm**. Reduced pipeline duration by **36%** (22m → 14m) and CircleCI usage by **70%**.',
          },
          {
            title: 'Build Optimization',
            description:
              'Replaced Babel with **SWC (Rust)**, accelerating production builds by **30%** and local startup speed by **66%**.',
          },
          {
            title: 'Resource Efficiency',
            description:
              'Developed custom containerization tools to optimize Docker images, reducing size and memory footprint by **32%**.',
          },
          {
            title: 'Internal Tooling',
            description:
              'Built a suite of standard libraries (Proxy, CSRF, OAuth) to unify security patterns across micro-frontends.',
          },
        ],
      },
      {
        title: 'Product & Leadership',
        items: [
          {
            title: 'Monetization',
            description:
              'Led frontend implementation of the **Subscription System** (Stripe), successfully launching a key revenue stream.',
          },
          {
            title: 'Product Features',
            description:
              'Delivered high-complexity features for the Creator Economy, including "Personal Wall" and advanced content filtering.',
          },
          {
            title: 'Process Innovation',
            description:
              'Pioneered **AI-assisted Code Review** using Claude and GitHub Actions to automate code quality checks.',
          },
          {
            title: 'Mentorship',
            description:
              'Streamlined intern recruitment (70+ candidates screened) and mentored junior engineers to senior-level promotions.',
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
                <div className="flex flex-wrap items-center text-fd-foreground/60 text-sm mt-1 gap-x-4">
                  <span
                    className={`font-semibold ${exp.isCurrent ? 'text-fd-primary' : 'text-fd-muted-foreground'}`}
                  >
                    {exp.role}
                  </span>
                  <span>{exp.period}</span>
                  <span className="hidden sm:inline text-fd-muted-foreground/30">|</span>
                  <span>{exp.location}</span>
                </div>
              </div>

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
                            <span className="absolute -left-4 top-2 h-1.5 w-1.5 rounded-full bg-fd-primary/60" />
                            <p className="text-fd-foreground/80 leading-relaxed text-sm">
                              <strong className="text-fd-foreground font-semibold">
                                {item.title}:
                              </strong>{' '}
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
                      <p className="text-fd-foreground/80 leading-relaxed text-sm">
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
