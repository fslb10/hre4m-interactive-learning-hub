import assert from 'node:assert/strict';
import test from 'node:test';
import { assignmentSearch, parseAssignment } from '../src/utils/assignment.ts';
import { completionSummary, literalComplete, passageComplete } from '../src/utils/progress.ts';
import {
  deploymentSafeMediaUrl,
  mediaDataErrors,
  mediaResponseEntries,
  visiblePassageMedia,
  youtubeEmbedUrl,
  youtubeWatchUrl,
} from '../src/utils/media.ts';
import {
  clearLessonState,
  createLessonBackup,
  loadLessonState,
  loadRecoverySnapshot,
  normalizeLessonState,
  parseLessonBackup,
  saveLessonState,
  saveRecoverySnapshot,
} from '../src/utils/storage.ts';
import { grantTeacherAccess, hasTeacherAccess, revokeTeacherAccess, validTeacherPin } from '../src/utils/teacherAccess.ts';

const lesson = {
  id: 'gospel-john',
  shortName: 'John',
  passages: [{ id: 'john-1-word' }, { id: 'john-2-cana' }],
  quiz: [{ id: 'q1', answer: 'Exegesis' }],
  sortingActivity: [{ id: 's1', answer: 'Literal' }],
};

const completeResponse = {
  literal: 'L'.repeat(120),
  allegorical: 'A'.repeat(60),
  moral: 'M'.repeat(60),
  anagogical: 'N'.repeat(60),
  exit: 'E'.repeat(50),
  exemplarViewed: false,
  evidenceChecklist: [],
  exemplarReflection: '',
  hintLevel: 0,
  mediaResponses: {},
};

test('assignment links preserve only valid required passages and settings', () => {
  const parsed = parseAssignment(
    '?assignment=1&title=Cana%20Case&passages=john-2-cana,not-real&quiz=0&reflection=0&unlock=1&media=0',
    lesson,
  );
  assert.ok(parsed);
  assert.equal(parsed.title, 'Cana Case');
  assert.deepEqual(parsed.passageIds, ['john-2-cana']);
  assert.equal(parsed.requireQuiz, false);
  assert.equal(parsed.requireReflection, false);
  assert.equal(parsed.requireUnlock, true);
  assert.equal(parsed.includeOptionalMedia, false);

  const roundTrip = parseAssignment(`?${assignmentSearch(parsed)}`, lesson);
  assert.deepEqual(roundTrip, parsed);
});

test('older saved work is migrated with Version 2 guidance fields', () => {
  const state = normalizeLessonState({
    responses: {
      'john-2-cana': {
        literal: 'Existing response',
        allegorical: '',
        moral: '',
        anagogical: '',
        exit: '',
        exemplarViewed: false,
      },
    },
  });
  assert.deepEqual(state.responses['john-2-cana'].evidenceChecklist, []);
  assert.equal(state.responses['john-2-cana'].exemplarReflection, '');
  assert.equal(state.responses['john-2-cana'].hintLevel, 0);
  assert.deepEqual(state.responses['john-2-cana'].mediaResponses, {});
});

test('teacher tools require the configured PIN and remember access for one session store', () => {
  const values = new Map();
  const session = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };

  assert.equal(validTeacherPin('0415'), true);
  assert.equal(validTeacherPin('415'), false);
  assert.equal(grantTeacherAccess('0000', session), false);
  assert.equal(hasTeacherAccess(session), false);
  assert.equal(grantTeacherAccess('0415', session), true);
  assert.equal(hasTeacherAccess(session), true);
  revokeTeacherAccess(session);
  assert.equal(hasTeacherAccess(session), false);
});

test('media data is credited, purposeful, and teacher links can exclude optional items', () => {
  const media = [{
    id: 'cana-six-jars-observation',
    type: 'image',
    title: 'Six Stone Jars',
    instructionalPurpose: 'Observe a symbol',
    optional: true,
    textAlternative: 'Six large stone jars used for purification are arranged together.',
    images: [{ id: 'jars', src: 'media/jars.svg', hosting: 'local', alt: 'Six jars.' }],
    credit: {
      sourceName: 'Local library',
      creator: 'HRE4M Interactive Learning Hub',
      licence: 'CC BY 4.0',
      attribution: 'Six Stone Jars, HRE4M Interactive Learning Hub, CC BY 4.0.',
    },
  }];
  assert.deepEqual(media.flatMap(mediaDataErrors), []);
  assert.equal(visiblePassageMedia(media, true).length, 1);
  assert.equal(visiblePassageMedia(media, false).length, 0);
  media[0].beforeViewing = [{ id: 'notice', prompt: 'What do you notice?' }];
  assert.deepEqual(
    mediaResponseEntries(media, { 'cana-six-jars-observation:before:notice': 'There are six jars.' })[0],
    {
      key: 'cana-six-jars-observation:before:notice',
      mediaTitle: 'Six Stone Jars',
      stage: 'Before viewing',
      prompt: 'What do you notice?',
      response: 'There are six jars.',
    },
  );
});

test('YouTube clips use privacy-enhanced click-to-load URLs with captions and timestamps', () => {
  const clip = {
    youtubeId: 'dQw4w9WgXcQ',
    startSeconds: 15,
    endSeconds: 42,
    captionLanguage: 'en',
  };
  const embed = new URL(youtubeEmbedUrl(clip));
  assert.equal(embed.origin, 'https://www.youtube-nocookie.com');
  assert.equal(embed.searchParams.get('autoplay'), '0');
  assert.equal(embed.searchParams.get('cc_load_policy'), '1');
  assert.equal(embed.searchParams.get('start'), '15');
  assert.equal(embed.searchParams.get('end'), '42');
  assert.equal(new URL(youtubeWatchUrl(clip)).searchParams.get('t'), '15s');
  assert.equal(deploymentSafeMediaUrl('media/example.svg', 'local', '/hub/'), '/hub/media/example.svg');
});

test('portable backups validate the Gospel and preserve student work', () => {
  const student = { firstName: 'Test', lastName: 'Student', period: 'Period 2' };
  const state = normalizeLessonState({ responses: { 'john-2-cana': completeResponse } });
  const backup = createLessonBackup('gospel-john', student, state);
  const restored = parseLessonBackup(backup, 'gospel-john');
  assert.equal(restored.student.period, 'Period 2');
  assert.equal(restored.state.responses['john-2-cana'].literal.length, 120);
  assert.throws(() => parseLessonBackup(backup, 'gospel-mark'), /different Gospel/i);
});

test('literal-first unlock and assignment completion use required work only', () => {
  assert.equal(literalComplete(completeResponse), true);
  assert.equal(passageComplete(completeResponse), true);

  const focusedLesson = {
    ...lesson,
    passages: [{ id: 'john-2-cana' }],
    quiz: [],
    sortingActivity: [],
    requirements: { synthesis: false, reflection: false },
  };
  const state = normalizeLessonState({ responses: { 'john-2-cana': completeResponse } });
  assert.equal(completionSummary(focusedLesson, state).percentage, 100);
});

test('autosave and recovery snapshots remain isolated by student and lesson', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
    clear: () => values.clear(),
    key: (index) => [...values.keys()][index] ?? null,
    get length() {
      return values.size;
    },
  };

  const student = { firstName: 'Test', lastName: 'Student', period: 'Period 2' };
  const state = normalizeLessonState({ responses: { 'john-2-cana': completeResponse } });
  saveLessonState('gospel-john', student, state);
  saveRecoverySnapshot('gospel-john', student, state);

  assert.equal(loadLessonState('gospel-john', student).responses['john-2-cana'].exit.length, 50);
  assert.equal(loadRecoverySnapshot('gospel-john', student)?.responses['john-2-cana'].literal.length, 120);
  assert.equal(loadLessonState('gospel-mark', student).responses['john-2-cana'], undefined);

  clearLessonState('gospel-john', student);
  assert.equal(loadLessonState('gospel-john', student).responses['john-2-cana'], undefined);
  assert.ok(loadRecoverySnapshot('gospel-john', student));
});
