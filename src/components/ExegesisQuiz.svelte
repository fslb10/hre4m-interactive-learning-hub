<script lang="ts">
  import type { QuizItem } from '../content/types';

  export let items: QuizItem[];
  export let answers: Record<string, string>;
  export let onAnswer: (id: string, answer: string) => void;

  $: correct = items.filter((item) => answers[item.id] === item.answer).length;
</script>

<section class="quiz-shell" aria-labelledby="quiz-title">
  <header>
    <div>
      <p>Interactive check 01</p>
      <h2 id="quiz-title">Text evidence or reader projection?</h2>
      <span>Choose exegesis when the claim grows from the passage. Choose eisegesis when it imports an unsupported assumption.</span>
    </div>
    <div class="score"><strong>{correct}</strong><span>/{items.length}<br />correct</span></div>
  </header>

  <div class="quiz-list">
    {#each items as item, index}
      <article class:answered={answers[item.id]} class:correct={answers[item.id] === item.answer} class:incorrect={answers[item.id] && answers[item.id] !== item.answer}>
        <span class="question-number">{String(index + 1).padStart(2, '0')}</span>
        <div class="question-content">
          <p>{item.statement}</p>
          <div class="choices">
            {#each ['Exegesis', 'Eisegesis'] as choice}
              <button
                class:selected={answers[item.id] === choice}
                on:click={() => onAnswer(item.id, choice)}
                aria-pressed={answers[item.id] === choice}
              >{choice}</button>
            {/each}
          </div>
          {#if answers[item.id]}
            <div class="feedback" role="status">
              <b>{answers[item.id] === item.answer ? '✓ Correct' : `Try again · This is ${item.answer}`}</b>
              <span>{item.feedback}</span>
            </div>
          {/if}
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .quiz-shell { display: grid; gap: 24px; }
  header { display: flex; justify-content: space-between; gap: 30px; align-items: end; padding: clamp(28px, 5vw, 48px); border-radius: 24px; background: var(--lesson-primary); color: var(--lesson-surface); }
  header p { margin: 0 0 12px; color: var(--lesson-accent); font-size: .68rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  header h2 { max-width: 720px; margin: 0 0 14px; font: 400 clamp(2.3rem, 5vw, 4rem)/1 Georgia, serif; letter-spacing: -.04em; }
  header div > span { display: block; max-width: 690px; color: color-mix(in srgb, var(--lesson-surface) 68%, transparent); line-height: 1.6; font-size: .86rem; }
  .score { flex: 0 0 auto; display: flex; align-items: center; gap: 6px; }
  .score strong { font: 400 4.8rem Georgia, serif; color: var(--lesson-accent); }
  .score span { font-size: .7rem; text-transform: uppercase; letter-spacing: .08em; }
  .quiz-list { display: grid; gap: 12px; }
  article { display: grid; grid-template-columns: 52px 1fr; gap: 20px; padding: 24px; border: 1px solid var(--lesson-border); border-radius: 17px; background: var(--lesson-surface); }
  article.correct { border-color: #78bda9; }
  article.incorrect { border-color: #d9a2ad; }
  .question-number { color: var(--lesson-accent); font: 400 1.45rem Georgia, serif; }
  .question-content > p { margin: 0 0 17px; font: 400 1.12rem/1.5 Georgia, serif; }
  .choices { display: flex; gap: 8px; }
  .choices button { padding: 9px 13px; border: 1px solid var(--lesson-border); border-radius: 999px; background: var(--lesson-background); color: var(--lesson-text); font-weight: 750; font-size: .76rem; cursor: pointer; }
  .choices button.selected { border-color: var(--lesson-primary); background: var(--lesson-primary); color: var(--lesson-surface); }
  .feedback { margin-top: 16px; display: grid; gap: 4px; padding: 12px 14px; border-radius: 10px; background: color-mix(in srgb, var(--lesson-secondary) 9%, var(--lesson-background)); }
  .feedback b { color: var(--lesson-secondary); font-size: .77rem; }
  .feedback span { color: var(--lesson-muted); font-size: .76rem; line-height: 1.5; }
  @media (max-width: 650px) {
    header { display: block; }
    .score { margin-top: 20px; }
    article { grid-template-columns: 1fr; gap: 8px; }
  }
</style>
