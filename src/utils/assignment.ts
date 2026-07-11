import type { GospelLesson } from '../content/types';

export type AssignmentConfig = {
  enabled: true;
  title: string;
  dueDate: string;
  period: string;
  passageIds: string[];
  requireQuiz: boolean;
  requireSorter: boolean;
  requireSynthesis: boolean;
  requireReflection: boolean;
  allowExemplars: boolean;
  requireUnlock: boolean;
  includeOptionalMedia: boolean;
};

const boolParam = (params: URLSearchParams, key: string, fallback: boolean) => {
  const value = params.get(key);
  if (value === null) return fallback;
  return value !== '0';
};

export function parseAssignment(search: string, lesson: GospelLesson): AssignmentConfig | null {
  const params = new URLSearchParams(search);
  if (params.get('assignment') !== '1') return null;

  const requestedPassages = (params.get('passages') ?? '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  const validIds = new Set(lesson.passages.map((passage) => passage.id));
  const passageIds = requestedPassages.filter((id) => validIds.has(id));

  return {
    enabled: true,
    title: params.get('title')?.trim() || `${lesson.shortName} Gospel Assignment`,
    dueDate: params.get('due')?.trim() ?? '',
    period: params.get('period')?.trim() ?? '',
    passageIds: passageIds.length ? passageIds : lesson.passages.map((passage) => passage.id),
    requireQuiz: boolParam(params, 'quiz', true),
    requireSorter: boolParam(params, 'sorter', true),
    requireSynthesis: boolParam(params, 'synthesis', true),
    requireReflection: boolParam(params, 'reflection', true),
    allowExemplars: boolParam(params, 'exemplars', true),
    requireUnlock: boolParam(params, 'unlock', true),
    includeOptionalMedia: boolParam(params, 'media', true),
  };
}

export function assignmentSearch(config: AssignmentConfig): string {
  const params = new URLSearchParams({
    assignment: '1',
    title: config.title.trim(),
    passages: config.passageIds.join(','),
    quiz: config.requireQuiz ? '1' : '0',
    sorter: config.requireSorter ? '1' : '0',
    synthesis: config.requireSynthesis ? '1' : '0',
    reflection: config.requireReflection ? '1' : '0',
    exemplars: config.allowExemplars ? '1' : '0',
    unlock: config.requireUnlock ? '1' : '0',
    media: config.includeOptionalMedia ? '1' : '0',
  });

  if (config.dueDate) params.set('due', config.dueDate);
  if (config.period) params.set('period', config.period);
  return params.toString();
}

export function assignmentRequirements(config: AssignmentConfig): string[] {
  const requirements = [`${config.passageIds.length} passage${config.passageIds.length === 1 ? '' : 's'}`];
  if (config.requireQuiz) requirements.push('Exegesis check');
  if (config.requireSorter) requirements.push('Four Senses sorter');
  if (config.requireSynthesis) requirements.push('Mini-exegesis');
  if (config.requireReflection) requirements.push('Choice-board reflection');
  if (config.includeOptionalMedia) requirements.push('Optional media included');
  return requirements;
}
