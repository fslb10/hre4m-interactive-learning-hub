export type Difficulty = 'Starter' | 'Intermediate' | 'Challenge';

export type SenseKey = 'literal' | 'allegorical' | 'moral' | 'anagogical';

export type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  border: string;
};

export type PassagePrompts = {
  literal: string;
  allegorical: string;
  moral: string;
  anagogical: string;
  exit: string;
};

export type GospelPassage = {
  id: string;
  title: string;
  reference: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  anchorPhrase: string;
  contextNotes: string[];
  keyImages: string[];
  catholicConnection: string;
  eisegesisTrap: string;
  teacherNote: string;
  prompts: PassagePrompts;
  exemplars: Record<SenseKey, string>;
};

export type QuizItem = {
  id: string;
  statement: string;
  answer: 'Exegesis' | 'Eisegesis';
  feedback: string;
};

export type SortingItem = {
  id: string;
  text: string;
  answer: 'Literal' | 'Allegorical' | 'Moral' | 'Anagogical';
};

export type GospelLesson = {
  id: string;
  shortName: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  symbol: string;
  theme: {
    name: string;
    motif: string;
    colors: ThemeColors;
  };
  gospelLens: string[];
  passages: GospelPassage[];
  quiz: QuizItem[];
  sortingActivity: SortingItem[];
};

export const defaultPrompts: PassagePrompts = {
  literal:
    'What happens in this passage? Who is involved? What would this have meant in its original Gospel context?',
  allegorical:
    'How does this passage reveal Christ, salvation, the Church, the sacraments, or God’s larger plan?',
  moral:
    'How does this passage teach us to live? What virtue, attitude, or action does it call forth?',
  anagogical:
    'How does this passage point toward heaven, eternal life, resurrection, final judgment, or the fullness of God’s Kingdom?',
  exit:
    'In 2–3 sentences, explain one thing this passage reveals about Jesus in this Gospel.',
};

export function definePassage(
  passage: Omit<GospelPassage, 'prompts'> & { prompts?: Partial<PassagePrompts> },
): GospelPassage {
  return {
    ...passage,
    prompts: { ...defaultPrompts, ...passage.prompts },
  };
}
