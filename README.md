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
- shareable Teacher Assignment Mode with passage and activity requirements
- portable JSON backup/import plus rolling recovery snapshots
- evidence checklists, layered hints, and exemplar-comparison reflection
- installable PWA support with offline access to visited lessons
- automated GitHub Pages route checks and critical student-flow tests
- structured, credited passage media with guided checkpoints and offline text alternatives
- privacy-enhanced, click-to-load YouTube clips with timestamps, captions, transcripts, and direct-link fallback
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

Verify the generated GitHub Pages routes with:

```sh
npm run verify:build
```

Run the automated assignment, progression, migration, and backup tests with:

```sh
npm run test:logic
```

## Teacher Assignment Mode

Open `/teacher/` from the **Teacher tools** link on the homepage and enter the classroom teacher PIN. Access remains unlocked for the current browser tab. Choose a Gospel, required passages, due date, class period, required activities, and whether optional passage media should appear. The builder produces one student link containing the assignment settings.

Teacher Mode inside each Gospel lesson uses the same PIN gate before showing notes or unlocking student fields. This is a lightweight classroom deterrent for the public GitHub Pages site, not server-backed authentication.

Assignment links do not contain student names or responses. Student work remains in browser storage until the student downloads a backup, text export, or PDF.

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

## Author passage media

Media belongs in a passage's `media` array in `src/content/lessons/*.ts`; do not hard-code media URLs in page components. The union types in `src/content/types.ts` support `image`, `audio`, and `youtube` items. Every item must include:

- a stable `id`, `title`, `type`, and `optional` setting
- one defined `instructionalPurpose` from the approved purpose list
- a meaningful `textAlternative` that still supports the lesson if media cannot load
- `credit` with source, creator, licence, and a ready-to-display attribution line
- optional `beforeViewing` and `afterViewing` question arrays with stable question ids

The reusable renderer uses `MediaCard`, `GuidedImage`, `AudioGuide`, `YouTubeClip`, `MediaCheckpoint`, `TranscriptPanel`, and `SourceCredit`. Checkpoint answers are keyed by media and question id and are included in the existing local autosave, recovery snapshot, and portable backup.

### Image and gallery fields

Each image needs `src`, `hosting` (`local` or `external`), and descriptive `alt`. Add `width` and `height` to prevent layout shift. Multiple entries create a keyboard-accessible gallery. `hotspots` use percentage coordinates and must have a concise `label` plus an `observation`; important information must also remain available through the image alt, caption, prompts, or text alternative.

Store local media under `public/media/` and author its `src` without a leading slash, for example `media/cana-jars-observation.svg`. The renderer adds Astro's deployment base path so assets work on project GitHub Pages. Add intentionally offline-critical local files to `APP_ROUTES` in `public/sw.js` and to `scripts/verify-build.mjs`.

### Audio fields

Audio items use an `audio` object with `src`, `hosting`, and `mimeType`. Browsers receive a native, keyboard-accessible player with `preload="metadata"` and no autoplay. Add `reflectionPrompts`, a cue-based `transcript`, and caption metadata when available; caption files may also declare `hosting` as `local` or `external`. A transcript is required in practice for spoken instructional content even though the type remains optional for media without speech.

### YouTube fields

Author only the 11-character `youtubeId`, not an embed URL. Optional fields include `startSeconds`, `endSeconds`, `captionLanguage`, and `playlistId`. The shared component:

- connects only after the student chooses **Load video**
- embeds through `youtube-nocookie.com`
- sets autoplay off and requests captions on by default
- keeps the player responsive and keyboard accessible
- always displays a timestamped direct YouTube link for school-network embed failures

Add a transcript whenever the video supplies one and record caption availability honestly. Do not put required learning only inside a video; the `textAlternative` and surrounding prompts must preserve the route through the activity.

### Demonstration item

`john-2-cana` contains one optional guided-image demonstration using the locally hosted, CC BY 4.0 “Six Stone Jars” schematic. It exercises observation hotspots, before/after questions, saved media notes, attribution, deployment-safe paths, and offline precaching without populating the other passages.

## Add a future unit

Unit 2 is the first module in a multi-unit hub. Future units should keep their own data types and activity shells while reusing the project-level layout, visual tokens, student information pattern, storage utilities, export conventions, and accessibility standards.

Recommended next steps:

1. Add a unit entry to the homepage.
2. Create a data model for the unit’s activity type.
3. Build one complete reusable activity shell.
4. Namespace saved data with a stable unit and lesson id.
5. Add its static routes and validate keyboard, mobile, print, and export flows.

## Local data and privacy

There is no backend and no real authentication. Names, periods, and responses are stored only in browser LocalStorage using a lesson-and-student-specific key. Students can download a portable `.hre4m.json` backup and import it on another device. The hub also keeps a rolling recovery snapshot before destructive changes and at intervals during writing.
