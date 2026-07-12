import type { FeatureFlagId, GospelLesson } from '../content/types';

export type FeatureFlags = Record<FeatureFlagId, boolean>;

export const featureFlags: FeatureFlags = {
  'john-media-pilot': import.meta.env?.PUBLIC_ENABLE_JOHN_MEDIA_PILOT !== 'false',
};

export function applyLessonFeatureFlags(lesson: GospelLesson, flags: FeatureFlags = featureFlags): GospelLesson {
  return {
    ...lesson,
    passages: lesson.passages.map((passage) => {
      const pilotEnabled = !passage.pilot || flags[passage.pilot.featureFlag];
      return {
        ...passage,
        pilot: pilotEnabled ? passage.pilot : undefined,
        media: passage.media?.filter((item) => !item.featureFlag || flags[item.featureFlag]),
      };
    }),
  };
}
