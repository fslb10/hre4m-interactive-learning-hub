<script lang="ts">
  import type { GospelPassage, SenseKey } from '../content/types';
  import type { PassageResponse } from '../utils/storage';
  import { EXIT_MIN, LITERAL_MIN, SENSE_MIN } from '../utils/progress';

  export let passage: GospelPassage;
  export let response: PassageResponse;
  export let teacherMode = false;
  export let onChange: (response: PassageResponse) => void;
  export let onBack: () => void;

  let showTrap = false;
  let showExemplar = false;
  let exemplarMessage = '';
  let activeId = passage.id;

  $: if (passage.id !== activeId) {
    activeId = passage.id;
    showTrap = false;
    showExemplar = false;
    exemplarMessage = '';
  }

  $: literalLength = response.literal.trim().length;
  $: unlocked = teacherMode || literalLength >= LITERAL_MIN;
  $: attemptedDeeper = [response.allegorical, response.moral, response.anagogical].some(
    (value) => value.trim().length >= 30,
  );

  function update(field: keyof PassageResponse, value: string | boolean) {
    onChange({ ...response, [field]: value });
  }

  function requestExemplar() {
    if (!teacherMode && (!unlocked || !attemptedDeeper)) {
      exemplarMessage = 'Ground your reading in context, then attempt at least one deeper sense before comparing.';
      return;
    }
    exemplarMessage = '';
    showExemplar = !showExemplar;
    if (!response.exemplarViewed) update('exemplarViewed', true);
  }

  const senseMeta: Array<{ key: SenseKey; number: string; title: string; hint: string }> = [
    { key: 'allegorical', number: '02', title: 'Allegorical', hint: 'Christ · salvation · Church · sacraments' },
    { key: 'moral', number: '03', title: 'Moral', hint: 'Virtue · action · discipleship' },
    { key: 'anagogical', number: '04', title: 'Anagogical', hint: 'Hope · resurrection · Kingdom fulfilled' },
  ];
</script>

<article class="case-file">
  <button class="back-button" on:click={onBack}><span aria-hidden="true">←</span> Passage library</button>

  <header class="case-header">
    <div class="case-labels">
      <span>{passage.difficulty}</span>
      <span>{passage.estimatedMinutes} minutes</span>
    </div>
    <p>{passage.reference}</p>
    <h2>{passage.title}</h2>
    <blockquote>{passage.anchorPhrase}</blockquote>
    <div class="open-bible">
      <b aria-hidden="true">↗</b>
      <span><strong>Open your Bible first</strong>Read {passage.reference} carefully in the NRSV / NRSV-CE before responding.</span>
    </div>
  </header>

  <div class="evidence-grid">
    <section>
      <p class="card-label">Context evidence</p>
      <ul>
        {#each passage.contextNotes as note}<li>{note}</li>{/each}
      </ul>
    </section>
    <section>
      <p class="card-label">Images to track</p>
      <div class="image-chips">{#each passage.keyImages as image}<span>{image}</span>{/each}</div>
      <p class="track-note">Where does each image appear, change, or create contrast?</p>
    </section>
  </div>

  <div class="insight-grid">
    <section class="connection-card">
      <span class="insight-icon" aria-hidden="true">✣</span>
      <div><p>Catholic connection</p><h3>Faith seeking understanding</h3><span>{passage.catholicConnection}</span></div>
    </section>
    <section class="trap-card">
      <span class="insight-icon" aria-hidden="true">!</span>
      <div>
        <p>Common eisegesis trap</p>
        <h3>Check the assumption</h3>
        <button on:click={() => (showTrap = !showTrap)} aria-expanded={showTrap}>{showTrap ? 'Hide warning' : 'Reveal warning'}</button>
      </div>
      {#if showTrap}<span class="trap-copy">{passage.eisegesisTrap}</span>{/if}
    </section>
  </div>

  {#if teacherMode}
    <aside class="teacher-note"><b>Teacher note</b><span>{passage.teacherNote}</span></aside>
  {/if}

  <section class="response-lab" aria-labelledby="response-title">
    <div class="response-heading">
      <div><p>Guided interpretation</p><h2 id="response-title">Build your reading in layers</h2></div>
      <div class="step-dots" aria-label="Response progress">
        <span class:done={response.literal.trim().length >= LITERAL_MIN}>1</span>
        <span class:done={response.allegorical.trim().length >= SENSE_MIN}>2</span>
        <span class:done={response.moral.trim().length >= SENSE_MIN}>3</span>
        <span class:done={response.anagogical.trim().length >= SENSE_MIN}>4</span>
        <span class:done={response.exit.trim().length >= EXIT_MIN}>5</span>
      </div>
    </div>

    <div class="response-card literal-card">
      <div class="response-title"><b>01</b><span><strong>Literal / Context</strong><em>Begin with what the text communicates.</em></span></div>
      <p>{passage.prompts.literal}</p>
      <textarea
        value={response.literal}
        on:input={(event) => update('literal', event.currentTarget.value)}
        rows="7"
        placeholder="Identify actions, people, setting, conflict, repeated language, and the passage’s role in this Gospel…"
        aria-label="Literal and context response"
      ></textarea>
      <div class="writing-status">
        <span>{literalLength} characters</span>
        <span class:ready={unlocked}>{unlocked ? 'Context gate open' : `${Math.max(0, LITERAL_MIN - literalLength)} more to unlock`}</span>
      </div>
    </div>

    {#if !unlocked}
      <div class="locked-message">
        <span aria-hidden="true">⌁</span>
        <div><strong>Deeper senses are waiting</strong><p>Write a meaningful literal/context response first. Spiritual interpretation grows from the text—it does not float above it.</p></div>
      </div>
    {:else}
      <div class="unlock-message" role="status"><span aria-hidden="true">✓</span>Good. Your reading is grounded in the text. Now move into the deeper senses.</div>
    {/if}

    <div class="sense-grid" class:locked={!unlocked}>
      {#each senseMeta as sense}
        <div class="response-card">
          <div class="response-title"><b>{sense.number}</b><span><strong>{sense.title}</strong><em>{sense.hint}</em></span></div>
          <p>{passage.prompts[sense.key]}</p>
          <textarea
            value={response[sense.key]}
            on:input={(event) => update(sense.key, event.currentTarget.value)}
            rows="6"
            disabled={!unlocked}
            placeholder={`Develop the ${sense.title.toLowerCase()} sense with evidence from this passage…`}
            aria-label={`${sense.title} sense response`}
          ></textarea>
          <span class="mini-count">{response[sense.key].trim().length} characters</span>
        </div>
      {/each}
    </div>

    <div class="response-card exit-card" class:locked={!unlocked}>
      <div class="response-title"><b>05</b><span><strong>Exit check</strong><em>Make your central claim.</em></span></div>
      <p>{passage.prompts.exit}</p>
      <textarea
        value={response.exit}
        on:input={(event) => update('exit', event.currentTarget.value)}
        rows="4"
        disabled={!unlocked}
        placeholder="This passage reveals Jesus as…"
        aria-label="Exit check response"
      ></textarea>
      <span class="mini-count">{response.exit.trim().length} characters</span>
    </div>

    <section class="exemplar-panel">
      <div>
        <p>Compare after you attempt</p>
        <h3>Exemplar responses</h3>
        <span>These are models, not the only acceptable interpretations.</span>
      </div>
      <button on:click={requestExemplar}>{showExemplar ? 'Hide exemplars' : 'Show exemplars'}</button>
      {#if exemplarMessage}<p class="exemplar-message" role="status">{exemplarMessage}</p>{/if}
      {#if showExemplar}
        <div class="exemplar-grid">
          {#each ['literal', 'allegorical', 'moral', 'anagogical'] as sense}
            <article><b>{sense}</b><p>{passage.exemplars[sense as SenseKey]}</p></article>
          {/each}
        </div>
      {/if}
    </section>
  </section>
</article>

<style>
  .case-file { display: grid; gap: 26px; }
  .back-button { justify-self: start; border: 0; padding: 0; background: none; color: var(--lesson-secondary); font-weight: 800; cursor: pointer; }
  .back-button span { margin-right: 8px; }
  .case-header { padding: clamp(28px, 6vw, 64px); border-radius: 26px; background: var(--lesson-primary); color: var(--lesson-surface); position: relative; overflow: hidden; }
  .case-header::after { content: ''; position: absolute; width: 360px; height: 360px; border: 1px solid color-mix(in srgb, var(--lesson-accent) 55%, transparent); border-radius: 50%; right: -120px; top: -170px; box-shadow: 0 0 0 56px color-mix(in srgb, var(--lesson-accent) 6%, transparent); }
  .case-labels { position: relative; z-index: 1; display: flex; gap: 8px; }
  .case-labels span { border: 1px solid color-mix(in srgb, var(--lesson-surface) 24%, transparent); border-radius: 999px; padding: 6px 10px; color: color-mix(in srgb, var(--lesson-surface) 72%, transparent); font-size: .65rem; text-transform: uppercase; letter-spacing: .1em; }
  .case-header > p { position: relative; z-index: 1; margin: 42px 0 8px; color: var(--lesson-accent); font-weight: 850; font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; }
  .case-header h2 { position: relative; z-index: 1; max-width: 760px; margin: 0; font: 400 clamp(3rem, 7vw, 6rem)/.94 Georgia, serif; letter-spacing: -.05em; }
  blockquote { position: relative; z-index: 1; max-width: 650px; margin: 24px 0 38px; color: color-mix(in srgb, var(--lesson-surface) 73%, transparent); font-size: 1.05rem; line-height: 1.6; font-style: italic; }
  .open-bible { position: relative; z-index: 1; width: min(520px, 100%); display: grid; grid-template-columns: 38px 1fr; gap: 12px; padding: 15px; border: 1px solid color-mix(in srgb, var(--lesson-accent) 45%, transparent); border-radius: 12px; background: color-mix(in srgb, var(--lesson-surface) 8%, transparent); }
  .open-bible > b { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--lesson-accent); color: var(--lesson-primary); }
  .open-bible span { color: color-mix(in srgb, var(--lesson-surface) 68%, transparent); font-size: .78rem; line-height: 1.45; }
  .open-bible strong { display: block; color: var(--lesson-surface); }
  .evidence-grid, .insight-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .evidence-grid > section { padding: 24px; border: 1px solid var(--lesson-border); border-radius: 17px; background: var(--lesson-surface); }
  .card-label, .insight-grid p, .response-heading p, .exemplar-panel > div > p { margin: 0 0 14px; color: var(--lesson-secondary); font-size: .66rem; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
  .evidence-grid ul { margin: 0; padding-left: 18px; color: var(--lesson-muted); font-size: .86rem; line-height: 1.65; }
  .evidence-grid li + li { margin-top: 9px; }
  .image-chips { display: flex; gap: 8px; flex-wrap: wrap; }
  .image-chips span { padding: 7px 10px; border-radius: 999px; background: color-mix(in srgb, var(--lesson-secondary) 9%, var(--lesson-background)); color: var(--lesson-text); font-size: .75rem; font-weight: 730; }
  .track-note { margin: 18px 0 0; color: var(--lesson-muted); font-size: .8rem; }
  .connection-card, .trap-card { min-height: 210px; padding: 24px; border-radius: 18px; display: grid; grid-template-columns: 42px 1fr; gap: 14px; align-content: start; }
  .connection-card { background: color-mix(in srgb, var(--lesson-secondary) 10%, var(--lesson-surface)); border: 1px solid color-mix(in srgb, var(--lesson-secondary) 28%, var(--lesson-border)); }
  .trap-card { background: color-mix(in srgb, var(--lesson-accent) 10%, var(--lesson-surface)); border: 1px solid color-mix(in srgb, var(--lesson-accent) 35%, var(--lesson-border)); }
  .insight-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font-weight: 900; }
  .insight-grid p { margin-bottom: 7px; }
  .insight-grid h3 { margin: 0 0 10px; font: 400 1.35rem Georgia, serif; }
  .insight-grid div > span, .trap-copy { color: var(--lesson-muted); font-size: .82rem; line-height: 1.6; }
  .trap-card button { padding: 6px 0; border: 0; border-bottom: 1px solid currentColor; color: var(--lesson-primary); background: none; cursor: pointer; font-size: .76rem; font-weight: 800; }
  .trap-copy { grid-column: 1 / -1; display: block; padding-top: 14px; border-top: 1px solid color-mix(in srgb, var(--lesson-accent) 30%, transparent); }
  .teacher-note { display: grid; grid-template-columns: 120px 1fr; gap: 15px; padding: 18px 22px; border: 1px dashed var(--lesson-secondary); border-radius: 14px; color: var(--lesson-muted); background: color-mix(in srgb, var(--lesson-secondary) 7%, transparent); font-size: .82rem; line-height: 1.55; }
  .teacher-note b { color: var(--lesson-secondary); text-transform: uppercase; font-size: .66rem; letter-spacing: .1em; }
  .response-lab { display: grid; gap: 16px; margin-top: 32px; }
  .response-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 10px; }
  .response-heading h2 { margin: 0; font: 400 clamp(2.2rem, 5vw, 3.8rem)/1 Georgia, serif; letter-spacing: -.04em; }
  .step-dots { display: flex; gap: 6px; }
  .step-dots span { display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid var(--lesson-border); border-radius: 50%; color: var(--lesson-muted); font-size: .68rem; }
  .step-dots span.done { border-color: var(--lesson-secondary); background: var(--lesson-secondary); color: var(--lesson-surface); }
  .response-card { padding: clamp(21px, 4vw, 30px); border: 1px solid var(--lesson-border); border-radius: 18px; background: var(--lesson-surface); }
  .literal-card { border-top: 4px solid var(--lesson-accent); }
  .response-title { display: flex; gap: 13px; align-items: center; }
  .response-title > b { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font: 400 .9rem Georgia, serif; }
  .response-title strong, .response-title em { display: block; }
  .response-title strong { font: 400 1.35rem Georgia, serif; }
  .response-title em { margin-top: 3px; color: var(--lesson-muted); font-size: .7rem; font-style: normal; }
  .response-card > p { color: var(--lesson-muted); line-height: 1.55; font-size: .86rem; }
  textarea { width: 100%; resize: vertical; padding: 15px; border: 1px solid var(--lesson-border); border-radius: 12px; background: color-mix(in srgb, var(--lesson-background) 60%, white); color: var(--lesson-text); line-height: 1.55; }
  textarea:focus { outline: 3px solid color-mix(in srgb, var(--lesson-accent) 20%, transparent); border-color: var(--lesson-accent); }
  textarea:disabled { cursor: not-allowed; opacity: .48; }
  .writing-status { display: flex; justify-content: space-between; margin-top: 8px; color: var(--lesson-muted); font-size: .68rem; }
  .writing-status span:last-child { font-weight: 780; }
  .writing-status .ready { color: #18725d; }
  .locked-message, .unlock-message { display: flex; gap: 14px; align-items: center; padding: 16px 20px; border-radius: 13px; }
  .locked-message { border: 1px dashed var(--lesson-border); background: color-mix(in srgb, var(--lesson-background) 70%, transparent); }
  .locked-message > span, .unlock-message > span { display: grid; place-items: center; flex: 0 0 auto; width: 34px; height: 34px; border-radius: 50%; }
  .locked-message > span { background: var(--lesson-border); color: var(--lesson-muted); }
  .locked-message strong { font-size: .86rem; }
  .locked-message p { margin: 3px 0 0; color: var(--lesson-muted); font-size: .75rem; line-height: 1.5; }
  .unlock-message { color: #176f5a; background: #e2f4ed; font-size: .82rem; font-weight: 720; }
  .unlock-message > span { background: #2b8b73; color: white; }
  .sense-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .sense-grid.locked, .exit-card.locked { opacity: .68; }
  .mini-count { display: block; margin-top: 7px; color: var(--lesson-muted); font-size: .66rem; text-align: right; }
  .exit-card { border-left: 4px solid var(--lesson-secondary); }
  .exemplar-panel { display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; padding: 26px; border-radius: 18px; background: var(--lesson-primary); color: var(--lesson-surface); }
  .exemplar-panel h3 { margin: 0 0 5px; font: 400 1.65rem Georgia, serif; }
  .exemplar-panel > div > span { color: color-mix(in srgb, var(--lesson-surface) 65%, transparent); font-size: .78rem; }
  .exemplar-panel > div > p { color: var(--lesson-accent); margin-bottom: 6px; }
  .exemplar-panel > button { border: 1px solid color-mix(in srgb, var(--lesson-surface) 30%, transparent); border-radius: 999px; padding: 10px 15px; background: transparent; color: var(--lesson-surface); font-weight: 780; cursor: pointer; }
  .exemplar-message { grid-column: 1 / -1; margin: 0; padding: 10px 13px; border-radius: 9px; background: color-mix(in srgb, var(--lesson-accent) 18%, transparent); color: var(--lesson-surface); font-size: .8rem; }
  .exemplar-grid { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .exemplar-grid article { padding: 17px; border: 1px solid color-mix(in srgb, var(--lesson-surface) 16%, transparent); border-radius: 12px; background: color-mix(in srgb, var(--lesson-surface) 7%, transparent); }
  .exemplar-grid b { color: var(--lesson-accent); font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; }
  .exemplar-grid p { margin: 8px 0 0; color: color-mix(in srgb, var(--lesson-surface) 80%, transparent); font-size: .8rem; line-height: 1.55; }
  @media (max-width: 900px) {
    .sense-grid { grid-template-columns: 1fr; }
    .insight-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 680px) {
    .evidence-grid { grid-template-columns: 1fr; }
    .response-heading { display: block; }
    .step-dots { margin-top: 18px; }
    .exemplar-panel { grid-template-columns: 1fr; }
    .exemplar-panel > button { justify-self: start; }
    .exemplar-grid { grid-template-columns: 1fr; }
    .teacher-note { grid-template-columns: 1fr; }
  }
</style>
