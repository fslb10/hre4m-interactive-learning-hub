<script lang="ts">
  import type { GuidedImageMedia } from '../content/types';
  import { deploymentSafeMediaUrl } from '../utils/media';
  import MediaCheckpoint from './MediaCheckpoint.svelte';
  import SourceCredit from './SourceCredit.svelte';

  export let item: GuidedImageMedia;
  export let responses: Record<string, string> = {};
  export let onResponse: (key: string, value: string) => void = () => {};

  const base = import.meta.env.BASE_URL;
  let currentIndex = 0;
  let unavailable = false;
  let activeHotspot = '';

  $: currentImage = item.images[currentIndex] ?? item.images[0];
  $: imageUrl = currentImage ? deploymentSafeMediaUrl(currentImage.src, currentImage.hosting, base) : '';

  function selectImage(index: number) {
    currentIndex = index;
    unavailable = false;
    activeHotspot = '';
  }
</script>

<div class="guided-image">
  {#if unavailable || !currentImage}
    <div class="media-fallback" role="status">
      <strong>Image unavailable</strong>
      <p>{item.textAlternative}</p>
    </div>
  {:else}
    <figure>
      <div class="image-stage">
        <img
          src={imageUrl}
          alt={currentImage.alt}
          width={currentImage.width}
          height={currentImage.height}
          loading="lazy"
          decoding="async"
          on:error={() => (unavailable = true)}
        />
        {#if currentIndex === 0}
          {#each item.hotspots ?? [] as hotspot, index}
            <button
              class="hotspot"
              class:active={activeHotspot === hotspot.id}
              style={`--x:${hotspot.xPercent}%;--y:${hotspot.yPercent}%`}
              aria-pressed={activeHotspot === hotspot.id}
              aria-label={`${hotspot.label}: ${hotspot.observation}`}
              on:click={() => (activeHotspot = activeHotspot === hotspot.id ? '' : hotspot.id)}
            >
              <span aria-hidden="true">{index + 1}</span>
            </button>
          {/each}
        {/if}
      </div>
      {#if currentImage.caption}<figcaption>{currentImage.caption}</figcaption>{/if}
    </figure>

    {#if item.images.length > 1}
      <div class="gallery-controls" aria-label="Image gallery">
        {#each item.images as image, index}
          <button class:active={currentIndex === index} aria-pressed={currentIndex === index} on:click={() => selectImage(index)}>
            {index + 1}. {image.caption ?? `Image ${index + 1}`}
          </button>
        {/each}
      </div>
    {/if}

    {#if activeHotspot}
      {@const hotspot = item.hotspots?.find((candidate) => candidate.id === activeHotspot)}
      {#if hotspot}<div class="hotspot-note" role="status"><strong>{hotspot.label}</strong><span>{hotspot.observation}</span></div>{/if}
    {/if}
    {#if currentImage.credit}<SourceCredit credit={currentImage.credit} />{/if}
  {/if}

  <MediaCheckpoint mediaId={item.id} stage="observation" questions={item.observationPrompts ?? []} {responses} {onResponse} />
</div>

<style>
  .guided-image { display: grid; gap: 14px; }
  figure { margin: 0; }
  .image-stage { position: relative; overflow: hidden; border-radius: 14px; background: var(--lesson-background); }
  img { display: block; width: 100%; height: auto; }
  figcaption { margin-top: 8px; color: var(--lesson-muted); font-size: .72rem; line-height: 1.5; }
  .hotspot { position: absolute; left: var(--x); top: var(--y); translate: -50% -50%; display: grid; place-items: center; width: 34px; height: 34px; border: 3px solid white; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); box-shadow: 0 3px 13px rgba(0,0,0,.28); cursor: pointer; font-weight: 900; }
  .hotspot.active { background: var(--lesson-accent); color: var(--lesson-primary); }
  .hotspot-note { display: grid; gap: 4px; padding: 13px 15px; border-radius: 10px; background: color-mix(in srgb, var(--lesson-secondary) 9%, var(--lesson-background)); }
  .hotspot-note strong { color: var(--lesson-secondary); font-size: .75rem; }
  .hotspot-note span { color: var(--lesson-muted); font-size: .78rem; line-height: 1.5; }
  .gallery-controls { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 3px; }
  .gallery-controls button { flex: 0 0 auto; padding: 8px 11px; border: 1px solid var(--lesson-border); border-radius: 999px; background: var(--lesson-surface); color: var(--lesson-muted); cursor: pointer; font-size: .69rem; }
  .gallery-controls button.active { border-color: var(--lesson-secondary); color: var(--lesson-secondary); font-weight: 800; }
  .media-fallback { padding: 25px; border: 1px dashed var(--lesson-border); border-radius: 13px; background: var(--lesson-background); }
  .media-fallback p { margin: 7px 0 0; color: var(--lesson-muted); line-height: 1.6; }
</style>
