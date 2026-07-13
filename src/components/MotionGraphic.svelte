<script lang="ts">
  import type { MotionGraphicMedia } from '../content/types';
  import { deploymentSafeMediaUrl } from '../utils/media';
  import TranscriptPanel from './TranscriptPanel.svelte';

  export let item: MotionGraphicMedia;

  const base = import.meta.env.BASE_URL;
  let unavailable = false;

  $: videoUrl = deploymentSafeMediaUrl(item.video.src, item.video.hosting, base);
  $: posterUrl = item.video.poster
    ? deploymentSafeMediaUrl(item.video.poster.src, item.video.poster.hosting, base)
    : undefined;
  $: captionUrl = item.captions?.url
    ? deploymentSafeMediaUrl(item.captions.url, item.captions.hosting ?? 'external', base)
    : undefined;
</script>

<div class="motion-graphic">
  {#if unavailable}
    <div class="media-fallback" role="status">
      <strong>Motion graphic unavailable</strong>
      <p>{item.textAlternative}</p>
    </div>
  {:else}
    <figure>
      <div class="video-stage">
        <video
          controls
          playsinline
          preload="metadata"
          poster={posterUrl}
          aria-label={item.title}
          aria-describedby={`motion-note-${item.id}`}
          on:error={() => (unavailable = true)}
        >
          <source src={videoUrl} type={item.video.mimeType} />
          {#if item.captions?.available && captionUrl}
            <track kind="captions" src={captionUrl} srclang={item.captions.language} label={item.captions.label} default />
          {/if}
        </video>
      </div>
      <figcaption id={`motion-note-${item.id}`}>
        {item.video.silent
          ? 'Silent motion graphic. Use the player controls to pause, replay, or scrub; the complete visual sequence is described in the text alternative below.'
          : 'Use the player controls to pause, replay, scrub, or adjust volume.'}
      </figcaption>
    </figure>
  {/if}

  <TranscriptPanel transcript={item.transcript} captions={item.captions} />
</div>

<style>
  .motion-graphic { display: grid; gap: 12px; }
  figure { margin: 0; }
  .video-stage { overflow: hidden; border: 1px solid var(--lesson-border); border-radius: 14px; background: #10162d; box-shadow: 0 16px 34px color-mix(in srgb, var(--lesson-primary) 12%, transparent); }
  video { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; background: #10162d; }
  figcaption { margin-top: 8px; color: var(--lesson-muted); font-size: .72rem; line-height: 1.5; }
  .media-fallback { padding: 25px; border: 1px dashed var(--lesson-border); border-radius: 13px; background: var(--lesson-background); }
  .media-fallback p { margin: 7px 0 0; color: var(--lesson-muted); line-height: 1.6; }
</style>
