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
    return { ...emptyLessonState(), ...(JSON.parse(value) as Partial<LessonState>) };
  } catch {
    return emptyLessonState();
  }
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
