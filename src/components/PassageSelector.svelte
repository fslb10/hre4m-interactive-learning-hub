<script lang="ts">
  import type { GospelPassage } from '../content/types';
  import type { PassageResponse } from '../utils/storage';
  import { literalComplete, passageComplete } from '../utils/progress';

  export let passages: GospelPassage[];
  export let responses: Record<string, PassageResponse>;
  export let onSelect: (id: string) => void;

  const difficultyClass = (value: string) => value.toLowerCase();
</script>

<section aria-labelledby="passages-title">
  <div class="selector-heading">
    <div>
      <p>Guided passages</p>
      <h2 id="passages-title">Choose what to read next</h2>
    </div>
    <p>Open the reference in your NRSV / NRSV-CE Bible. The hub will guide you through five short writing steps.</p>
  </div>

  <div class="passage-grid">
    {#each passages as passage, index}
      <button class:complete={passageComplete(responses[passage.id])} on:click={() => onSelect(passage.id)}>
        <span class="card-top">
          <b>PASSAGE {String(index + 1).padStart(2, '0')}</b>
          <i class={difficultyClass(passage.difficulty)}>{passage.difficulty}</i>
        </span>
        <span class="passage-main">
          <small>{passage.reference}</small>
          <strong>{passage.title}</strong>
          <em>{passage.anchorPhrase}</em>
        </span>
        <span class="card-bottom">
          <span>{passage.estimatedMinutes} min · {passage.keyImages.slice(0, 2).join(' + ')}</span>
          <b aria-label={passageComplete(responses[passage.id]) ? 'Complete' : literalComplete(responses[passage.id]) ? 'In progress' : 'Not started'}>
            {passageComplete(responses[passage.id]) ? '✓' : literalComplete(responses[passage.id]) ? '◐' : '→'}
          </b>
        </span>
      </button>
    {/each}
  </div>
</section>

<style>
  .selector-heading { display: flex; justify-content: space-between; align-items: end; gap: 40px; margin-bottom: 28px; }
  .selector-heading > div > p { margin: 0 0 10px; color: var(--lesson-secondary); font-size: .68rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  .selector-heading h2 { margin: 0; font: 400 clamp(2.2rem, 5vw, 3.7rem)/1 Georgia, serif; letter-spacing: -.04em; }
  .selector-heading > p { max-width: 420px; margin: 0; color: var(--lesson-muted); font-size: .86rem; line-height: 1.65; }
  .passage-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
  button {
    min-height: 285px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    border: 1px solid var(--lesson-border);
    border-radius: 18px;
    background: var(--lesson-surface);
    color: var(--lesson-text);
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 12px 34px color-mix(in srgb, var(--lesson-primary) 6%, transparent);
    transition: transform .2s ease, border-color .2s ease;
  }
  button:hover { transform: translateY(-4px); border-color: var(--lesson-accent); }
  button.complete { border-color: color-mix(in srgb, var(--lesson-secondary) 60%, var(--lesson-border)); }
  .card-top, .passage-main, .card-bottom { width: 100%; display: flex; }
  .card-top { justify-content: space-between; align-items: center; padding: 17px 19px; border-bottom: 1px solid var(--lesson-border); }
  .card-top b { color: var(--lesson-muted); font-size: .64rem; letter-spacing: .13em; }
  .card-top i { padding: 5px 8px; border-radius: 999px; font-size: .62rem; font-style: normal; font-weight: 800; }
  .starter { color: #176f5a; background: #dff4eb; }
  .intermediate { color: #7c5b14; background: #f7edcf; }
  .challenge { color: #8c3245; background: #f8dfe6; }
  .passage-main { flex-direction: column; padding: 24px 22px; }
  .passage-main small { color: var(--lesson-secondary); font-weight: 800; }
  .passage-main strong { margin: 12px 0 8px; font: 400 clamp(1.65rem, 3vw, 2.25rem)/1.05 Georgia, serif; }
  .passage-main em { color: var(--lesson-muted); font-size: .83rem; line-height: 1.55; font-style: normal; }
  .card-bottom { align-items: center; justify-content: space-between; padding: 14px 18px; background: color-mix(in srgb, var(--lesson-background) 62%, var(--lesson-surface)); }
  .card-bottom > span { color: var(--lesson-muted); font-size: .7rem; }
  .card-bottom b { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); }
  @media (max-width: 760px) {
    .selector-heading { display: block; }
    .selector-heading > p { margin-top: 18px; }
    .passage-grid { grid-template-columns: 1fr; }
  }
</style>
