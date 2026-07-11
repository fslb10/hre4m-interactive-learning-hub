import assert from 'node:assert/strict';
import test from 'node:test';
import { assignmentSearch, parseAssignment } from '../src/utils/assignment.ts';
import { completionSummary, literalComplete, passageComplete } from '../src/utils/progress.ts';
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
};

test('assignment links preserve only valid required passages and settings', () => {
  const parsed = parseAssignment(
    '?assignment=1&title=Cana%20Case&passages=john-2-cana,not-real&quiz=0&reflection=0&unlock=1',
    lesson,
  );
  assert.ok(parsed);
  assert.equal(parsed.title, 'Cana Case');
  assert.deepEqual(parsed.passageIds, ['john-2-cana']);
  assert.equal(parsed.requireQuiz, false);
  assert.equal(parsed.requireReflection, false);
  assert.equal(parsed.requireUnlock, true);

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
