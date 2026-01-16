import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { InteractiveCard } from './page.client';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  description:
    'Building digital experiences, curating fits, and capturing moments. Staff Frontend Engineer at Dcard.',
  openGraph: {
    images: '/banner.png',
  },
});

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col bg-linear-to-b from-fd-background to-fd-accent/10 overflow-hidden">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-1 flex-col items-center justify-center gap-8 px-6 py-10 md:flex-row md:gap-10">
        <div className="flex w-full max-w-xl flex-1 flex-col items-start gap-6 animate-fd-fade-up md:max-w-xl">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-fd-foreground sm:text-5xl lg:text-6xl">
              Hi, I&apos;m Evan.
            </h1>
            <p className="mt-4 text-balance text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
              Building digital experiences, curating fits, and capturing moments — usually in that
              order.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground shadow-inner shadow-fd-background/20 transition-all hover:scale-105 hover:bg-fd-primary/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:px-6 sm:py-3 sm:text-base"
              >
                Read the blog
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-medium text-fd-muted-foreground underline-offset-4 transition-colors hover:text-fd-foreground hover:underline sm:text-base"
              >
                Skim latest posts
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/jigsawye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md p-2 text-fd-muted-foreground transition-all hover:scale-110 hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/jigsawye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md p-2 text-fd-muted-foreground transition-all hover:scale-110 hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com/jigsaw.ye"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md p-2 text-fd-muted-foreground transition-all hover:scale-110 hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-1 justify-center md:mt-0">
          <div
            className="relative h-72 w-full max-w-md animate-fd-slide-in-right sm:h-64"
            style={{ perspective: '1000px' }}
          >
            <div className="fd-orbit fd-orbit--outer" />
            <div className="fd-orbit fd-orbit--inner" />

            <InteractiveCard>
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-fd-border/50 bg-fd-muted/20 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-fd-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                    dev
                  </span>
                  <span className="text-fd-muted-foreground/50">·</span>
                  <span>bun</span>
                </div>
              </div>

              {/* Tab bar */}
              <div className="flex border-b border-fd-border/50 bg-fd-muted/10">
                <div className="flex items-center gap-2 border-r border-fd-border/50 bg-fd-background/60 px-3 py-2 text-[11px] font-mono text-fd-foreground">
                  <svg className="h-3 w-3 text-[#3178c6]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
                  </svg>
                  <span>profile.ts</span>
                </div>
              </div>

              {/* Code content */}
              <div className="flex-1 overflow-auto bg-fd-background/60 p-4">
                <div className="space-y-1 text-[12px] font-mono leading-relaxed">
                  <div className="flex gap-3">
                    <span className="select-none text-fd-muted-foreground/40">1</span>
                    <p>
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">export</span>{' '}
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">const</span>{' '}
                      <span className="text-[#0550ae] dark:text-[#79c0ff]">name</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">=</span>{' '}
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">&quot;Evan&quot;</span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">;</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="select-none text-fd-muted-foreground/40">2</span>
                    <p>
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">export</span>{' '}
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">const</span>{' '}
                      <span className="text-[#0550ae] dark:text-[#79c0ff]">job</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">=</span>{' '}
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">
                        &quot;building stuff&quot;
                      </span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">;</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="select-none text-fd-muted-foreground/40">3</span>
                    <p>
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">export</span>{' '}
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">const</span>{' '}
                      <span className="text-[#0550ae] dark:text-[#79c0ff]">hobbies</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">=</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">[</span>
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">
                        &quot;clean fit&quot;
                      </span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">,</span>{' '}
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">
                        &quot;golden hour&quot;
                      </span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">];</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="select-none text-fd-muted-foreground/40">4</span>
                    <p>
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">export</span>{' '}
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">const</span>{' '}
                      <span className="text-[#0550ae] dark:text-[#79c0ff]">tools</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">=</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">[</span>
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">
                        &quot;MBP M3 Pro&quot;
                      </span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">,</span>{' '}
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">
                        &quot;Leica Q3 43&quot;
                      </span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">];</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="select-none text-fd-muted-foreground/40">5</span>
                    <p>
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">export</span>{' '}
                      <span className="text-[#cf222e] dark:text-[#ff7b72]">const</span>{' '}
                      <span className="text-[#0550ae] dark:text-[#79c0ff]">status</span>{' '}
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">=</span>{' '}
                      <span className="text-[#0a3069] dark:text-[#a5d6ff]">
                        &quot;being a 10x engineer&quot;
                      </span>
                      <span className="text-[#24292f] dark:text-[#c9d1d9]">;</span>
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <span className="select-none text-fd-muted-foreground/40">6</span>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </div>
        </div>
      </section>
    </main>
  );
}
