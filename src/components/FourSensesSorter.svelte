<script lang="ts">
  import type { SortingItem } from '../content/types';

  export let items: SortingItem[];
  export let answers: Record<string, string>;
  export let onAnswer: (id: string, answer: string) => void;

  const senses = ['Literal', 'Allegorical', 'Moral', 'Anagogical'];
  $: correct = items.filter((item) => answers[item.id] === item.answer).length;
</script>

<section class="sorter" aria-labelledby="sorter-title">
  <header>
    <div>
      <p>Quick check · Step 2</p>
      <h2 id="sorter-title">Match each idea to a sense</h2>
      <span>Read each idea. Then choose the Four Sense that fits it best. You can change an answer and try again.</span>
    </div>
    <div class="score"><strong>{correct}</strong><span>of {items.length}<br />matched</span></div>
  </header>

  <div class="sense-key" aria-label="Sense reminder">
    <span><b>L</b> Literal: what happens</span>
    <span><b>A</b> Allegorical: Jesus and salvation</span>
    <span><b>M</b> Moral: how to live</span>
    <span><b>A</b> Anagogical: eternal life and the Kingdom</span>
  </div>

  <div class="sort-list">
    {#each items as item, index}
      <article class:correct={answers[item.id] === item.answer} class:incorrect={answers[item.id] && answers[item.id] !== item.answer}>
        <div class="interpretation"><span>{String(index + 1).padStart(2, '0')}</span><p>{item.text}</p></div>
        <div class="sort-buttons" aria-label={`Choose a sense for statement ${index + 1}`}>
          {#each senses as sense}
            <button class:selected={answers[item.id] === sense} on:click={() => onAnswer(item.id, sense)}>{sense}</button>
          {/each}
        </div>
        {#if answers[item.id]}
          <p class="feedback" role="status">
            {answers[item.id] === item.answer ? `✓ Correct. This idea is ${item.answer}.` : `Not yet. Look for the clue that makes this ${item.answer}.`}
          </p>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style>
  .sorter { display: grid; gap: 20px; }
  header { display: flex; justify-content: space-between; align-items: end; gap: 30px; padding: clamp(28px, 5vw, 48px); border-radius: 24px; background: var(--lesson-primary); color: var(--lesson-surface); }
  header p { margin: 0 0 12px; color: var(--lesson-accent); font-size: .68rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  header h2 { margin: 0 0 12px; font: 400 clamp(2.3rem, 5vw, 4rem)/1 Georgia, serif; letter-spacing: -.04em; }
  header div > span { color: color-mix(in srgb, var(--lesson-surface) 68%, transparent); font-size: .86rem; line-height: 1.6; }
  .score { flex: 0 0 auto; display: flex; align-items: center; gap: 8px; }
  .score strong { color: var(--lesson-accent); font: 400 4.8rem Georgia, serif; }
  .score span { font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; }
  .sense-key { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
  .sense-key span { display: flex; align-items: center; gap: 8px; padding: 10px; border: 1px solid var(--lesson-border); border-radius: 10px; color: var(--lesson-muted); background: var(--lesson-surface); font-size: .72rem; }
  .sense-key b { display: grid; place-items: center; width: 25px; height: 25px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); }
  .sort-list { display: grid; gap: 11px; }
  article { padding: 20px; border: 1px solid var(--lesson-border); border-radius: 16px; background: var(--lesson-surface); }
  article.correct { border-color: #78bda9; }
  article.incorrect { border-color: #d9a2ad; }
  .interpretation { display: grid; grid-template-columns: 38px 1fr; gap: 13px; align-items: start; }
  .interpretation > span { color: var(--lesson-accent); font: 400 1.2rem Georgia, serif; }
  .interpretation p { margin: 0; font: 400 1.05rem/1.5 Georgia, serif; }
  .sort-buttons { display: flex; flex-wrap: wrap; gap: 7px; margin: 16px 0 0 51px; }
  .sort-buttons button { padding: 8px 11px; border: 1px solid var(--lesson-border); border-radius: 999px; background: var(--lesson-background); color: var(--lesson-text); font-size: .72rem; font-weight: 760; cursor: pointer; }
  .sort-buttons button.selected { background: var(--lesson-primary); color: var(--lesson-surface); border-color: var(--lesson-primary); }
  .feedback { margin: 13px 0 0 51px; color: var(--lesson-secondary); font-size: .76rem; font-weight: 700; }
  @media (max-width: 700px) {
    header { display: block; }
    .score { margin-top: 20px; }
    .sense-key { grid-template-columns: 1fr 1fr; }
  }
  @media (max-width: 480px) {
    .sense-key { grid-template-columns: 1fr; }
    .sort-buttons, .feedback { margin-left: 0; }
  }
</style>
