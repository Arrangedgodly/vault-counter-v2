import { cp, mkdir, rm } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);

// Only generated deployment output is replaced. Source and local data stay intact.
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const asset of ['index.html', 'pages', 'blocks', 'images']) {
  await cp(new URL(asset, root), new URL(asset, output), { recursive: true });
}
console.log('Static site built in dist/');
