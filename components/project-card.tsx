import { ArrowUpRight } from 'lucide-react';
import { zawa } from '@/lib/projects';
import type { Locale } from '@/lib/i18n';

export function ProjectCard({ locale }: { locale: Locale }) {
  const text = zawa.translations[locale];

  return (
    <a
      href={zawa.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/project flex items-start justify-between gap-4 border-t border-fd-border py-4 transition-colors hover:border-fd-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
    >
      <div className="max-w-3xl">
        <h3 className="text-base font-semibold tracking-tight">{zawa.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
          {text.description} {text.role}
        </p>
      </div>
      <ArrowUpRight className="mt-1 size-4 shrink-0 text-fd-muted-foreground" aria-hidden="true" />
    </a>
  );
}
