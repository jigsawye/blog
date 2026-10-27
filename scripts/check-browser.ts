import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const cli = process.env.ORCA_CLI_COMMAND ?? (process.platform === 'linux' ? 'orca-ide' : 'orca');
const origin = process.env.SITE_URL ?? 'http://localhost:3000';

function browser<T>(...args: string[]): T {
  const output = execFileSync(cli, [...args, '--json'], { encoding: 'utf8' });
  const response = JSON.parse(output);
  assert(response.ok, JSON.stringify(response.error));
  return response.result;
}

interface Snapshot {
  refs: Record<string, { name: string; role: string }>;
}

const { browserPageId: page } = browser<{ browserPageId: string }>(
  'tab',
  'create',
  '--url',
  `${origin}/zh-TW/about?check=theme#side-projects-heading`,
);

function click(name: string) {
  const snapshot = browser<Snapshot>('snapshot', '--page', page);
  const entry = Object.entries(snapshot.refs).find(
    ([, value]) => value.role === 'button' && value.name === name,
  );
  assert(entry, `Missing button: ${name}`);
  browser('click', '--page', page, '--element', `@${entry[0]}`);
}

for (const [menu, language, path, locale] of [
  ['選擇語言', 'English', '/en/about', 'en'],
  ['Choose a language', '繁體中文', '/about', 'zh-TW'],
]) {
  click(menu);
  click(language);
  browser('wait', '--page', page, '--url', `${origin}${path}`);
  browser('snapshot', '--page', page);
  const state = browser<{ result: string }>(
    'eval',
    '--page',
    page,
    '--expression',
    'JSON.stringify({ path: location.pathname, search: location.search, hash: location.hash, lang: document.documentElement.lang, theme: document.documentElement.classList.contains("dark") || document.documentElement.classList.contains("light") })',
  );
  assert.deepEqual(JSON.parse(state.result), {
    path,
    search: '?check=theme',
    hash: '#side-projects-heading',
    lang: locale,
    theme: true,
  });
  const { messages } = browser<{ messages: { text: string }[] }>(
    'console',
    '--page',
    page,
    '--limit',
    '100',
  );
  const errors = messages.filter((message) => message.text.includes('Encountered a script tag'));
  assert.equal(
    errors.length,
    0,
    `Language switching rendered a client script: ${errors.map((message) => message.text).join('\n')}`,
  );
}

console.log(
  'Checked both language switches, theme initialization, URL parameters, and React script warnings.',
);
