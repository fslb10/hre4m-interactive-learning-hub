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

export type MotionGraphicMedia = BasePassageMedia & {
  type: 'video';
  video: {
    src: string;
    hosting: 'local' | 'external';
    mimeType: string;
    silent: boolean;
    width?: number;
    height?: number;
    poster?: {
      src: string;
      hosting: 'local' | 'external';
    };
  };
};

export type PassageMedia = GuidedImageMedia | AudioGuideMedia | MotionGraphicMedia | YouTubeClipMedia;

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
    'What happens in this passage? Name the main people, place, and action. Use at least one detail from the text.',
  allegorical:
    'What does this passage show about Jesus, salvation, the Church, or the sacraments?',
  moral:
    'How does this passage ask people to live? Name one attitude or action it calls for.',
  anagogical:
    'How does this passage point to resurrection, eternal life, or God’s completed Kingdom?',
  exit:
    'In 2–3 sentences, explain one important thing this passage shows about Jesus.',
};

export function definePassage(
  passage: Omit<GospelPassage, 'prompts'> & { prompts?: Partial<PassagePrompts> },
): GospelPassage {
  return {
    ...passage,
    prompts: { ...defaultPrompts, ...passage.prompts },
  };
}
