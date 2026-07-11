import type { GospelLesson } from '../content/types';
import type { LessonState, PassageResponse } from './storage';

export const LITERAL_MIN = 120;
export const SENSE_MIN = 60;
export const EXIT_MIN = 50;
export const SYNTHESIS_MIN = 180;

export function literalComplete(response?: PassageResponse): boolean {
  return (response?.literal.trim().length ?? 0) >= LITERAL_MIN;
}

export function fourSensesComplete(response?: PassageResponse): boolean {
  if (!response) return false;
  return (
    response.literal.trim().length >= LITERAL_MIN &&
    response.allegorical.trim().length >= SENSE_MIN &&
    response.moral.trim().length >= SENSE_MIN &&
    response.anagogical.trim().length >= SENSE_MIN
  );
}

export function passageComplete(response?: PassageResponse): boolean {
  return fourSensesComplete(response) && (response?.exit.trim().length ?? 0) >= EXIT_MIN;
}

export function completionSummary(lesson: GospelLesson, state: LessonState) {
  const fullPassages = lesson.passages.filter((passage) => passageComplete(state.responses[passage.id])).length;
  const literalPassages = lesson.passages.filter((passage) => literalComplete(state.responses[passage.id])).length;
  const quizCorrect = lesson.quiz.filter((item) => state.quizAnswers[item.id] === item.answer).length;
  const sortCorrect = lesson.sortingActivity.filter((item) => state.sortAnswers[item.id] === item.answer).length;
  const requireSynthesis = lesson.requirements?.synthesis ?? true;
  const requireReflection = lesson.requirements?.reflection ?? true;
  const totalCheckpoints =
    lesson.passages.length * 5 +
    lesson.quiz.length +
    lesson.sortingActivity.length +
    (requireSynthesis ? 1 : 0) +
    (requireReflection ? 1 : 0);
  let completedCheckpoints = 0;

  for (const passage of lesson.passages) {
    const response = state.responses[passage.id];
    if (!response) continue;
    if (response.literal.trim().length >= LITERAL_MIN) completedCheckpoints += 1;
    if (response.allegorical.trim().length >= SENSE_MIN) completedCheckpoints += 1;
    if (response.moral.trim().length >= SENSE_MIN) completedCheckpoints += 1;
    if (response.anagogical.trim().length >= SENSE_MIN) completedCheckpoints += 1;
    if (response.exit.trim().length >= EXIT_MIN) completedCheckpoints += 1;
  }

  completedCheckpoints += Object.keys(state.quizAnswers).length;
  completedCheckpoints += Object.keys(state.sortAnswers).length;
  if (requireSynthesis && state.synthesis.trim().length >= SYNTHESIS_MIN) completedCheckpoints += 1;
  if (requireReflection && state.reflectionChoice && state.reflectionResponse.trim().length >= 100) completedCheckpoints += 1;

  return {
    fullPassages,
    literalPassages,
    quizCorrect,
    sortCorrect,
    percentage: Math.min(100, Math.round((completedCheckpoints / totalCheckpoints) * 100)),
  };
}

export type Badge = {
  id: string;
  icon: string;
  label: string;
  description: string;
  earned: boolean;
};

export function getBadges(lesson: GospelLesson, state: LessonState, loggedIn: boolean): Badge[] {
  const summary = completionSummary(lesson, state);
  const responses = Object.values(state.responses);
  return [
    { id: 'ready', icon: '✦', label: 'Reader Ready', description: 'Entered the learning experience', earned: loggedIn },
    { id: 'context', icon: '⌕', label: 'Context Reader', description: 'Grounded one reading in context', earned: summary.literalPassages >= 1 },
    { id: 'explorer', icon: '◈', label: 'Passage Explorer', description: 'Completed one full passage', earned: summary.fullPassages >= 1 },
    { id: 'builder', icon: '▤', label: 'Exegesis Builder', description: 'Completed three literal readings', earned: summary.literalPassages >= 3 },
    { id: 'scholar', icon: '✣', label: 'Four Senses Scholar', description: 'Completed all four senses once', earned: responses.some(fourSensesComplete) },
    { id: 'reviewer', icon: '◎', label: 'Model Reviewer', description: 'Compared an attempt with an exemplar', earned: responses.some((response) => response.exemplarViewed) },
    { id: 'writer', icon: '✎', label: 'Synthesis Writer', description: 'Completed the final synthesis', earned: state.synthesis.trim().length >= SYNTHESIS_MIN },
    { id: 'gospel', icon: '★', label: 'Gospel Explorer', description: 'Completed every passage', earned: summary.fullPassages === lesson.passages.length },
  ];
}
