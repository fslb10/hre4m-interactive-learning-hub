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
import { johnLesson } from '../src/content/lessons/john.ts';
import { markLesson } from '../src/content/lessons/mark.ts';
import { matthewLesson } from '../src/content/lessons/matthew.ts';
import { lukeLesson } from '../src/content/lessons/luke.ts';
import { applyLessonFeatureFlags } from '../src/utils/features.ts';
import { shouldBlockStudentWritingEvent } from '../src/utils/studentWriting.ts';

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

test('student writing blocks clipboard and drag-in text while allowing normal typing', () => {
  for (const eventType of ['copy', 'cut', 'paste', 'drop']) {
    assert.equal(shouldBlockStudentWritingEvent(eventType), true);
  }
  assert.equal(shouldBlockStudentWritingEvent('beforeinput', 'insertFromPaste'), true);
  assert.equal(shouldBlockStudentWritingEvent('beforeinput', 'insertFromDrop'), true);
  assert.equal(shouldBlockStudentWritingEvent('beforeinput', 'insertText'), false);
  assert.equal(shouldBlockStudentWritingEvent('input'), false);
});

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
      sourceUrl: 'media/jars.svg',
      creator: 'HRE4M Interactive Learning Hub',
      licence: 'CC BY 4.0',
      licenceUrl: 'https://creativecommons.org/licenses/by/4.0/',
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

test('John media pilot is limited to three passages and every item meets the media contract', () => {
  const pilotPassages = johnLesson.passages.filter((passage) => passage.pilot?.featureFlag === 'john-media-pilot');
  assert.deepEqual(pilotPassages.map((passage) => passage.id), ['john-1-word', 'john-6-bread', 'john-9-sight']);
  assert.equal(pilotPassages.flatMap((passage) => passage.media ?? []).length, 6);
  assert.deepEqual(pilotPassages.flatMap((passage) => (passage.media ?? []).flatMap(mediaDataErrors)), []);
  for (const passage of pilotPassages) {
    const media = passage.media ?? [];
    assert.equal(media.filter((item) => item.placement === 'hook').length, 1);
    assert.equal(media.filter((item) => item.placement === 'study').length, 1);
    assert.ok(media.every((item) => (item.afterViewing?.length ?? 0) > 0));
    assert.ok(media.every((item) => item.type !== 'image' || (item.observationPrompts?.length ?? 0) > 0));
    assert.ok(passage.pilot.evidenceChecks.length >= 4);
  }
  assert.equal(johnLesson.passages.filter((passage) => passage.media?.some((item) => item.featureFlag === 'john-media-pilot')).length, 3);
});

test('Cana includes a validated, silent Remotion motion graphic with a local poster', () => {
  const canaMedia = johnLesson.passages.find((passage) => passage.id === 'john-2-cana')?.media ?? [];
  assert.deepEqual(canaMedia.map((item) => item.type), ['image', 'video']);
  assert.deepEqual(canaMedia.flatMap(mediaDataErrors), []);
  const motion = canaMedia.find((item) => item.type === 'video');
  assert.equal(motion?.video.src, 'media/cana-sign-motion.mp4');
  assert.equal(motion?.video.poster?.src, 'media/cana-sign-poster.png');
  assert.equal(motion?.video.silent, true);
  assert.ok((motion?.textAlternative.length ?? 0) > 200);
});

test('selected Gospel passages include validated local motion explainers', () => {
  const expected = [
    [johnLesson, 'john-4-well', 'media/john4-recognition-motion.mp4'],
    [markLesson, 'mark-5-daughters', 'media/mark5-two-daughters-motion.mp4'],
    [matthewLesson, 'matthew-13-sower', 'media/matthew13-four-soils-motion.mp4'],
    [lukeLesson, 'luke-15-prodigal', 'media/luke15-lost-sons-motion.mp4'],
    [lukeLesson, 'luke-24-emmaus', 'media/luke24-emmaus-motion.mp4'],
  ];

  for (const [gospel, passageId, src] of expected) {
    const media = gospel.passages.find((passage) => passage.id === passageId)?.media ?? [];
    assert.equal(media.length, 1, `${passageId} should include one focused motion explainer`);
    assert.deepEqual(media.flatMap(mediaDataErrors), []);
    const motion = media[0];
    assert.equal(motion.type, 'video');
    assert.equal(motion.video.src, src);
    assert.equal(motion.video.silent, true);
    assert.ok(motion.video.poster?.src.endsWith('-poster.png'));
    assert.ok((motion.beforeViewing?.length ?? 0) > 0);
    assert.ok((motion.afterViewing?.length ?? 0) > 0);
  }
});

test('John media pilot can be disabled without removing the original passages or Cana media', () => {
  const disabled = applyLessonFeatureFlags(johnLesson, { 'john-media-pilot': false });
  assert.equal(disabled.passages.length, johnLesson.passages.length);
  assert.equal(disabled.passages.filter((passage) => passage.pilot).length, 0);
  assert.equal(disabled.passages.flatMap((passage) => passage.media ?? []).some((item) => item.featureFlag === 'john-media-pilot'), false);
  assert.equal(disabled.passages.find((passage) => passage.id === 'john-2-cana')?.media?.length, 2);
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
