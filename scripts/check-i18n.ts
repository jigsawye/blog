import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { NextRequest } from 'next/server';
import { NextFetchEvent } from 'next/dist/server/web/spec-extension/fetch-event';
import proxy from '../proxy';
import { formatDate, isLocale, languageAlternates, localizedPath } from '../lib/i18n';
import { experiences } from '../lib/experience';
import { messages } from '../lib/messages';
import { zawa } from '../lib/projects';

assert(isLocale('zh-TW'));
assert(isLocale('en'));
assert(!isLocale('fr'));
assert(!isLocale('en-US'));
assert.equal(localizedPath('/', 'en'), '/en');
assert.equal(localizedPath('/about', 'zh-TW'), '/about');
assert.equal(localizedPath('/blog/post', 'en'), '/en/blog/post');
assert.deepEqual(languageAlternates('/about'), {
  'zh-TW': '/about',
  en: '/en/about',
  'x-default': '/about',
});
assert.notEqual(formatDate('2021-04-23', 'en'), formatDate('2021-04-23', 'zh-TW'));

for (const [path, cookie, header, expected] of [
  ['/about?ref=test', '', 'x-middleware-rewrite', '/zh-TW/about?ref=test'],
  ['/en/blog/post', '', 'x-middleware-next', null],
  ['/zh-TW/about', '', 'location', '/about'],
  ['/blog/post?ref=test', 'FD_LOCALE=en', 'location', '/en/blog/post?ref=test'],
  ['/about', 'FD_LOCALE=zh-TW', 'x-middleware-rewrite', '/zh-TW/about'],
  ['/about', 'FD_LOCALE=invalid', 'x-middleware-rewrite', '/zh-TW/about'],
] as const) {
  const request = new NextRequest(`http://localhost:3000${path}`, {
    headers: { cookie },
  });
  const response = await proxy(
    request,
    new NextFetchEvent({ request, page: path, context: undefined }),
  );
  assert(response, `Missing proxy response: ${path}`);
  if (expected === null) assert.equal(response.headers.get(header), '1');
  else assert.equal(response.headers.get(header), `http://localhost:3000${expected}`);
}

assert.deepEqual(Object.keys(messages.en).sort(), Object.keys(messages['zh-TW']).sort());
assert.deepEqual(
  Object.keys(zawa.translations.en).sort(),
  Object.keys(zawa.translations['zh-TW']).sort(),
);
assert.equal(experiences.en.length, experiences['zh-TW'].length);
for (const [index, experience] of experiences.en.entries()) {
  const translated = experiences['zh-TW'][index];
  assert.equal(experience.categories?.length, translated.categories?.length);
  assert.equal(experience.items?.length, translated.items?.length);
  for (const [categoryIndex, category] of (experience.categories ?? []).entries()) {
    assert.equal(category.items.length, translated.categories?.[categoryIndex].items.length);
  }
}

const files = await readdir('content/blog');
const originals = files.filter((file) => file.endsWith('.mdx') && !file.endsWith('.en.mdx'));
assert(originals.length > 0, 'No source articles found.');
for (const original of originals) {
  const source = await readFile(`content/blog/${original}`, 'utf8');
  const translated = await readFile(
    `content/blog/${original.replace(/\.mdx$/, '.en.mdx')}`,
    'utf8',
  );
  assert.equal(
    source.match(/^date: (.+)$/m)?.[1],
    translated.match(/^date: (.+)$/m)?.[1],
    original,
  );
  assert.equal(
    source.match(/^#{2,6} /gm)?.length,
    translated.match(/^#{2,6} /gm)?.length,
    original,
  );
  const code = (text: string) =>
    [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((match) =>
      match[1].replace(/\/\/[^\n]*/g, '').trim(),
    );
  assert.deepEqual(code(source), code(translated), `${original}: code examples changed`);
  const images = (text: string) => text.match(/\/images\/blog\/[^\s)"\]]+/g);
  assert.deepEqual(images(source), images(translated), `${original}: images changed`);
  const prose = translated.replace(/```[\s\S]*?```/g, '').replace(/https?:\/\/[^\s)]+/g, '');
  assert(!/[\u3400-\u9fff]/u.test(prose), `${original}: untranslated prose`);
}

console.log(
  `Checked locale routing, interface translations, experience entries, and ${originals.length} article translations.`,
);
