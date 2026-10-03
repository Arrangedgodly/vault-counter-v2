import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT || 5187);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml' };
http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const relative = pathname === '/' ? 'index.html' : pathname.slice(1);
    const segments = relative.split('/');
    if (segments.some(segment => segment.startsWith('.') || segment === 'node_modules') || !types[path.extname(relative)]) {
      response.writeHead(404).end('Not found');
      return;
    }
    const filename = path.resolve(root, relative);
    if (!filename.startsWith(root)) {
      response.writeHead(404).end('Not found');
      return;
    }
    const content = await readFile(filename);
    response.writeHead(200, { 'Content-Type': types[path.extname(filename)], 'Cache-Control': 'no-store' });
    response.end(content);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '0.0.0.0', () => console.log(`Vault Counter is running at http://localhost:${port}`));
