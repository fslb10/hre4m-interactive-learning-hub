import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

const [owner, repository] = process.env.GITHUB_REPOSITORY?.split('/') ?? [];
const isProjectPage = Boolean(process.env.GITHUB_ACTIONS && repository && !repository.endsWith('.github.io'));

export default defineConfig({
  integrations: [svelte()],
  output: 'static',
  site: process.env.SITE_URL || (owner ? `https://${owner}.github.io` : 'https://example.github.io'),
  base: isProjectPage ? `/${repository}/` : '/',
  vite: {
    build: {
      sourcemap: false,
    },
  },
});
