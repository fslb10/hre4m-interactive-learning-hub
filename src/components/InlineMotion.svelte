<script lang="ts">
  import { deploymentSafeMediaUrl } from '../utils/media';

  export let id: string;
  export let title: string;
  export let description: string;
  export let src: string;
  export let poster: string;
  export let textAlternative: string;

  const base = import.meta.env.BASE_URL;
  let unavailable = false;

  $: videoUrl = deploymentSafeMediaUrl(src, 'local', base);
  $: posterUrl = deploymentSafeMediaUrl(poster, 'local', base);
</script>

<aside class="inline-motion" aria-labelledby={`${id}-title`}>
  <div class="motion-copy">
    <p>Silent visual explainer</p>
    <h3 id={`${id}-title`}>{title}</h3>
    <span>{description}</span>
  </div>

  {#if unavailable}
    <div class="media-fallback" role="status">
      <strong>Video unavailable</strong>
      <p>{textAlternative}</p>
    </div>
  {:else}
    <video
      controls
      playsinline
      preload="metadata"
      poster={posterUrl}
      aria-label={title}
      on:error={() => (unavailable = true)}
    >
      <source src={videoUrl} type="video/mp4" />
    </video>
  {/if}

  <details>
    <summary>Read the complete visual sequence</summary>
    <p>{textAlternative}</p>
  </details>
</aside>

<style>
  .inline-motion { display: grid; gap: 14px; padding: clamp(20px, 4vw, 30px); border: 1px solid var(--lesson-border); border-radius: 20px; background: var(--lesson-surface); }
  .motion-copy p { margin: 0 0 7px; color: var(--lesson-secondary); font-size: .65rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  .motion-copy h3 { margin: 0 0 8px; font: 400 clamp(1.55rem, 3vw, 2.25rem)/1.1 Georgia, serif; }
  .motion-copy span { color: var(--lesson-muted); font-size: .84rem; line-height: 1.55; }
  video { display: block; width: 100%; aspect-ratio: 16 / 9; border: 1px solid var(--lesson-border); border-radius: 14px; background: #10162d; }
  details { color: var(--lesson-muted); font-size: .78rem; line-height: 1.6; }
  summary { color: var(--lesson-text); font-weight: 750; cursor: pointer; }
  details p, .media-fallback p { margin: 9px 0 0; }
  .media-fallback { padding: 22px; border: 1px dashed var(--lesson-border); border-radius: 14px; background: var(--lesson-background); }
</style>
