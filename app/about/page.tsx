import type { Metadata } from 'next';
import { MapPin } from 'lucide-react';
import { createMetadata } from '@/lib/metadata';

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

interface Experience {
  company: string;
  role: string;
  period: string;
  duration: string;
  location: string;
  highlights?: string[];
}

const experiences: Experience[] = [
  {
    company: 'Dcard',
    role: 'Staff Frontend Engineer',
    period: 'Sep 2022 - Present',
    duration: '3 yrs 5 mos',
    location: 'Taipei, Taiwan',
  },
  {
    company: 'Dcard',
    role: 'Senior Frontend Engineer',
    period: 'Aug 2021 - Sep 2022',
    duration: '1 yr 2 mos',
    location: 'Taipei, Taiwan',
  },
  {
    company: 'Yoctol Info. Inc.',
    role: 'Software Developer',
    period: 'Apr 2018 - Jul 2021',
    duration: '3 yrs 4 mos',
    location: 'Taipei, Taiwan',
    highlights: [
      'Created a design system: Tailor UI',
      'Cooperated with UI designer to establish a design system for multiple products.',
      'Shared the experience in the Taichung front-end community.',
      'Enhanced code quality and sped up development process',
      '- Progressively adopted TypeScript. Achieved a front-end coverage rate of 89% and a total coverage rate of 63%.',
      "- Wrote front-end component tests from a user's perspective. Wrote back-end integration tests from a developer's perspective.",
      '- Imported graphql-codegen to use strong typing in front-end.',
      '- Reduced the memory heap size of the client dev server by 8%.',
      'Resolved front-end performance bottleneck',
      'Made good use of developer tools to increase event response speed up to 8.15x.',
      'Improved user experience',
      '- Reduced the first load size by 46%.',
      '- Implemented optimistic response to perform UI reactions before data return.',
      '- Used react-spring to present animations.',
      '- Managed Sentry to automatically report errors.',
      '- Imported i18n multi-language systems.',
      'Independently developed features from back-end to front-end',
      '- Planned DB migration and GraphQL schema according to spec, and implemented back-end resolver.',
    ],
  },
  {
    company: 'ifalo',
    role: 'Frontend Developer',
    period: 'Dec 2016 - Mar 2018',
    duration: '1 yr 4 mos',
    location: 'Taichung, Taiwan',
    highlights: [
      '• Built a complex game interface from front-end architecture design to feature implementation using Vue and Vuex.',
      '• Developed a real-time customer service system using WebSocket.',
      '• Introduced CI/CD to automate testing and deployment.',
      '• Mentored other front-end developers',
    ],
  },
];

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
            My professional journey and experience.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-fd-primary/50 via-fd-primary/30 to-transparent hidden md:block" />

          <div className="flex flex-col gap-8 md:gap-10">
            {experiences.map((exp, index) => (
              <div
                key={`${exp.company}-${exp.role}-${index}`}
                className="relative group animate-fd-fade-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Timeline dot - hidden on mobile */}
                <div className="absolute left-0 top-8 hidden md:block">
                  <div className="relative -left-[5px]">
                    <div className="h-3 w-3 rounded-full bg-fd-primary ring-4 ring-fd-background transition-all group-hover:scale-125 group-hover:ring-fd-primary/20" />
                  </div>
                </div>

                {/* Card */}
                <div className="md:ml-8 bg-gradient-to-br from-fd-card/80 to-fd-card/40 backdrop-blur-sm rounded-2xl border border-fd-border/50 p-6 md:p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:border-fd-primary/30 hover:bg-fd-card/90">
                  {/* Company and Role */}
                  <div className="flex flex-col gap-3 mb-5">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-fd-foreground mb-2 group-hover:text-fd-primary transition-colors">
                          {exp.company}
                        </h2>
                        <p className="text-lg md:text-xl text-fd-primary/80 font-medium">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    {/* Period and Location */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-fd-muted-foreground">
                      <span className="font-mono">
                        {exp.period} · {exp.duration}
                      </span>
                      <span className="hidden sm:inline text-fd-muted-foreground/30">•</span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {exp.highlights && (
                    <div className="mt-6 pt-6 border-t border-fd-border/50">
                      <div className="space-y-3 text-sm text-fd-muted-foreground leading-relaxed">
                        {exp.highlights.map((highlight, idx) => {
                          const isSubItem = highlight.startsWith('-');
                          const isBulletItem = highlight.startsWith('•');
                          const cleanText = highlight.replace(/^[-•]\s*/, '');

                          return (
                            <div
                              key={idx}
                              className={`${
                                isSubItem
                                  ? 'ml-4 pl-4 border-l-2 border-fd-border/30'
                                  : isBulletItem
                                    ? 'flex gap-2'
                                    : 'font-medium text-fd-foreground'
                              }`}
                            >
                              {isBulletItem && <span className="text-fd-primary mt-0.5">•</span>}
                              <span className="leading-relaxed">{cleanText}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
