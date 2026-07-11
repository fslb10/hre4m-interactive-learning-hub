import type { GospelLesson } from '../content/types';
import type { LessonState, StudentInfo } from './storage';
import { completionSummary } from './progress';

const heading = (value: string) => `\n${value.toUpperCase()}\n${'—'.repeat(Math.min(value.length, 60))}`;

export function buildStudentExport(lesson: GospelLesson, student: StudentInfo, state: LessonState): string {
  const summary = completionSummary(lesson, state);
  const lines = [
    'HRE4M INTERACTIVE LEARNING HUB',
    lesson.title,
    '',
    `Student: ${student.lastName}, ${student.firstName}`,
    `Period: ${student.period}`,
    `Exported: ${new Date().toLocaleString()}`,
    `Progress: ${summary.percentage}% · ${summary.fullPassages}/${lesson.passages.length} passages complete`,
  ];

  for (const passage of lesson.passages) {
    const response = state.responses[passage.id];
    if (!response || !Object.values(response).some(Boolean)) continue;
    lines.push(heading(`${passage.reference} — ${passage.title}`));
    if (response.literal.trim()) lines.push(`\nLiteral / Context\n${response.literal.trim()}`);
    if (response.allegorical.trim()) lines.push(`\nAllegorical\n${response.allegorical.trim()}`);
    if (response.moral.trim()) lines.push(`\nMoral\n${response.moral.trim()}`);
    if (response.anagogical.trim()) lines.push(`\nAnagogical\n${response.anagogical.trim()}`);
    if (response.exit.trim()) lines.push(`\nExit Check\n${response.exit.trim()}`);
    if (response.exemplarReflection.trim()) lines.push(`\nExemplar Comparison Reflection\n${response.exemplarReflection.trim()}`);
  }

  if (state.synthesis.trim()) lines.push(heading('Final Synthesis'), `\n${state.synthesis.trim()}`);
  if (state.reflectionResponse.trim()) {
    lines.push(heading('Reflection Choice'), `\n${state.reflectionChoice}`, `\n${state.reflectionResponse.trim()}`);
  }

  lines.push(heading('Interactive Checks'));
  lines.push(`\nExegesis / Eisegesis: ${summary.quizCorrect}/${lesson.quiz.length} correct`);
  lines.push(`Four Senses Sorter: ${summary.sortCorrect}/${lesson.sortingActivity.length} correct`);

  return lines.join('\n');
}

export function exportFilename(lesson: GospelLesson, student: StudentInfo): string {
  const clean = (value: string) => value.trim().toUpperCase().replace(/[^A-Z0-9]+/g, '_');
  return `${clean(student.lastName)}_${clean(student.firstName)}_${clean(student.period)}_${clean(lesson.shortName)}_EXEGESIS_FOUR_SENSES.txt`;
}
