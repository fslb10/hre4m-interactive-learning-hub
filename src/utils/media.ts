import type { MediaQuestion, PassageMedia } from '../content/types';

export function deploymentSafeMediaUrl(src: string, hosting: 'local' | 'external', base = '/'): string {
  if (hosting === 'external') return src;
  const safeBase = base.endsWith('/') ? base : `${base}/`;
  return `${safeBase}${src.replace(/^\/+/, '')}`;
}

export function visiblePassageMedia(media: PassageMedia[] | undefined, includeOptional: boolean): PassageMedia[] {
  return (media ?? []).filter((item) => includeOptional || !item.optional);
}

export function youtubeWatchUrl(item: Pick<Extract<PassageMedia, { type: 'youtube' }>, 'youtubeId' | 'startSeconds'>): string {
  const url = new URL('https://www.youtube.com/watch');
  url.searchParams.set('v', item.youtubeId);
  if (item.startSeconds) url.searchParams.set('t', `${item.startSeconds}s`);
  return url.toString();
}

export function youtubeEmbedUrl(
  item: Pick<
    Extract<PassageMedia, { type: 'youtube' }>,
    'youtubeId' | 'startSeconds' | 'endSeconds' | 'captionLanguage' | 'playlistId'
  >,
): string {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}`);
  url.searchParams.set('autoplay', '0');
  url.searchParams.set('cc_load_policy', '1');
  url.searchParams.set('rel', '0');
  if (item.captionLanguage) url.searchParams.set('cc_lang_pref', item.captionLanguage);
  if (item.startSeconds) url.searchParams.set('start', String(Math.max(0, Math.floor(item.startSeconds))));
  if (item.endSeconds) url.searchParams.set('end', String(Math.max(0, Math.floor(item.endSeconds))));
  if (item.playlistId) url.searchParams.set('list', item.playlistId);
  return url.toString();
}

export function mediaDataErrors(media: PassageMedia): string[] {
  const errors: string[] = [];
  if (!media.id.trim()) errors.push('Media id is required.');
  if (!media.title.trim()) errors.push(`${media.id || 'Media'} needs a title.`);
  if (!media.instructionalPurpose) errors.push(`${media.id || 'Media'} needs an instructional purpose.`);
  if (!media.textAlternative.trim()) errors.push(`${media.id || 'Media'} needs a text alternative.`);
  if (!media.credit.sourceName.trim() || !media.credit.sourceUrl?.trim() || !media.credit.creator.trim() || !media.credit.licence.trim() || !media.credit.licenceUrl?.trim() || !media.credit.attribution.trim()) {
    errors.push(`${media.id || 'Media'} needs source, link, creator, licence link, and attribution information.`);
  }
  if (media.type === 'image' && media.images.length === 0) errors.push(`${media.id} needs at least one image.`);
  if (media.type === 'youtube' && !/^[A-Za-z0-9_-]{11}$/.test(media.youtubeId)) {
    errors.push(`${media.id} has an invalid YouTube video id.`);
  }
  if (media.type === 'youtube' && media.endSeconds !== undefined && media.endSeconds <= (media.startSeconds ?? 0)) {
    errors.push(`${media.id} must end after its start time.`);
  }
  return errors;
}

export type MediaResponseEntry = {
  key: string;
  mediaTitle: string;
  stage: 'Before viewing' | 'Observation checkpoint' | 'Audio reflection' | 'After viewing';
  prompt: string;
  response: string;
};

export function mediaResponseEntries(media: PassageMedia[] | undefined, responses: Record<string, string>): MediaResponseEntry[] {
  const entries: MediaResponseEntry[] = [];
  for (const item of media ?? []) {
    const groups: Array<{
      stageKey: 'before' | 'observation' | 'reflection' | 'after';
      stage: MediaResponseEntry['stage'];
      questions: MediaQuestion[];
    }> = [
      { stageKey: 'before', stage: 'Before viewing', questions: item.beforeViewing ?? [] },
      { stageKey: 'after', stage: 'After viewing', questions: item.afterViewing ?? [] },
    ];
    if (item.type === 'image') groups.splice(1, 0, { stageKey: 'observation', stage: 'Observation checkpoint', questions: item.observationPrompts ?? [] });
    if (item.type === 'audio') groups.splice(1, 0, { stageKey: 'reflection', stage: 'Audio reflection', questions: item.reflectionPrompts ?? [] });
    for (const { stageKey, stage, questions } of groups) {
      for (const question of questions) {
        const key = `${item.id}:${stageKey}:${question.id}`;
        const response = responses[key]?.trim() ?? '';
        if (response) entries.push({ key, mediaTitle: item.title, stage, prompt: question.prompt, response });
      }
    }
  }
  return entries;
}
