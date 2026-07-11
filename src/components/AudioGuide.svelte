<script lang="ts">
  import type { AudioGuideMedia } from '../content/types';
  import { deploymentSafeMediaUrl } from '../utils/media';
  import MediaCheckpoint from './MediaCheckpoint.svelte';
  import TranscriptPanel from './TranscriptPanel.svelte';

  export let item: AudioGuideMedia;
  export let responses: Record<string, string> = {};
  export let onResponse: (key: string, value: string) => void = () => {};

  const audioUrl = deploymentSafeMediaUrl(item.audio.src, item.audio.hosting, import.meta.env.BASE_URL);
  let unavailable = false;
</script>

<div class="audio-guide">
  {#if unavailable}
    <div class="media-fallback" role="status"><strong>Audio unavailable</strong><p>{item.textAlternative}</p></div>
  {:else}
    <audio controls preload="metadata" on:error={() => (unavailable = true)}>
      <source src={audioUrl} type={item.audio.mimeType} />
      {item.textAlternative}
    </audio>
    <p class="control-note">Audio never starts automatically. Use the player controls to pause, replay, or adjust volume.</p>
  {/if}
  <TranscriptPanel transcript={item.transcript} captions={item.captions} />
  <MediaCheckpoint mediaId={item.id} stage="reflection" questions={item.reflectionPrompts ?? []} {responses} {onResponse} />
</div>

<style>
  .audio-guide { display: grid; gap: 14px; }
  audio { width: 100%; accent-color: var(--lesson-secondary); }
  .control-note { margin: -4px 0 0; color: var(--lesson-muted); font-size: .68rem; line-height: 1.45; }
  .media-fallback { padding: 22px; border: 1px dashed var(--lesson-border); border-radius: 12px; background: var(--lesson-background); }
  .media-fallback p { margin: 7px 0 0; color: var(--lesson-muted); line-height: 1.55; }
</style>
