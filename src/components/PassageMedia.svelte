<script lang="ts">
  import type { PassageMedia as PassageMediaItem } from '../content/types';
  import AudioGuide from './AudioGuide.svelte';
  import GuidedImage from './GuidedImage.svelte';
  import MediaCard from './MediaCard.svelte';
  import MediaCheckpoint from './MediaCheckpoint.svelte';
  import SourceCredit from './SourceCredit.svelte';
  import TranscriptPanel from './TranscriptPanel.svelte';
  import YouTubeClip from './YouTubeClip.svelte';

  export let media: PassageMediaItem[] = [];
  export let responses: Record<string, string> = {};
  export let onResponse: (key: string, value: string) => void = () => {};
</script>

{#if media.length}
  <section class="passage-media" aria-labelledby="media-section-title">
    <div class="media-heading">
      <p>Media studio</p>
      <h2 id="media-section-title">Look, listen, then return to the text</h2>
      <span>Each item has a specific learning purpose. Your checkpoint notes autosave with this passage.</span>
    </div>

    {#each media as item (item.id)}
      <MediaCard title={item.title} description={item.description ?? ''} purpose={item.instructionalPurpose} optional={item.optional}>
        <MediaCheckpoint mediaId={item.id} stage="before" questions={item.beforeViewing ?? []} {responses} {onResponse} />
        {#if item.type === 'image'}
          <GuidedImage {item} {responses} {onResponse} />
          <TranscriptPanel transcript={item.transcript} captions={item.captions} />
        {:else if item.type === 'audio'}
          <AudioGuide {item} {responses} {onResponse} />
        {:else}
          <YouTubeClip {item} />
        {/if}
        <details class="text-alternative">
          <summary>Text alternative / low-bandwidth route</summary>
          <p>{item.textAlternative}</p>
        </details>
        <MediaCheckpoint mediaId={item.id} stage="after" questions={item.afterViewing ?? []} {responses} {onResponse} />
        <SourceCredit credit={item.credit} />
      </MediaCard>
    {/each}
  </section>
{/if}

<style>
  .passage-media { display: grid; gap: 16px; margin: 16px 0 28px; }
  .media-heading { margin: 12px 0 4px; }
  .media-heading p { margin: 0 0 8px; color: var(--lesson-secondary); font-size: .66rem; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
  .media-heading h2 { margin: 0; font: 400 clamp(2rem, 5vw, 3.4rem)/1 Georgia, serif; letter-spacing: -.035em; }
  .media-heading > span { display: block; max-width: 720px; margin-top: 9px; color: var(--lesson-muted); font-size: .8rem; line-height: 1.55; }
  .text-alternative { padding: 13px 15px; border: 1px dashed var(--lesson-border); border-radius: 11px; background: var(--lesson-background); }
  .text-alternative summary { color: var(--lesson-secondary); font-size: .74rem; font-weight: 800; cursor: pointer; }
  .text-alternative p { margin: 10px 0 0; color: var(--lesson-muted); font-size: .79rem; line-height: 1.6; }
</style>
