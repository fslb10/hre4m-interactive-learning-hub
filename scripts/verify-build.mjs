import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const base = process.env.GITHUB_ACTIONS && repository ? `/${repository}/` : '/';
const dist = join(process.cwd(), 'dist');
const failures = [];
const canaMediaAssets = [
  'media/cana-jars-observation.svg',
  'media/cana-sign-motion.mp4',
  'media/cana-sign-poster.png',
];
const sharedMotionAssets = [
  'media/four-senses-motion.mp4',
  'media/four-senses-poster.png',
  'media/exegesis-eisegesis-motion.mp4',
  'media/exegesis-eisegesis-poster.png',
];
const passageMotionAssets = [
  'media/john4-recognition-motion.mp4',
  'media/john4-recognition-poster.png',
  'media/mark5-two-daughters-motion.mp4',
  'media/mark5-two-daughters-poster.png',
  'media/matthew13-four-soils-motion.mp4',
  'media/matthew13-four-soils-poster.png',
  'media/luke15-lost-sons-motion.mp4',
  'media/luke15-lost-sons-poster.png',
  'media/luke24-emmaus-motion.mp4',
  'media/luke24-emmaus-poster.png',
];
const pilotMediaAssets = [
  'media/john1-word-light-hook.svg',
  'media/john1-prologue-pattern.svg',
  'media/john6-bread-sign-hook.svg',
  'media/john6-bread-of-life-map.svg',
  'media/john9-sight-hook.svg',
  'media/john9-sight-testimony-map.svg',
];

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
  ...canaMediaAssets,
  ...sharedMotionAssets,
  ...passageMotionAssets,
  ...pilotMediaAssets,
]) {
  requireFile(route);
}

const serviceWorkerPath = join(dist, 'sw.js');
if (existsSync(serviceWorkerPath)) {
  const serviceWorker = readFileSync(serviceWorkerPath, 'utf8');
  for (const asset of canaMediaAssets) {
    if (!serviceWorker.includes(`'./${asset}'`)) failures.push(`Cana media is missing from the offline app shell: ${asset}`);
  }
  for (const asset of sharedMotionAssets) {
    if (!serviceWorker.includes(`'./${asset}'`)) failures.push(`Shared motion graphic is missing from the offline app shell: ${asset}`);
  }
  for (const asset of pilotMediaAssets) {
    if (!serviceWorker.includes(`'./${asset}'`)) failures.push(`Pilot media is missing from the offline app shell: ${asset}`);
  }
}

const homePath = join(dist, 'index.html');
if (existsSync(homePath)) {
  const html = readFileSync(homePath, 'utf8');
  const links = [...html.matchAll(/href="([^"]*unit-2[^"]*)"/g)].map((match) => match[1]);
  if (links.length !== 4) failures.push(`Expected 4 Gospel links, found ${links.length}.`);

  for (const link of links) {
    if (!link.startsWith(`${base}unit-2/`)) failures.push(`Incorrect Gospel base path: ${link}`);
    if (repository && link.includes(`${repository}unit-2`)) failures.push(`Missing slash in Gospel path: ${link}`);
    const relative = link.slice(base.length).replace(/^\//, '');
    requireFile(join(relative, 'index.html'), `page targeted by ${link}`);
  }

  if (!html.includes(`href="${base}teacher/"`)) failures.push('Teacher tools link does not use the deployment base path.');
  if (!html.includes(`href="${base}manifest.webmanifest"`)) failures.push('Manifest link does not use the deployment base path.');
}

const teacherPath = join(dist, 'teacher/index.html');
if (existsSync(teacherPath)) {
  const html = readFileSync(teacherPath, 'utf8');
  if (!html.includes('Enter the four-digit teacher PIN')) failures.push('Teacher Tools does not render the PIN gate.');
  if (!html.includes('Access remains unlocked only in this browser tab.')) failures.push('Teacher Tools is missing its session-access notice.');
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
