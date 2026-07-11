<script lang="ts">
  import type { InstructionalPurpose } from '../content/types';

  export let title: string;
  export let description = '';
  export let purpose: InstructionalPurpose;
  export let optional = false;
</script>

<article class="media-card">
  <header>
    <div>
      <p>Guided media {#if optional}<span>Optional</span>{/if}</p>
      <h3>{title}</h3>
      {#if description}<div>{description}</div>{/if}
    </div>
    <aside><small>Instructional purpose</small><strong>{purpose}</strong></aside>
  </header>
  <div class="media-body"><slot /></div>
</article>

<style>
  .media-card { overflow: hidden; border: 1px solid var(--lesson-border); border-radius: 20px; background: var(--lesson-surface); box-shadow: 0 14px 40px color-mix(in srgb, var(--lesson-primary) 7%, transparent); }
  header { display: grid; grid-template-columns: minmax(0, 1fr) minmax(190px, .35fr); gap: 24px; align-items: start; padding: 24px; border-bottom: 1px solid var(--lesson-border); }
  header p { margin: 0 0 8px; color: var(--lesson-secondary); font-size: .64rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  header p span { margin-left: 7px; padding: 4px 7px; border-radius: 999px; background: color-mix(in srgb, var(--lesson-accent) 20%, transparent); color: var(--lesson-text); }
  h3 { margin: 0; font: 400 1.8rem/1.05 Georgia, serif; }
  header div > div { margin-top: 9px; color: var(--lesson-muted); font-size: .8rem; line-height: 1.55; }
  aside { padding: 12px 14px; border-radius: 10px; background: color-mix(in srgb, var(--lesson-secondary) 8%, var(--lesson-background)); }
  aside small, aside strong { display: block; }
  aside small { color: var(--lesson-muted); font-size: .58rem; text-transform: uppercase; letter-spacing: .09em; }
  aside strong { margin-top: 5px; color: var(--lesson-secondary); font-size: .72rem; line-height: 1.35; }
  .media-body { display: grid; gap: 16px; padding: 24px; }
  @media (max-width: 680px) { header { grid-template-columns: 1fr; } aside { width: fit-content; } }
</style>
