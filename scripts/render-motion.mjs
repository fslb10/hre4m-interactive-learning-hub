import { spawnSync } from 'node:child_process';

const mode = process.argv[2] ?? 'all';
const command = 'npx';
const compositions = [
  { id: 'CanaSign', slug: 'cana-sign', posterFrame: 245 },
  { id: 'FourSenses', slug: 'four-senses', posterFrame: 326 },
  { id: 'ExegesisEisegesis', slug: 'exegesis-eisegesis', posterFrame: 300 },
  { id: 'SamaritanRecognition', slug: 'john4-recognition', posterFrame: 302 },
  { id: 'TwoDaughters', slug: 'mark5-two-daughters', posterFrame: 326 },
  { id: 'FourSoils', slug: 'matthew13-four-soils', posterFrame: 302 },
  { id: 'LostSons', slug: 'luke15-lost-sons', posterFrame: 328 },
  { id: 'Emmaus', slug: 'luke24-emmaus', posterFrame: 354 },
];

const run = (args) => {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.error) console.error(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
};

for (const composition of compositions) {
  if (mode === 'all' || mode === 'posters') {
    run(['remotion', 'still', 'remotion/index.ts', composition.id, `public/media/${composition.slug}-poster.png`, `--frame=${composition.posterFrame}`, '--overwrite']);
  }
  if (mode === 'all' || mode === 'videos') {
    run(['remotion', 'render', 'remotion/index.ts', composition.id, `public/media/${composition.slug}-motion.mp4`, '--codec=h264', '--crf=20', '--pixel-format=yuv420p', '--overwrite']);
  }
}
