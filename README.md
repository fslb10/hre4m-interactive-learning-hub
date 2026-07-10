# HRE4M Interactive Learning Hub

A static, classroom-ready learning hub for Grade 12 Catholic Religion. The current release focuses on Unit 2: exegesis, eisegesis, hermeneutics, and the Four Senses of Scripture through Matthew, Mark, Luke, and John.

## What is included

- Four visually distinct Gospel laboratories
- 40 guided passage investigations
- student information gate with Period 1–5
- device-local autosave per student and Gospel
- literal/context unlock before deeper senses
- Catholic connection and eisegesis safeguard for every passage
- student-attempt-first exemplar responses
- exegesis/eisegesis checks and a click-based Four Senses sorter
- badges, progress tracking, synthesis, and reflection choice board
- clean teacher collection view, copy, text export, and print/PDF support
- static GitHub Pages deployment

The app intentionally provides references, short teacher-created anchor lines, and contextual prompts rather than reproducing full NRSV / NRSV-CE passages. Students use a physical or approved digital Bible alongside the app.

## Local development

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and publishes the static site whenever `main` is pushed. In the GitHub repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

The Astro configuration detects a project repository name during GitHub Actions and sets the correct base path automatically. For a custom domain, set `SITE_URL` in the workflow or repository environment.

## Content architecture

Gospel lesson content is structured data in:

```text
src/content/lessons/
  john.ts
  mark.ts
  matthew.ts
  luke.ts
```

Shared lesson types and the passage helper live in `src/content/types.ts`. Student-facing interactions are reusable Svelte components in `src/components/`.

## Add another passage

Add a `definePassage({ ... })` entry to the relevant Gospel file. Each passage needs:

- id, title, reference, difficulty, and estimated time
- a teacher-created anchor phrase
- context notes and key images
- Catholic connection and eisegesis trap
- a teacher note
- concise exemplars for the literal, allegorical, moral, and anagogical senses

The shared prompts are applied automatically and can be overridden per passage when needed.

## Add a future unit

Unit 2 is the first module in a multi-unit hub. Future units should keep their own data types and activity shells while reusing the project-level layout, visual tokens, student information pattern, storage utilities, export conventions, and accessibility standards.

Recommended next steps:

1. Add a unit entry to the homepage.
2. Create a data model for the unit’s activity type.
3. Build one complete reusable activity shell.
4. Namespace saved data with a stable unit and lesson id.
5. Add its static routes and validate keyboard, mobile, print, and export flows.

## Local data and privacy

There is no backend and no real authentication. Names, periods, and responses are stored only in browser LocalStorage using a lesson-and-student-specific key. Students should export or print completed work before clearing browser data or switching devices.
