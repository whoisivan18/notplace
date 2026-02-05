import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const distDir = join(root, 'dist');
const fallbackDir = join(root, 'public');
const webOutDir = join(root, 'apps/web/out');

function resetDist() {
  rmSync(distDir, { recursive: true, force: true });
  mkdirSync(distDir, { recursive: true });
}

function copyFallback() {
  cpSync(fallbackDir, distDir, { recursive: true });
}

resetDist();

let webBuildOk = false;
try {
  execSync('pnpm build:web', { stdio: 'inherit' });
  execSync('pnpm export:web', { stdio: 'inherit' });
  webBuildOk = existsSync(webOutDir);
} catch (error) {
  console.warn('[pages:build] web build failed, fallback will be used.');
}

if (webBuildOk) {
  cpSync(webOutDir, distDir, { recursive: true });
  if (!existsSync(join(distDir, 'index.html'))) {
    console.warn('[pages:build] web output had no index.html, injecting fallback.');
    copyFallback();
  }
} else {
  copyFallback();
}

if (!existsSync(join(distDir, 'index.html'))) {
  throw new Error('dist/index.html is missing after pages:build');
}

console.log('[pages:build] done. output=dist');
