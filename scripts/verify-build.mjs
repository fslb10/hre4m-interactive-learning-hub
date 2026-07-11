import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const base = process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : '/';
const dist = join(process.cwd(), 'dist');
const failures = [];

const requireFile = (path, label = path) => {
  if (!existsSync(join(dist, path))) failures.push(`Missing ${label}: dist/${path}`);
};

for (const route of [
  'index.html',
  'teacher/index.html',
  'privacy/index.html',
  'unit-2/john/index.html',
  'unit-2/mark/index.html',
  'unit-2/matthew/index.html',
  'unit-2/luke/index.html',
  'manifest.webmanifest',
  'sw.js',
  'app-icon.png',
]) {
  requireFile(route);
}

const homePath = join(dist, 'index.html');
if (existsSync(homePath)) {
  const html = readFileSync(homePath, 'utf8');
  const links = [...html.matchAll(/href="([^"]*unit-2[^"]*)"/g)].map((match) => match[1]);
  if (links.length !== 4) failures.push(`Expected 4 Gospel links, found ${links.length}.`);

  for (const link of links) {
    if (!link.startsWith(`${base}unit-2/`)) failures.push(`Incorrect Gospel base path: ${link}`);
    if (link.includes(`${repository}unit-2`)) failures.push(`Missing slash in Gospel path: ${link}`);
    const relative = link.slice(base.length).replace(/^\//, '');
    requireFile(join(relative, 'index.html'), `page targeted by ${link}`);
  }

  if (!html.includes(`href="${base}teacher/"`)) failures.push('Teacher tools link does not use the deployment base path.');
  if (!html.includes(`href="${base}manifest.webmanifest"`)) failures.push('Manifest link does not use the deployment base path.');
}

const manifestPath = join(dist, 'manifest.webmanifest');
if (existsSync(manifestPath)) {
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    if (manifest.start_url !== './' || manifest.scope !== './') failures.push('PWA manifest must use deployment-safe relative scope and start_url.');
    if (!manifest.icons?.some((icon) => icon.src === 'app-icon.png')) failures.push('PWA manifest is missing the branded app icon.');
  } catch {
    failures.push('PWA manifest is not valid JSON.');
  }
}

if (failures.length) {
  console.error('\nBuild verification failed:\n- ' + failures.join('\n- '));
  process.exit(1);
}

console.log(`Build verification passed for base path ${base}`);
