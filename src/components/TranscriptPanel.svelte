<script lang="ts">
  import type { MediaCaptions, MediaTranscript } from '../content/types';
  import { deploymentSafeMediaUrl } from '../utils/media';

  export let transcript: MediaTranscript | undefined = undefined;
  export let captions: MediaCaptions | undefined = undefined;

  $: captionUrl = captions?.url
    ? deploymentSafeMediaUrl(
        captions.url,
        captions.hosting ?? (/^https?:\/\//.test(captions.url) ? 'external' : 'local'),
        import.meta.env.BASE_URL,
      )
    : '';

  function timeLabel(seconds?: number) {
    if (seconds === undefined) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  }
</script>

{#if transcript || captions}
  <section class="transcript-panel" aria-label="Transcript and caption information">
    <details>
      <summary>{transcript?.title ?? 'Transcript and captions'}</summary>
      {#if captions}
        <p class="caption-status">
          <strong>Captions:</strong> {captions.available ? `${captions.label} (${captions.language})` : 'Not available'}
          {#if captionUrl}<a href={captionUrl} target="_blank" rel="noreferrer">Caption file <span aria-hidden="true">↗</span></a>{/if}
        </p>
      {/if}
      {#if transcript}
        <div class="transcript-copy" lang={transcript.language}>
          {#each transcript.cues as cue}
            <p>
              {#if cue.startSeconds !== undefined}<span class="timestamp">{timeLabel(cue.startSeconds)}{cue.endSeconds !== undefined ? `–${timeLabel(cue.endSeconds)}` : ''}</span>{/if}
              <span>{cue.text}</span>
            </p>
          {/each}
        </div>
      {/if}
    </details>
  </section>
{/if}

<style>
  .transcript-panel { border: 1px solid var(--lesson-border); border-radius: 12px; background: color-mix(in srgb, var(--lesson-background) 60%, var(--lesson-surface)); }
  details { padding: 14px 16px; }
  summary { color: var(--lesson-secondary); font-size: .78rem; font-weight: 800; cursor: pointer; }
  .caption-status { display: flex; flex-wrap: wrap; gap: 7px 14px; margin: 14px 0; color: var(--lesson-muted); font-size: .74rem; }
  a { color: var(--lesson-secondary); }
  .transcript-copy { max-height: 300px; overflow: auto; padding-right: 8px; }
  .transcript-copy p { display: grid; grid-template-columns: 64px 1fr; gap: 10px; margin: 0; padding: 9px 0; border-top: 1px solid var(--lesson-border); color: var(--lesson-text); font-size: .8rem; line-height: 1.55; }
  .timestamp { color: var(--lesson-secondary); font-variant-numeric: tabular-nums; font-weight: 800; }
  @media (max-width: 520px) { .transcript-copy p { grid-template-columns: 1fr; gap: 3px; } }
</style>
