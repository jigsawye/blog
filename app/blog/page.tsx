import Link from 'next/link';
import { blog } from '@/lib/source';
import { PathUtils } from 'fumadocs-core/source';
import { createMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Blog',
  description: 'Thoughts on code, design, and everything in between.',
});

function getName(path: string) {
  return PathUtils.basename(path, PathUtils.extname(path));
}

export default function Page() {
  const posts = [...blog.getPages()].sort(
    (a, b) =>
      new Date(b.data.date ?? getName(b.path)).getTime() -
      new Date(a.data.date ?? getName(a.path)).getTime(),
  );

  return (
    <main className="flex flex-1 flex-col bg-linear-to-b from-fd-background to-fd-accent/10 overflow-hidden">
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-12 flex flex-col items-start gap-4 animate-fd-fade-up md:mb-16">
          <h1 className="text-balance text-4xl font-mono font-semibold tracking-tight text-fd-foreground sm:text-5xl lg:text-6xl">
            BLOG
          </h1>
          <p className="text-balance text-base font-mono leading-relaxed text-fd-muted-foreground sm:text-lg">
            Thoughts on code, design, and everything in between.
          </p>
        </div>

        {/* Posts List */}
        <div className="flex flex-col gap-3">
          {posts.map((post, index) => (
            <Link
              key={post.url}
              href={post.url}
              className="flex flex-col md:flex-row md:items-center md:justify-between bg-fd-card rounded-xl border shadow-sm p-5 md:p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:bg-fd-accent hover:text-fd-accent-foreground animate-fd-fade-up"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex-1">
                <p className="font-medium text-lg mb-1">{post.data.title}</p>
                <p className="text-sm text-fd-muted-foreground">{post.data.description}</p>
              </div>

              <p className="mt-3 md:mt-0 md:ml-6 text-xs font-mono text-fd-muted-foreground whitespace-nowrap">
                {new Date(post.data.date ?? getName(post.path)).toDateString()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
