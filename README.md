# JIGSAWYE

A Next.js site built with Fumadocs. It supports Traditional Chinese (`zh-TW`) and English (`en`).

## Development

```bash
bun install --frozen-lockfile
bun run dev
```

Open [localhost:3000](http://localhost:3000).

## Languages

| Content | Traditional Chinese | English           |
| ------- | ------------------- | ----------------- |
| Home    | `/`                 | `/en`             |
| About   | `/about`            | `/en/about`       |
| Blog    | `/blog`             | `/en/blog`        |
| Article | `/blog/{slug}`      | `/en/blog/{slug}` |

The home introduction stays in English for both languages. Navigation follows the selected language.

The Fumadocs language menu keeps the current page and stores the selected language in an `FD_LOCALE` cookie.

Configure languages in `lib/i18n.ts`. Keep interface text in `lib/messages.ts` and experience translations in `lib/experience.*.ts`.

Keep Chinese articles in `content/blog/{slug}.mdx`. Add each English translation as `{slug}.en.mdx`, with the same publication date and code examples.

Missing translations do not fall back to another language. Each page includes language alternates and a localized OG image.

## Validation

```bash
bun run types:check
bun run lint
bun run format:check
bun run check:i18n
bun run build
bun run check:build
```

`check:i18n` checks routing, language preferences, translation coverage, and article examples.

`check:build` checks generated pages, language alternates, and WebP OG images.

With Orca and the development server running, check language switching in a browser:

```bash
bun run check:browser
```

This check catches React script warnings during language changes. It also checks theme initialization and URL parameters.

Language changes load a new document so the theme initialization script can run correctly.

## Production

```bash
bun run build
bun run start
```

Run a Next.js server to support the language proxy. Static file hosting does not run this proxy.
