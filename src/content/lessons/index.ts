import type { GospelLesson } from '../types';
import { johnLesson } from './john';
import { lukeLesson } from './luke';
import { markLesson } from './mark';
import { matthewLesson } from './matthew';
import { applyLessonFeatureFlags } from '../../utils/features';

export const gospelLessons: GospelLesson[] = [johnLesson, markLesson, matthewLesson, lukeLesson].map((lesson) =>
  applyLessonFeatureFlags(lesson),
);

export const gospelLessonBySlug = Object.fromEntries(
  gospelLessons.map((lesson) => [lesson.shortName.toLowerCase(), lesson]),
) as Record<string, GospelLesson>;
