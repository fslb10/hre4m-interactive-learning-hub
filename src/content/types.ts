export type Difficulty = 'Starter' | 'Intermediate' | 'Challenge';

export type SenseKey = 'literal' | 'allegorical' | 'moral' | 'anagogical';

export type InstructionalPurpose =
  | 'Activate prior knowledge'
  | 'Establish historical context'
  | 'Observe a symbol'
  | 'Compare interpretations'
  | 'Clarify Catholic teaching'
  | 'Prompt textual evidence'
  | 'Prepare for one of the Four Senses';

export type FeatureFlagId = 'john-media-pilot';

export type MediaCredit = {
  sourceName: string;
  sourceUrl?: string;
  creator: string;
  licence: string;
  licenceUrl?: string;
  attribution: string;
};

export type MediaQuestion = {
  id: string;
  prompt: string;
};

export type TranscriptCue = {
  startSeconds?: number;
  endSeconds?: number;
  text: string;
};

export type MediaTranscript = {
  title?: string;
  language: string;
  cues: TranscriptCue[];
};

export type MediaCaptions = {
  available: boolean;
  language: string;
  label: string;
  url?: string;
  hosting?: 'local' | 'external';
};

type BasePassageMedia = {
  id: string;
  title: string;
  instructionalPurpose: InstructionalPurpose;
  optional: boolean;
  placement?: 'hook' | 'study';
  featureFlag?: FeatureFlagId;
  description?: string;
  textAlternative: string;
  beforeViewing?: MediaQuestion[];
  afterViewing?: MediaQuestion[];
  transcript?: MediaTranscript;
  captions?: MediaCaptions;
  credit: MediaCredit;
};

export type ImageHotspot = {
  id: string;
  xPercent: number;
  yPercent: number;
  label: string;
  observation: string;
};

export type GuidedImageMedia = BasePassageMedia & {
  type: 'image';
  images: Array<{
    id: string;
    src: string;
    hosting: 'local' | 'external';
    alt: string;
    width?: number;
    height?: number;
    caption?: string;
    credit?: MediaCredit;
  }>;
  hotspots?: ImageHotspot[];
  observationPrompts?: MediaQuestion[];
};

export type AudioGuideMedia = BasePassageMedia & {
  type: 'audio';
  audio: {
    src: string;
    hosting: 'local' | 'external';
    mimeType: string;
  };
  reflectionPrompts?: MediaQuestion[];
};

export type YouTubeClipMedia = BasePassageMedia & {
  type: 'youtube';
  youtubeId: string;
  startSeconds?: number;
  endSeconds?: number;
  captionLanguage?: string;
  playlistId?: string;
};

export type PassageMedia = GuidedImageMedia | AudioGuideMedia | YouTubeClipMedia;

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
  media?: PassageMedia[];
  pilot?: {
    featureFlag: FeatureFlagId;
    label: string;
    openBibleInstruction: string;
    evidenceChecks: Array<{ id: string; label: string }>;
  };
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
  requirements?: {
    synthesis: boolean;
    reflection: boolean;
  };
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
