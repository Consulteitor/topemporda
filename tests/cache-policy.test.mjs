import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const dates = await import(`data:text/javascript,${encodeURIComponent(read('lib/editorialDates.js'))}`);

test('dates desconegudes o impossibles no inventen canvis editorials', () => {
  assert.equal(dates.editorialDate('31/02/2026'), undefined);
  assert.equal(dates.editorialDate(''), undefined);
  assert.equal(dates.editorialDate('12/04/2026'), '2026-04-12');
  assert.equal(dates.editorialLastModified({ data_publicacio: '12/04/2026', data_modificacio: '2026-05-03' }), '2026-05-03');
});

test('sitemap idèntic en dies diferents; dates reals, exclusions i prioritats conservades', async () => {
  const guideSlug = fs.readdirSync(path.join(root, 'content/guies')).find(f => f.endsWith('.md')).replace('.md', '');
  const run = async day => {
    class Clock extends Date { constructor(...args) { super(...(args.length ? args : [day])); } }
    const sandbox = {
      fs, path, Date: Clock, process: { cwd: () => root },
      editorialLastModified: dates.editorialLastModified,
      getGuies: async () => [{ slug: guideSlug, data_publicacio: '12/04/2026' }],
      getNegocis: async () => [
        { id: 'visible', premium: true, data_modificacio: '2026-05-03' },
        { id: 'sense-data' }, { id: 'privat', estat: 'esborrany' },
      ],
    };
    const source = read('app/sitemap.js').replace(/^import .*;\r?\n/gm, '')
      .replace('export const revalidate', 'const revalidate')
      .replace('export default async function sitemap', 'async function sitemap');
    return JSON.parse(JSON.stringify(await vm.runInNewContext(`${source}\nsitemap()`, sandbox)));
  };
  const first = await run('2026-10-08');
  assert.deepEqual(await run('2026-11-08'), first);
  assert.equal(first.find(x => x.url.endsWith(`/guies/${guideSlug}`)).lastModified, '2026-04-12');
  assert.deepEqual(first.find(x => x.url.endsWith('/negocis/visible')), {
    url: 'https://topemporda.com/negocis/visible', lastModified: '2026-05-03', priority: 0.8,
  });
  assert.equal(first.find(x => x.url.endsWith('/negocis/sense-data')).lastModified, undefined);
  assert.equal(first.some(x => x.url.endsWith('/negocis/privat')), false);
  assert.equal(first[0].lastModified, undefined);
});

test('dades estables setmanals; notícies conserven la frescor de 48 hores', async () => {
  const reads = [];
  const source = read('lib/sheets.js').replaceAll('export ', '');
  await vm.runInNewContext(`${source}\nPromise.all([getNegocis(), getGuies(), getPobles(), getNoticies()])`, {
    fetch: async (url, options) => {
      reads.push([new URL(url).searchParams.get('sheet'), options.next.revalidate]);
      return { ok: true, json: async () => ({ data: [] }) };
    },
    console,
  });
  assert.deepEqual(reads, [['Negocis', 604800], ['Guies', 604800], ['Pobles', 604800], ['Noticies', 172800]]);
});
