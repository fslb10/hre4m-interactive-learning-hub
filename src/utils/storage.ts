export type StudentInfo = {
  lastName: string;
  firstName: string;
  period: string;
};

export type PassageResponse = {
  literal: string;
  allegorical: string;
  moral: string;
  anagogical: string;
  exit: string;
  exemplarViewed: boolean;
  evidenceChecklist: string[];
  exemplarReflection: string;
  hintLevel: number;
  mediaResponses: Record<string, string>;
};

export type LessonState = {
  responses: Record<string, PassageResponse>;
  quizAnswers: Record<string, string>;
  sortAnswers: Record<string, string>;
  synthesis: string;
  reflectionChoice: string;
  reflectionResponse: string;
  updatedAt: string;
};

export const emptyPassageResponse = (): PassageResponse => ({
  literal: '',
  allegorical: '',
  moral: '',
  anagogical: '',
  exit: '',
  exemplarViewed: false,
  evidenceChecklist: [],
  exemplarReflection: '',
  hintLevel: 0,
  mediaResponses: {},
});

export const emptyLessonState = (): LessonState => ({
  responses: {},
  quizAnswers: {},
  sortAnswers: {},
  synthesis: '',
  reflectionChoice: '',
  reflectionResponse: '',
  updatedAt: new Date().toISOString(),
});

const studentKey = 'hre4m:student';

const cleanKeyPart = (value: string) => value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

export function lessonStorageKey(lessonId: string, student: StudentInfo): string {
  return `hre4m:${cleanKeyPart(lessonId)}:${cleanKeyPart(student.lastName)}:${cleanKeyPart(student.firstName)}:${cleanKeyPart(student.period)}`;
}

export function loadLastStudent(): StudentInfo | null {
  try {
    const value = localStorage.getItem(studentKey);
    return value ? (JSON.parse(value) as StudentInfo) : null;
  } catch {
    return null;
  }
}

export function saveLastStudent(student: StudentInfo): void {
  localStorage.setItem(studentKey, JSON.stringify(student));
}

export function clearLastStudent(): void {
  localStorage.removeItem(studentKey);
}

export function loadLessonState(lessonId: string, student: StudentInfo): LessonState {
  try {
    const value = localStorage.getItem(lessonStorageKey(lessonId, student));
    if (!value) return emptyLessonState();
    return normalizeLessonState(JSON.parse(value) as Partial<LessonState>);
  } catch {
    return emptyLessonState();
  }
}

export function normalizeLessonState(value: Partial<LessonState>): LessonState {
  const base = emptyLessonState();
  const responses = Object.fromEntries(
    Object.entries(value.responses ?? {}).map(([id, response]) => [
      id,
      { ...emptyPassageResponse(), ...(response as Partial<PassageResponse>) },
    ]),
  );
  return { ...base, ...value, responses };
}

export function saveLessonState(lessonId: string, student: StudentInfo, state: LessonState): void {
  localStorage.setItem(
    lessonStorageKey(lessonId, student),
    JSON.stringify({ ...state, updatedAt: new Date().toISOString() }),
  );
}

export function clearLessonState(lessonId: string, student: StudentInfo): void {
  localStorage.removeItem(lessonStorageKey(lessonId, student));
}

export type LessonBackup = {
  kind: 'hre4m-lesson-backup';
  version: 2;
  lessonId: string;
  exportedAt: string;
  student: StudentInfo;
  state: LessonState;
};

export function createLessonBackup(lessonId: string, student: StudentInfo, state: LessonState): LessonBackup {
  return {
    kind: 'hre4m-lesson-backup',
    version: 2,
    lessonId,
    exportedAt: new Date().toISOString(),
    student,
    state: normalizeLessonState(state),
  };
}

export function parseLessonBackup(value: unknown, expectedLessonId: string): LessonBackup {
  if (!value || typeof value !== 'object') throw new Error('This file is not a valid HRE4M backup.');
  const candidate = value as Partial<LessonBackup>;
  if (candidate.kind !== 'hre4m-lesson-backup' || !candidate.student || !candidate.state) {
    throw new Error('This file is not a valid HRE4M backup.');
  }
  if (candidate.lessonId !== expectedLessonId) {
    throw new Error('This backup belongs to a different Gospel lesson.');
  }
  return {
    kind: 'hre4m-lesson-backup',
    version: 2,
    lessonId: expectedLessonId,
    exportedAt: candidate.exportedAt ?? new Date().toISOString(),
    student: candidate.student,
    state: normalizeLessonState(candidate.state),
  };
}

function recoveryKey(lessonId: string, student: StudentInfo): string {
  return `${lessonStorageKey(lessonId, student)}:recovery`;
}

export function saveRecoverySnapshot(lessonId: string, student: StudentInfo, state: LessonState): void {
  localStorage.setItem(recoveryKey(lessonId, student), JSON.stringify(normalizeLessonState(state)));
}

export function loadRecoverySnapshot(lessonId: string, student: StudentInfo): LessonState | null {
  try {
    const value = localStorage.getItem(recoveryKey(lessonId, student));
    return value ? normalizeLessonState(JSON.parse(value) as Partial<LessonState>) : null;
  } catch {
    return null;
  }
}

export function clearRecoverySnapshot(lessonId: string, student: StudentInfo): void {
  localStorage.removeItem(recoveryKey(lessonId, student));
}
