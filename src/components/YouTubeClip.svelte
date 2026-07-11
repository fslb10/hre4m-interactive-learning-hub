<script lang="ts">
  import type { YouTubeClipMedia } from '../content/types';
  import { youtubeEmbedUrl, youtubeWatchUrl } from '../utils/media';
  import TranscriptPanel from './TranscriptPanel.svelte';

  export let item: YouTubeClipMedia;

  let loaded = false;
  const embedUrl = youtubeEmbedUrl(item);
  const watchUrl = youtubeWatchUrl(item);
  const clipLabel = item.startSeconds !== undefined
    ? `Clip begins at ${item.startSeconds} seconds${item.endSeconds !== undefined ? ` and ends at ${item.endSeconds} seconds` : ''}.`
    : 'Full video.';
</script>

<div class="youtube-clip">
  <div class="player-shell">
    {#if loaded}
      <iframe
        src={embedUrl}
        title={item.title}
        loading="lazy"
        allow="encrypted-media; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    {:else}
      <div class="click-to-load">
        <span aria-hidden="true">▶</span>
        <strong>Load privacy-enhanced YouTube player</strong>
        <p>The player connects to youtube-nocookie.com only after you choose to load it. It will not autoplay.</p>
        <button on:click={() => (loaded = true)}>Load video</button>
      </div>
    {/if}
  </div>
  <div class="video-links">
    <span>{clipLabel} Captions are requested by default.</span>
    <a href={watchUrl} target="_blank" rel="noreferrer">Open directly on YouTube if embedding is blocked <span aria-hidden="true">↗</span></a>
  </div>
  <TranscriptPanel transcript={item.transcript} captions={item.captions} />
</div>

<style>
  .youtube-clip { display: grid; gap: 13px; }
  .player-shell { position: relative; width: 100%; aspect-ratio: 16 / 9; overflow: hidden; border-radius: 14px; background: #11162a; color: white; }
  iframe { width: 100%; height: 100%; border: 0; }
  .click-to-load { position: absolute; inset: 0; display: grid; place-content: center; justify-items: center; padding: 25px; text-align: center; }
  .click-to-load > span { display: grid; place-items: center; width: 55px; height: 55px; margin-bottom: 13px; border: 1px solid #e3bb65; border-radius: 50%; color: #e3bb65; }
  .click-to-load strong { font: 400 clamp(1.15rem, 3vw, 1.7rem) Georgia, serif; }
  .click-to-load p { max-width: 520px; margin: 8px 0 15px; color: #bcc4df; font-size: .72rem; line-height: 1.5; }
  .click-to-load button { min-height: 41px; padding: 0 15px; border: 0; border-radius: 999px; background: #e3bb65; color: #11162a; cursor: pointer; font-weight: 850; }
  .video-links { display: grid; gap: 5px; color: var(--lesson-muted); font-size: .7rem; line-height: 1.45; }
  .video-links a { width: fit-content; color: var(--lesson-secondary); font-weight: 800; }
</style>
