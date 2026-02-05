import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const webOutDir = join(root, 'apps/web/out');

function fail(message) {
  console.error(`[pages:build] ERROR: ${message}`);
  process.exit(1);
}

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

try {
  execSync('pnpm export:web', { stdio: 'inherit' });
} catch {
  fail('web export failed, dist was not produced');
}

if (!existsSync(webOutDir)) {
  fail('apps/web/out is missing after export:web');
}

cpSync(webOutDir, distDir, { recursive: true });
writeFileSync(join(distDir, '_redirects'), '/* /index.html 200\n', 'utf8');

if (!existsSync(join(distDir, 'index.html'))) {
  fail('dist/index.html is missing');
}

if (!existsSync(join(distDir, '_redirects'))) {
  fail('dist/_redirects is missing');
}

console.log('[pages:build] done. output=dist');
