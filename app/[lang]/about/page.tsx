import { createLocalizedMetadata } from '@/lib/metadata';
import { messages } from '@/lib/messages';
import { experiences } from '@/lib/experience';
import type { Locale } from '@/lib/i18n';
import { Fragment } from 'react';
import { ProjectCard } from '@/components/project-card';
import { zawa } from '@/lib/projects';

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const text = messages[lang];
  return createLocalizedMetadata(lang, '/about', {
    title: text.about,
    description: text.aboutDescription,
    openGraph: { images: `/og/${lang}/about` },
    twitter: { images: `/og/${lang}/about` },
  });
}

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

export default async function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const text = messages[lang];
  return (
    <main className="flex flex-1 flex-col bg-linear-to-b from-fd-background to-fd-accent/10 overflow-hidden">
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start gap-4 animate-fd-fade-up md:mb-16">
          <h1 className="text-balance text-4xl font-mono font-semibold tracking-tight text-fd-foreground sm:text-5xl lg:text-6xl">
            {text.aboutHeading}
          </h1>
          <p className="text-balance text-base font-mono leading-relaxed text-fd-muted-foreground sm:text-lg">
            {text.aboutDescription}
          </p>
        </div>

        <section aria-labelledby="side-projects-heading" className="mb-8 md:mb-10">
          <h2
            id="side-projects-heading"
            className="mb-4 text-sm font-bold tracking-wider text-fd-primary uppercase"
          >
            {zawa.translations[lang].heading}
          </h2>
          <ProjectCard locale={lang} />
        </section>

        {/* Experience Timeline */}
        <h2 className="mb-6 text-sm font-bold tracking-wider text-fd-primary uppercase">
          {text.experience}
        </h2>
        <div className="flex flex-col">
          {experiences[lang].map((exp, index) => (
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
