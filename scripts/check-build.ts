import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { i18n } from '../lib/i18n';
import { messages } from '../lib/messages';
import { zawa } from '../lib/projects';

const directory = '.next/server/app/og';
const files = await readdir(directory, { recursive: true });
const images = files.filter((file) => file.endsWith('.meta'));

assert(images.length > 0, 'Build the application before you check OG images.');
assert(
  images.some((file) => file.endsWith('image.webp.meta')),
  'Blog OG images are missing.',
);

for (const image of images) {
  const filename = path.join(directory, image);
  const metadata = JSON.parse(await readFile(filename, 'utf8'));
  assert.equal(metadata.status, 200, `${image}: expected HTTP 200`);
  assert.equal(metadata.headers['content-type'], 'image/webp', `${image}: expected WebP`);

  const body = await readFile(filename.replace(/\.meta$/, '.body'));
  assert.equal(body.toString('ascii', 0, 4), 'RIFF', `${image}: invalid RIFF header`);
  assert.equal(body.toString('ascii', 8, 12), 'WEBP', `${image}: invalid WebP header`);
}

console.log(`Checked ${images.length} OG images.`);

const articles = (await readdir('content/blog')).filter(
  (file) => file.endsWith('.mdx') && !file.endsWith('.en.mdx'),
);
for (const locale of i18n.languages) {
  const root = path.join('.next/server/app', locale);
  const home = await readFile(`${root}.html`, 'utf8');
  assert(home.includes(`lang="${locale}"`), `${locale}: incorrect HTML language`);
  assert(home.includes(messages.en.greeting), `${locale}: missing English home content`);
  const about = await readFile(path.join(root, 'about.html'), 'utf8');
  assert(about.includes(messages[locale].aboutDescription), `${locale}: missing About translation`);
  for (const [name, html] of [
    ['home', home],
    ['about', about],
  ]) {
    assert(html.includes(`href="${zawa.url}"`), `${locale}/${name}: missing project link`);
  }
  assert(home.includes(zawa.translations.en.role), `${locale}: missing project responsibilities`);
  assert(about.includes(zawa.translations[locale].role), `${locale}: missing project translation`);
  for (const article of articles) {
    const slug = article.replace(/\.mdx$/, '');
    const html = await readFile(path.join(root, 'blog', `${slug}.html`), 'utf8');
    assert(
      html.toLowerCase().includes('hreflang="en"'),
      `${locale}/${slug}: missing English alternate`,
    );
    assert(
      html.toLowerCase().includes('hreflang="zh-tw"'),
      `${locale}/${slug}: missing Chinese alternate`,
    );
    assert(
      html.includes(`/og/${locale}/${slug}/image.webp`),
      `${locale}/${slug}: incorrect OG image`,
    );
  }
}
console.log(
  `Checked both language versions of the home page, About page, and ${articles.length} articles.`,
);
