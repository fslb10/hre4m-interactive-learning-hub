<script lang="ts">
  import type { GospelPassage, SenseKey } from '../content/types';
  import type { PassageResponse } from '../utils/storage';
  import { EXIT_MIN, LITERAL_MIN, SENSE_MIN } from '../utils/progress';
  import { protectStudentWriting } from '../utils/studentWriting';
  import PassageMedia from './PassageMedia.svelte';
  import PilotPassageActivity from './PilotPassageActivity.svelte';

  export let passage: GospelPassage;
  export let response: PassageResponse;
  export let teacherMode = false;
  export let unlockRequired = true;
  export let exemplarsEnabled = true;
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
  $: unlocked = teacherMode || !unlockRequired || literalLength >= LITERAL_MIN;
  $: attemptedDeeper = [response.allegorical, response.moral, response.anagogical].some(
    (value) => value.trim().length >= 30,
  );
  $: currentStep =
    literalLength < LITERAL_MIN
      ? { key: 'literal', number: 1, title: 'Explain what happens', help: 'Name the people, place, and main action. Add at least one detail from the passage.' }
      : response.allegorical.trim().length < SENSE_MIN
        ? { key: 'allegorical', number: 2, title: 'Connect the passage to Jesus', help: 'Explain what the passage shows about Jesus, salvation, the Church, or the sacraments.' }
        : response.moral.trim().length < SENSE_MIN
          ? { key: 'moral', number: 3, title: 'Name how people should live', help: 'Choose one attitude or action the passage asks people to practise.' }
          : response.anagogical.trim().length < SENSE_MIN
            ? { key: 'anagogical', number: 4, title: 'Look toward God’s Kingdom', help: 'Connect the passage to resurrection, eternal life, or God’s completed Kingdom.' }
            : response.exit.trim().length < EXIT_MIN
              ? { key: 'exit', number: 5, title: 'Write your main idea', help: 'In 2–3 sentences, explain one important thing the passage shows about Jesus.' }
              : { key: 'complete', number: 5, title: 'Passage complete', help: 'Review your answers, or return to the passage list and choose the next reading.' };

  function update<K extends keyof PassageResponse>(field: K, value: PassageResponse[K]) {
    onChange({ ...response, [field]: value });
  }

  const evidenceChecks = [
    { id: 'people-setting', label: 'I named the main people, place, and action.' },
    { id: 'text-detail', label: 'I used a detail, image, or repeated word from the text.' },
    { id: 'gospel-context', label: 'I connected this passage to the rest of the Gospel.' },
    { id: 'observation-inference', label: 'I made it clear which ideas come from the text.' },
  ];

  function toggleEvidence(id: string) {
    const current = response.evidenceChecklist ?? [];
    update('evidenceChecklist', current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function updateMediaResponse(key: string, value: string) {
    update('mediaResponses', { ...(response.mediaResponses ?? {}), [key]: value });
  }

  function requestExemplar() {
    if (!teacherMode && (!unlocked || !attemptedDeeper)) {
      exemplarMessage = 'Finish Step 1 and try at least one deeper sense before opening the sample answers.';
      return;
    }
    exemplarMessage = '';
    showExemplar = !showExemplar;
    if (!response.exemplarViewed) update('exemplarViewed', true);
  }

  const senseMeta: Array<{ key: SenseKey; number: string; title: string; hint: string }> = [
    { key: 'allegorical', number: '02', title: 'Allegorical', hint: 'What it shows about Jesus and salvation' },
    { key: 'moral', number: '03', title: 'Moral', hint: 'How it asks people to live' },
    { key: 'anagogical', number: '04', title: 'Anagogical', hint: 'How it points to eternal life and God’s Kingdom' },
  ];
</script>

{#if passage.pilot}
  <PilotPassageActivity {passage} {response} {teacherMode} {unlockRequired} {exemplarsEnabled} {onChange} {onBack} />
{:else}
<article class="case-file">
  <button class="back-button" on:click={onBack}><span aria-hidden="true">←</span> Back to all passages</button>

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
      <span><strong>Step 1: Open your Bible</strong>Read {passage.reference} in the NRSV / NRSV-CE. Read it once before you start writing.</span>
    </div>
  </header>

  <div class="evidence-grid">
    <section>
      <p class="card-label">Helpful context</p>
      <ul>
        {#each passage.contextNotes as note}<li>{note}</li>{/each}
      </ul>
    </section>
    <section>
      <p class="card-label">Details to notice</p>
      <div class="image-chips">{#each passage.keyImages as image}<span>{image}</span>{/each}</div>
      <p class="track-note">Find these details in the passage. Notice where they repeat or change.</p>
    </section>
  </div>

  <div class="insight-grid">
    <section class="connection-card">
      <span class="insight-icon" aria-hidden="true">✣</span>
      <div><p>Catholic connection</p><h3>Connect this to faith</h3><span>{passage.catholicConnection}</span></div>
    </section>
    <section class="trap-card">
      <span class="insight-icon" aria-hidden="true">!</span>
      <div>
        <p>Watch out for this mistake</p>
        <h3>Check your idea</h3>
        <button on:click={() => (showTrap = !showTrap)} aria-expanded={showTrap}>{showTrap ? 'Hide help' : 'Show help'}</button>
      </div>
      {#if showTrap}<span class="trap-copy">{passage.eisegesisTrap}</span>{/if}
    </section>
  </div>

  {#if teacherMode}
    <aside class="teacher-note"><b>Teacher note</b><span>{passage.teacherNote}</span></aside>
  {/if}

  <PassageMedia
    media={passage.media ?? []}
    responses={response.mediaResponses ?? {}}
    onResponse={updateMediaResponse}
  />

  <section class="response-lab" aria-labelledby="response-title">
    <div class="response-heading">
      <div><p>Your five writing steps</p><h2 id="response-title">Complete one step at a time</h2></div>
      <div class="step-dots" aria-label="Response progress">
        <span class:done={response.literal.trim().length >= LITERAL_MIN} aria-label="Step 1: what happens">1</span>
        <span class:done={response.allegorical.trim().length >= SENSE_MIN} aria-label="Step 2: Jesus and salvation">2</span>
        <span class:done={response.moral.trim().length >= SENSE_MIN} aria-label="Step 3: how to live">3</span>
        <span class:done={response.anagogical.trim().length >= SENSE_MIN} aria-label="Step 4: eternal life and God’s Kingdom">4</span>
        <span class:done={response.exit.trim().length >= EXIT_MIN} aria-label="Step 5: main idea">5</span>
      </div>
    </div>

    <aside class:complete={currentStep.key === 'complete'} class="current-step" aria-live="polite">
      <b>{currentStep.key === 'complete' ? '✓' : currentStep.number}</b>
      <div><span>{currentStep.key === 'complete' ? 'Nice work' : `Do this now · Step ${currentStep.number} of 5`}</span><strong>{currentStep.title}</strong><p>{currentStep.help}</p></div>
      {#if currentStep.key === 'complete'}<button on:click={onBack}>Choose the next passage</button>{/if}
    </aside>

    <p class="writing-rule">Write in your own words. Copy, cut, paste, and drag-and-drop are turned off in student writing boxes.</p>

    <div class:active-step={currentStep.key === 'literal'} class="response-card literal-card">
      <div class="response-title"><b>01</b><span><strong>Literal: What happens?</strong><em>Start with the passage, not your opinion.</em></span></div>
      <p>{passage.prompts.literal}</p>
      <textarea
        use:protectStudentWriting
        value={response.literal}
        on:input={(event) => update('literal', event.currentTarget.value)}
        rows="7"
        placeholder="The main people are… The passage takes place… The main action is… One important detail is…"
        aria-label="Literal and context response"
      ></textarea>
      <div class="writing-status">
        <span>{literalLength} characters</span>
        <span class:ready={unlocked}>{unlocked ? '✓ Step 1 complete' : 'Write about 2–3 sentences'}</span>
      </div>
      <div class="evidence-checklist">
        <div><strong>Check your Step 1 answer</strong><span>{response.evidenceChecklist.length}/{evidenceChecks.length} checked</span></div>
        {#each evidenceChecks as item}
          <label><input type="checkbox" checked={response.evidenceChecklist.includes(item.id)} on:change={() => toggleEvidence(item.id)} /><span>{item.label}</span></label>
        {/each}
      </div>
      <div class="hint-ladder">
        <div><strong>Need help?</strong><span>Open one hint at a time.</span></div>
        <button on:click={() => update('hintLevel', Math.min(3, response.hintLevel + 1))} disabled={response.hintLevel >= 3}>{response.hintLevel ? 'Show next hint' : 'Show first hint'}</button>
        {#if response.hintLevel >= 1}<p><b>Notice</b>Find these details: {passage.keyImages.join(', ')}. Choose one to include in your answer.</p>{/if}
        {#if response.hintLevel >= 2}<p><b>Compare</b>Look at the start and end. Who changes, understands more, or responds to Jesus?</p>{/if}
        {#if response.hintLevel >= 3}<p><b>Start</b>“In {passage.reference}, ____ happens. The detail ____ matters because ____.”</p>{/if}
      </div>
    </div>

    {#if !unlocked}
      <div class="locked-message">
        <span aria-hidden="true">⌁</span>
        <div><strong>Finish Step 1 to continue</strong><p>Write 2–3 sentences about what happens. The other senses will unlock when your answer is long enough.</p></div>
      </div>
    {:else}
      <div class="unlock-message" role="status"><span aria-hidden="true">✓</span>Step 1 is complete. Continue with the three deeper senses.</div>
    {/if}

    <div class="sense-grid" class:locked={!unlocked}>
      {#each senseMeta as sense}
        <div class:active-step={currentStep.key === sense.key} class="response-card">
          <div class="response-title"><b>{sense.number}</b><span><strong>{sense.title}</strong><em>{sense.hint}</em></span></div>
          <p>{passage.prompts[sense.key]}</p>
          <textarea
            use:protectStudentWriting
            value={response[sense.key]}
            on:input={(event) => update(sense.key, event.currentTarget.value)}
            rows="6"
            disabled={!unlocked}
            placeholder={sense.key === 'allegorical' ? 'This passage shows us… about Jesus or salvation because…' : sense.key === 'moral' ? 'This passage asks people to… because…' : 'This passage points to eternal life or God’s Kingdom by…'}
            aria-label={`${sense.title} sense response`}
          ></textarea>
          <span class:ready={response[sense.key].trim().length >= SENSE_MIN} class="mini-count">{response[sense.key].trim().length} characters · {response[sense.key].trim().length >= SENSE_MIN ? 'step complete' : 'write at least one full sentence'}</span>
        </div>
      {/each}
    </div>

    <div class:active-step={currentStep.key === 'exit'} class="response-card exit-card" class:locked={!unlocked}>
      <div class="response-title"><b>05</b><span><strong>Main idea</strong><em>Finish with what this passage shows about Jesus.</em></span></div>
      <p>{passage.prompts.exit}</p>
      <textarea
        use:protectStudentWriting
        value={response.exit}
        on:input={(event) => update('exit', event.currentTarget.value)}
        rows="4"
        disabled={!unlocked}
        placeholder="This passage shows that Jesus… I know this because…"
        aria-label="Exit check response"
      ></textarea>
      <span class:ready={response.exit.trim().length >= EXIT_MIN} class="mini-count">{response.exit.trim().length} characters · {response.exit.trim().length >= EXIT_MIN ? 'step complete' : 'write 2–3 sentences'}</span>
    </div>

    {#if exemplarsEnabled || teacherMode}<section class="exemplar-panel">
      <div>
        <p>Use these after you try</p>
        <h3>Sample answers</h3>
        <span>Compare the samples with your own work. Your answer does not need to match exactly.</span>
      </div>
      <button on:click={requestExemplar}>{showExemplar ? 'Hide samples' : 'Show sample answers'}</button>
      {#if exemplarMessage}<p class="exemplar-message" role="status">{exemplarMessage}</p>{/if}
      {#if showExemplar}
        <div class="exemplar-grid">
          {#each ['literal', 'allegorical', 'moral', 'anagogical'] as sense}
            <article><b>{sense}</b><p>{passage.exemplars[sense as SenseKey]}</p></article>
          {/each}
        </div>
        <label class="exemplar-reflection">
          <span>Compare and improve</span>
          <p>Name one strength in your answer and one change that would make it clearer.</p>
          <textarea use:protectStudentWriting value={response.exemplarReflection} on:input={(event) => update('exemplarReflection', event.currentTarget.value)} rows="4" placeholder="One strength in my answer is… One change I would make is…"></textarea>
        </label>
      {/if}
    </section>{/if}
  </section>
</article>
{/if}

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
  .current-step { display: grid; grid-template-columns: auto 1fr auto; gap: 14px; align-items: center; padding: 18px 20px; border: 2px solid var(--lesson-accent); border-radius: 16px; background: color-mix(in srgb, var(--lesson-accent) 9%, var(--lesson-surface)); }
  .current-step > b { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); }
  .current-step span, .current-step strong { display: block; }
  .current-step span { color: var(--lesson-secondary); font-size: .65rem; font-weight: 850; letter-spacing: .08em; text-transform: uppercase; }
  .current-step strong { margin-top: 2px; font-size: .98rem; }
  .current-step p { margin: 4px 0 0; color: var(--lesson-muted); font-size: .78rem; line-height: 1.45; }
  .current-step button { border: 0; border-radius: 999px; padding: 10px 14px; background: var(--lesson-primary); color: var(--lesson-surface); font-weight: 780; cursor: pointer; }
  .current-step.complete { border-color: #69ad97; background: #e5f5ef; }
  .writing-rule { margin: -4px 2px 2px; color: var(--lesson-muted); font-size: .72rem; line-height: 1.5; }
  .response-card { padding: clamp(21px, 4vw, 30px); border: 1px solid var(--lesson-border); border-radius: 18px; background: var(--lesson-surface); }
  .response-card.active-step { border-color: var(--lesson-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--lesson-accent) 12%, transparent); }
  .literal-card { border-top: 4px solid var(--lesson-accent); }
  .response-title { display: flex; gap: 13px; align-items: center; }
  .response-title > b { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font: 400 .9rem Georgia, serif; }
  .response-title strong, .response-title em { display: block; }
  .response-title strong { font: 400 1.35rem Georgia, serif; }
  .response-title em { margin-top: 3px; color: var(--lesson-muted); font-size: .7rem; font-style: normal; }
  .response-card > p { color: var(--lesson-muted); line-height: 1.55; font-size: .86rem; }
  textarea { width: 100%; resize: vertical; padding: 15px; border: 1px solid var(--lesson-border); border-radius: 12px; background: color-mix(in srgb, var(--lesson-background) 60%, white); color: var(--lesson-text); line-height: 1.55; }
  textarea:focus { outline: 3px solid color-mix(in srgb, var(--lesson-accent) 20%, transparent); border-color: var(--lesson-accent); }
  textarea[data-clipboard-blocked='true'] { outline: 3px solid #b84a55; border-color: #b84a55; }
  textarea:disabled { cursor: not-allowed; opacity: .48; }
  .writing-status { display: flex; justify-content: space-between; margin-top: 8px; color: var(--lesson-muted); font-size: .68rem; }
  .writing-status span:last-child { font-weight: 780; }
  .writing-status .ready { color: #18725d; }
  .evidence-checklist { margin-top: 15px; display: grid; gap: 8px; padding: 15px; border: 1px solid var(--lesson-border); border-radius: 11px; background: color-mix(in srgb, var(--lesson-background) 68%, white); }
  .evidence-checklist > div { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 2px; }
  .evidence-checklist > div strong { font-size: .76rem; }
  .evidence-checklist > div span { color: var(--lesson-muted); font-size: .66rem; }
  .evidence-checklist label { display: grid; grid-template-columns: auto 1fr; gap: 9px; align-items: start; color: var(--lesson-muted); font-size: .72rem; line-height: 1.45; cursor: pointer; }
  .evidence-checklist input { margin-top: 2px; accent-color: var(--lesson-secondary); }
  .hint-ladder { margin-top: 12px; display: grid; grid-template-columns: 1fr auto; gap: 8px 14px; padding: 15px; border-radius: 11px; background: color-mix(in srgb, var(--lesson-accent) 8%, var(--lesson-surface)); }
  .hint-ladder > div strong, .hint-ladder > div span { display: block; }
  .hint-ladder > div strong { font-size: .76rem; }
  .hint-ladder > div span { margin-top: 2px; color: var(--lesson-muted); font-size: .66rem; }
  .hint-ladder button { align-self: start; padding: 7px 10px; border: 1px solid var(--lesson-border); border-radius: 999px; background: var(--lesson-surface); color: var(--lesson-primary); font-size: .67rem; font-weight: 760; cursor: pointer; }
  .hint-ladder button:disabled { opacity: .45; cursor: not-allowed; }
  .hint-ladder > p { grid-column: 1 / -1; margin: 0; padding: 9px 11px; border-radius: 8px; background: var(--lesson-surface); color: var(--lesson-muted); font-size: .72rem; line-height: 1.5; }
  .hint-ladder > p b { display: inline-block; min-width: 52px; color: var(--lesson-secondary); text-transform: uppercase; font-size: .61rem; letter-spacing: .08em; }
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
  .mini-count.ready { color: #18725d; font-weight: 780; }
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
  .exemplar-reflection { grid-column: 1 / -1; display: grid; gap: 7px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--lesson-surface) 17%, transparent); }
  .exemplar-reflection > span { color: var(--lesson-accent); font-size: .67rem; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
  .exemplar-reflection > p { margin: 0; color: color-mix(in srgb, var(--lesson-surface) 72%, transparent); font-size: .76rem; line-height: 1.5; }
  .exemplar-reflection textarea { background: color-mix(in srgb, var(--lesson-surface) 95%, white); color: var(--lesson-text); }
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
    .current-step { grid-template-columns: auto 1fr; }
    .current-step button { grid-column: 1 / -1; justify-self: start; }
  }
</style>
