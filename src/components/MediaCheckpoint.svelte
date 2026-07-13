<script lang="ts">
  import type { MediaQuestion } from '../content/types';
  import { protectStudentWriting } from '../utils/studentWriting';

  export let mediaId: string;
  export let stage: 'before' | 'after' | 'observation' | 'reflection';
  export let questions: MediaQuestion[] = [];
  export let responses: Record<string, string> = {};
  export let onResponse: (key: string, value: string) => void = () => {};

  const labels = {
    before: 'Before you view',
    after: 'After you view',
    observation: 'What do you notice?',
    reflection: 'Think about what you heard',
  };

  const responseKey = (questionId: string) => `${mediaId}:${stage}:${questionId}`;
</script>

{#if questions.length}
  <section class="checkpoint" aria-label={labels[stage]}>
    <div class="checkpoint-heading"><span aria-hidden="true">{stage === 'before' ? '01' : '✓'}</span><strong>{labels[stage]}</strong></div>
    {#each questions as question}
      <label>
        <span>{question.prompt}</span>
        <textarea
          use:protectStudentWriting
          rows="3"
          value={responses[responseKey(question.id)] ?? ''}
          on:input={(event) => onResponse(responseKey(question.id), event.currentTarget.value)}
          placeholder="Write a short answer in your own words…"
        ></textarea>
      </label>
    {/each}
    <small>Saved with your passage work. Copy and paste are turned off in student writing boxes.</small>
  </section>
{/if}

<style>
  .checkpoint { display: grid; gap: 13px; padding: 17px; border-left: 4px solid var(--lesson-accent); border-radius: 8px 12px 12px 8px; background: color-mix(in srgb, var(--lesson-accent) 8%, var(--lesson-surface)); }
  .checkpoint-heading { display: flex; align-items: center; gap: 9px; color: var(--lesson-secondary); font-size: .74rem; text-transform: uppercase; letter-spacing: .08em; }
  .checkpoint-heading > span { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font: 400 .7rem Georgia, serif; }
  label { display: grid; gap: 7px; color: var(--lesson-text); font-size: .8rem; font-weight: 720; line-height: 1.45; }
  textarea { width: 100%; resize: vertical; padding: 11px 12px; border: 1px solid var(--lesson-border); border-radius: 9px; background: var(--lesson-surface); color: var(--lesson-text); font: inherit; font-weight: 400; line-height: 1.5; }
  small { color: var(--lesson-muted); font-size: .65rem; }
</style>
