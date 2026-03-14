/**
 * server.js — Servidor local de desarrollo para conveniodefarmacia.com
 *
 * Replica el comportamiento de Vercel "cleanUrls: true":
 *   /calculadora-nomina  →  calculadora-nomina.html
 *   /bolsa-empleo        →  bolsa-empleo.html
 *   /                    →  index.html
 *
 * Uso:
 *   node server.js
 *   Luego abre: http://localhost:3000
 *
 * Requiere Node.js (sin dependencias externas).
 */

'use strict';

const http = require('http');
const fs   = require('fs');
const path = require('path');
const url  = require('url');

const PORT    = 3000;
const ROOT    = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
  '.txt':  'text/plain; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
};

function getMime(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

function resolveFile(pathname) {
  // Limpiar trailing slash (excepto /)
  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Candidatos a probar en orden
  const candidates = [];

  if (pathname === '/') {
    candidates.push(path.join(ROOT, 'index.html'));
  } else {
    // 1. El path tal cual (para assets con extensión: /assets/css/shared.css)
    candidates.push(path.join(ROOT, pathname));
    // 2. cleanUrls: añadir .html
    candidates.push(path.join(ROOT, pathname + '.html'));
    // 3. index.html dentro de directorio
    candidates.push(path.join(ROOT, pathname, 'index.html'));
  }

  for (const candidate of candidates) {
    // Seguridad: evitar path traversal
    if (!candidate.startsWith(ROOT)) continue;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  return null;
}

const server = http.createServer((req, res) => {
  const parsed   = url.parse(req.url);
  const pathname = decodeURIComponent(parsed.pathname);

  // Ignorar favicon y analytics de Vercel (no loguear para no saturar)
  const silentPaths = ['/favicon.ico', '/_vercel/'];
  const silent = silentPaths.some(p => pathname.startsWith(p));

  const filePath = resolveFile(pathname);

  if (!silent) {
    const status = filePath ? '200' : '404';
    const fileShort = filePath ? path.relative(ROOT, filePath) : '(no encontrado)';
    console.log(`  ${status}  ${pathname.padEnd(35)} → ${fileShort}`);
  }

  if (!filePath) {
    const notFound = path.join(ROOT, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(notFound));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end(`404 — No encontrado: ${pathname}\n\nRutas disponibles:\n- /\n- /calculadora-nomina\n- /bolsa-empleo\n- /convenio-farmacia-2026\n- /sobre-nosotros\n- /contacto\n- /privacidad`);
    }
    return;
  }

  const contentType = getMime(filePath);
  const content     = fs.readFileSync(filePath);

  res.writeHead(200, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store, no-cache, must-revalidate',
  });
  res.end(content);
});

server.listen(PORT, () => {
  console.log(`\n✅ Servidor local arrancado`);
  console.log(`   → http://localhost:${PORT}\n`);
  console.log(`   CleanUrls activo: /calculadora-nomina → calculadora-nomina.html`);
  console.log(`   Pulsa Ctrl+C para parar.\n`);
});
