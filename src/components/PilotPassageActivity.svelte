<script lang="ts">
  import type { GospelPassage, SenseKey } from '../content/types';
  import type { PassageResponse } from '../utils/storage';
  import { EXIT_MIN, LITERAL_MIN, SENSE_MIN } from '../utils/progress';
  import PassageMedia from './PassageMedia.svelte';

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

  $: literalLength = response.literal.trim().length;
  $: unlocked = teacherMode || !unlockRequired || literalLength >= LITERAL_MIN;
  $: attemptedDeeper = [response.allegorical, response.moral, response.anagogical].some((value) => value.trim().length >= 30);
  $: hookMedia = (passage.media ?? []).filter((item) => item.placement === 'hook');
  $: studyMedia = (passage.media ?? []).filter((item) => item.placement !== 'hook');
  $: evidenceChecks = passage.pilot?.evidenceChecks ?? [];

  const senseMeta: Array<{ key: SenseKey; number: string; title: string; hint: string }> = [
    { key: 'allegorical', number: '02', title: 'Allegorical', hint: 'Christ · salvation · Church · sacraments' },
    { key: 'moral', number: '03', title: 'Moral', hint: 'Virtue · action · discipleship' },
    { key: 'anagogical', number: '04', title: 'Anagogical', hint: 'Hope · resurrection · Kingdom fulfilled' },
  ];

  function update<K extends keyof PassageResponse>(field: K, value: PassageResponse[K]) {
    onChange({ ...response, [field]: value });
  }

  function toggleEvidence(id: string) {
    const current = response.evidenceChecklist ?? [];
    update('evidenceChecklist', current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function updateMediaResponse(key: string, value: string) {
    update('mediaResponses', { ...(response.mediaResponses ?? {}), [key]: value });
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
</script>

<article class="pilot-file">
  <button class="back-button" on:click={onBack}><span aria-hidden="true">←</span> Passage library</button>

  <header class="pilot-header">
    <div class="case-labels"><span>{passage.pilot?.label}</span><span>{passage.difficulty}</span><span>{passage.estimatedMinutes} minutes</span></div>
    <p>{passage.reference}</p>
    <h2>{passage.title}</h2>
    <blockquote>{passage.anchorPhrase}</blockquote>
  </header>

  <PassageMedia media={hookMedia} responses={response.mediaResponses ?? {}} onResponse={updateMediaResponse} mode="hook" />

  <section class="open-bible" aria-labelledby="open-bible-title">
    <b aria-hidden="true">01</b>
    <div><p>Open your Bible</p><h3 id="open-bible-title">Read {passage.reference}</h3><span>{passage.pilot?.openBibleInstruction}</span></div>
  </section>

  <section class="context-grid" aria-labelledby="context-title">
    <div><p>Historical and literary context</p><h3 id="context-title">Locate the passage before interpreting it</h3></div>
    <ul>{#each passage.contextNotes as note}<li>{note}</li>{/each}</ul>
    <div class="image-track"><strong>Track in the text</strong>{#each passage.keyImages as image}<span>{image}</span>{/each}</div>
  </section>

  <PassageMedia media={studyMedia} responses={response.mediaResponses ?? {}} onResponse={updateMediaResponse} mode="study" />

  <section class="response-lab" aria-labelledby="response-title">
    <div class="response-heading">
      <div><p>Text-grounded interpretation</p><h2 id="response-title">Build your reading in layers</h2></div>
      <div class="step-dots" aria-label="Response progress">
        <span class:done={response.literal.trim().length >= LITERAL_MIN}>1</span>
        <span class:done={response.allegorical.trim().length >= SENSE_MIN}>2</span>
        <span class:done={response.moral.trim().length >= SENSE_MIN}>3</span>
        <span class:done={response.anagogical.trim().length >= SENSE_MIN}>4</span>
        <span class:done={response.exit.trim().length >= EXIT_MIN}>5</span>
      </div>
    </div>

    <div class="response-card literal-card">
      <div class="response-title"><b>01</b><span><strong>Evidence, then literal / context</strong><em>Check the text before making a claim.</em></span></div>
      <div class="evidence-checklist">
        <div><strong>Evidence-from-the-text checklist</strong><span>{response.evidenceChecklist.length}/{evidenceChecks.length} checked</span></div>
        {#each evidenceChecks as item}
          <label><input type="checkbox" checked={response.evidenceChecklist.includes(item.id)} on:change={() => toggleEvidence(item.id)} /><span>{item.label}</span></label>
        {/each}
      </div>
      <p>{passage.prompts.literal}</p>
      <textarea value={response.literal} on:input={(event) => update('literal', event.currentTarget.value)} rows="7" placeholder="Use the passage’s sequence, repeated words, contrasts, speakers, and setting…" aria-label="Literal and context response"></textarea>
      <div class="writing-status"><span>{literalLength} characters</span><span class:ready={unlocked}>{unlocked ? 'Context gate open' : `${Math.max(0, LITERAL_MIN - literalLength)} more to unlock`}</span></div>
      <div class="hint-ladder">
        <div><strong>Need a nudge?</strong><span>Open hints one level at a time.</span></div>
        <button on:click={() => update('hintLevel', Math.min(3, response.hintLevel + 1))} disabled={response.hintLevel >= 3}>{response.hintLevel ? 'Show next hint' : 'Show first hint'}</button>
        {#if response.hintLevel >= 1}<p><b>Notice</b>Track {passage.keyImages.join(', ')}. Where does one image change the meaning?</p>{/if}
        {#if response.hintLevel >= 2}<p><b>Locate</b>Compare the opening and ending. Who understands, resists, or responds differently?</p>{/if}
        {#if response.hintLevel >= 3}<p><b>Start</b>“In {passage.reference}, John first shows ____. This matters because ____.”</p>{/if}
      </div>
    </div>

    {#if !unlocked}
      <div class="locked-message"><span aria-hidden="true">⌁</span><div><strong>Deeper senses are waiting</strong><p>Write a meaningful literal/context response first. Spiritual interpretation grows from the text.</p></div></div>
    {:else}
      <div class="unlock-message" role="status"><span aria-hidden="true">✓</span>Your reading is grounded in the text. Now move into the deeper senses.</div>
    {/if}

    <div class="sense-grid" class:locked={!unlocked}>
      {#each senseMeta as sense}
        <div class="response-card">
          <div class="response-title"><b>{sense.number}</b><span><strong>{sense.title}</strong><em>{sense.hint}</em></span></div>
          <p>{passage.prompts[sense.key]}</p>
          <textarea value={response[sense.key]} on:input={(event) => update(sense.key, event.currentTarget.value)} rows="6" disabled={!unlocked} placeholder={`Develop the ${sense.title.toLowerCase()} sense with evidence from this passage…`} aria-label={`${sense.title} sense response`}></textarea>
          <span class="mini-count">{response[sense.key].trim().length} characters</span>
        </div>
      {/each}
    </div>

    <div class="connection-grid">
      <section class="connection-card"><span class="insight-icon" aria-hidden="true">✣</span><div><p>Catholic connection</p><h3>Faith seeking understanding</h3><span>{passage.catholicConnection}</span></div></section>
      <section class="trap-card"><span class="insight-icon" aria-hidden="true">!</span><div><p>Interpretive safeguard</p><h3>Check the assumption</h3><button on:click={() => (showTrap = !showTrap)} aria-expanded={showTrap}>{showTrap ? 'Hide warning' : 'Reveal warning'}</button></div>{#if showTrap}<span class="trap-copy">{passage.eisegesisTrap}</span>{/if}</section>
    </div>

    {#if teacherMode}<aside class="teacher-note"><b>Teacher note</b><span>{passage.teacherNote}</span></aside>{/if}

    {#if exemplarsEnabled || teacherMode}
      <section class="exemplar-panel">
        <div><p>Compare after you attempt</p><h3>Exemplar responses</h3><span>These are models, not the only acceptable interpretations.</span></div>
        <button on:click={requestExemplar}>{showExemplar ? 'Hide exemplars' : 'Show exemplars'}</button>
        {#if exemplarMessage}<p class="exemplar-message" role="status">{exemplarMessage}</p>{/if}
        {#if showExemplar}
          <div class="exemplar-grid">{#each ['literal', 'allegorical', 'moral', 'anagogical'] as sense}<article><b>{sense}</b><p>{passage.exemplars[sense as SenseKey]}</p></article>{/each}</div>
          <label class="exemplar-reflection"><span>Reflect after comparing</span><p>What did the exemplar include that your response was missing, or what did your response emphasize differently?</p><textarea value={response.exemplarReflection} on:input={(event) => update('exemplarReflection', event.currentTarget.value)} rows="4" placeholder="One strength I noticed… One revision I would make…"></textarea></label>
        {/if}
      </section>
    {/if}

    <div class="response-card exit-card" class:locked={!unlocked}>
      <div class="response-title"><b>05</b><span><strong>Exit reflection</strong><em>Return to your opening observation.</em></span></div>
      <p>{passage.prompts.exit}</p>
      <textarea value={response.exit} on:input={(event) => update('exit', event.currentTarget.value)} rows="4" disabled={!unlocked} placeholder="At first I noticed… Now the textual evidence leads me to…" aria-label="Exit reflection"></textarea>
      <span class="mini-count">{response.exit.trim().length} characters</span>
    </div>
  </section>
</article>

<style>
  .pilot-file { display: grid; gap: 26px; }
  .back-button { justify-self: start; border: 0; padding: 0; background: none; color: var(--lesson-secondary); font-weight: 800; cursor: pointer; }
  .back-button span { margin-right: 8px; }
  .pilot-header { position: relative; overflow: hidden; padding: clamp(28px, 6vw, 64px); border-radius: 26px; background: var(--lesson-primary); color: var(--lesson-surface); }
  .pilot-header::after { content: ''; position: absolute; width: 360px; height: 360px; border: 1px solid color-mix(in srgb, var(--lesson-accent) 55%, transparent); border-radius: 50%; right: -120px; top: -170px; box-shadow: 0 0 0 56px color-mix(in srgb, var(--lesson-accent) 6%, transparent); }
  .case-labels { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 8px; }
  .case-labels span { border: 1px solid color-mix(in srgb, var(--lesson-surface) 24%, transparent); border-radius: 999px; padding: 6px 10px; color: color-mix(in srgb, var(--lesson-surface) 76%, transparent); font-size: .65rem; text-transform: uppercase; letter-spacing: .1em; }
  .pilot-header > p { position: relative; z-index: 1; margin: 42px 0 8px; color: var(--lesson-accent); font-weight: 850; font-size: .78rem; letter-spacing: .12em; text-transform: uppercase; }
  .pilot-header h2 { position: relative; z-index: 1; max-width: 800px; margin: 0; font: 400 clamp(3rem, 7vw, 6rem)/.94 Georgia, serif; letter-spacing: -.05em; }
  blockquote { position: relative; z-index: 1; max-width: 650px; margin: 24px 0 0; color: color-mix(in srgb, var(--lesson-surface) 75%, transparent); font-size: 1.05rem; line-height: 1.6; font-style: italic; }
  .open-bible { display: grid; grid-template-columns: 48px 1fr; gap: 16px; align-items: start; padding: 23px; border: 1px solid color-mix(in srgb, var(--lesson-accent) 52%, var(--lesson-border)); border-radius: 16px; background: color-mix(in srgb, var(--lesson-accent) 8%, var(--lesson-surface)); }
  .open-bible > b, .response-title > b { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font: 400 .8rem Georgia, serif; }
  .open-bible p, .context-grid p, .response-heading p, .connection-grid p, .exemplar-panel > div > p { margin: 0 0 5px; color: var(--lesson-secondary); font-size: .65rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  .open-bible h3, .context-grid h3 { margin: 0 0 7px; font: 400 1.45rem Georgia, serif; }
  .open-bible span { color: var(--lesson-muted); font-size: .82rem; line-height: 1.55; }
  .context-grid { display: grid; grid-template-columns: minmax(210px, .72fr) 1.3fr; gap: 18px 30px; padding: 26px; border: 1px solid var(--lesson-border); border-radius: 18px; background: var(--lesson-surface); }
  .context-grid ul { margin: 0; padding-left: 20px; color: var(--lesson-muted); font-size: .84rem; line-height: 1.65; }
  .context-grid li + li { margin-top: 8px; }
  .image-track { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 8px; align-items: center; padding-top: 16px; border-top: 1px solid var(--lesson-border); }
  .image-track strong { margin-right: 4px; color: var(--lesson-text); font-size: .7rem; }
  .image-track span { padding: 7px 10px; border-radius: 999px; background: color-mix(in srgb, var(--lesson-secondary) 9%, var(--lesson-background)); font-size: .72rem; }
  .response-lab { display: grid; gap: 16px; margin-top: 16px; }
  .response-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 10px; }
  .response-heading h2 { margin: 0; font: 400 clamp(2.2rem, 5vw, 3.8rem)/1 Georgia, serif; letter-spacing: -.04em; }
  .step-dots { display: flex; gap: 6px; }
  .step-dots span { display: grid; place-items: center; width: 28px; height: 28px; border: 1px solid var(--lesson-border); border-radius: 50%; color: var(--lesson-muted); font-size: .68rem; }
  .step-dots span.done { border-color: var(--lesson-secondary); background: var(--lesson-secondary); color: var(--lesson-surface); }
  .response-card { padding: clamp(21px, 4vw, 30px); border: 1px solid var(--lesson-border); border-radius: 18px; background: var(--lesson-surface); }
  .literal-card { border-top: 4px solid var(--lesson-accent); }
  .response-title { display: flex; gap: 13px; align-items: center; }
  .response-title strong, .response-title em { display: block; }
  .response-title strong { font: 400 1.3rem Georgia, serif; }
  .response-title em { margin-top: 3px; color: var(--lesson-muted); font-size: .7rem; font-style: normal; }
  .response-card > p { color: var(--lesson-muted); line-height: 1.55; font-size: .86rem; }
  textarea { width: 100%; resize: vertical; padding: 15px; border: 1px solid var(--lesson-border); border-radius: 12px; background: color-mix(in srgb, var(--lesson-background) 60%, white); color: var(--lesson-text); line-height: 1.55; }
  textarea:focus { outline: 3px solid color-mix(in srgb, var(--lesson-accent) 20%, transparent); border-color: var(--lesson-accent); }
  textarea:disabled { cursor: not-allowed; opacity: .48; }
  .evidence-checklist { margin: 18px 0; display: grid; gap: 9px; padding: 16px; border: 1px solid var(--lesson-border); border-radius: 11px; background: var(--lesson-background); }
  .evidence-checklist > div { display: flex; justify-content: space-between; gap: 12px; }
  .evidence-checklist > div strong { font-size: .76rem; }
  .evidence-checklist > div span { color: var(--lesson-muted); font-size: .66rem; }
  .evidence-checklist label { display: grid; grid-template-columns: auto 1fr; gap: 9px; align-items: start; color: var(--lesson-muted); font-size: .73rem; line-height: 1.45; cursor: pointer; }
  .evidence-checklist input { margin-top: 2px; accent-color: var(--lesson-secondary); }
  .writing-status { display: flex; justify-content: space-between; margin-top: 8px; color: var(--lesson-muted); font-size: .68rem; }
  .writing-status .ready { color: #18725d; }
  .hint-ladder { margin-top: 12px; display: grid; grid-template-columns: 1fr auto; gap: 8px 14px; padding: 15px; border-radius: 11px; background: color-mix(in srgb, var(--lesson-accent) 8%, var(--lesson-surface)); }
  .hint-ladder strong, .hint-ladder span { display: block; }
  .hint-ladder strong { font-size: .76rem; } .hint-ladder span { color: var(--lesson-muted); font-size: .66rem; }
  .hint-ladder button { align-self: start; padding: 7px 10px; border: 1px solid var(--lesson-border); border-radius: 999px; background: var(--lesson-surface); color: var(--lesson-primary); font-size: .67rem; font-weight: 760; cursor: pointer; }
  .hint-ladder > p { grid-column: 1 / -1; margin: 0; padding: 9px 11px; border-radius: 8px; background: var(--lesson-surface); color: var(--lesson-muted); font-size: .72rem; line-height: 1.5; }
  .hint-ladder > p b { display: inline-block; min-width: 52px; color: var(--lesson-secondary); text-transform: uppercase; font-size: .61rem; }
  .locked-message, .unlock-message { display: flex; gap: 14px; align-items: center; padding: 16px 20px; border-radius: 13px; }
  .locked-message { border: 1px dashed var(--lesson-border); background: var(--lesson-background); }
  .locked-message > span, .unlock-message > span { display: grid; place-items: center; flex: 0 0 auto; width: 34px; height: 34px; border-radius: 50%; }
  .locked-message > span { background: var(--lesson-border); } .locked-message p { margin: 3px 0 0; color: var(--lesson-muted); font-size: .75rem; }
  .unlock-message { color: #176f5a; background: #e2f4ed; font-size: .82rem; font-weight: 720; } .unlock-message > span { background: #2b8b73; color: white; }
  .sense-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; } .sense-grid.locked, .exit-card.locked { opacity: .68; }
  .mini-count { display: block; margin-top: 7px; color: var(--lesson-muted); font-size: .66rem; text-align: right; }
  .connection-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .connection-card, .trap-card { min-height: 210px; padding: 24px; border-radius: 18px; display: grid; grid-template-columns: 42px 1fr; gap: 14px; align-content: start; }
  .connection-card { background: color-mix(in srgb, var(--lesson-secondary) 10%, var(--lesson-surface)); border: 1px solid var(--lesson-border); }
  .trap-card { background: color-mix(in srgb, var(--lesson-accent) 10%, var(--lesson-surface)); border: 1px solid var(--lesson-border); }
  .insight-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font-weight: 900; }
  .connection-grid h3 { margin: 0 0 10px; font: 400 1.35rem Georgia, serif; } .connection-grid div > span, .trap-copy { color: var(--lesson-muted); font-size: .82rem; line-height: 1.6; }
  .trap-card button { padding: 6px 0; border: 0; border-bottom: 1px solid currentColor; color: var(--lesson-primary); background: none; cursor: pointer; font-size: .76rem; font-weight: 800; }
  .trap-copy { grid-column: 1 / -1; padding-top: 14px; border-top: 1px solid var(--lesson-border); }
  .teacher-note { display: grid; grid-template-columns: 120px 1fr; gap: 15px; padding: 18px 22px; border: 1px dashed var(--lesson-secondary); border-radius: 14px; color: var(--lesson-muted); background: color-mix(in srgb, var(--lesson-secondary) 7%, transparent); font-size: .82rem; line-height: 1.55; }
  .exemplar-panel { display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; padding: 26px; border-radius: 18px; background: var(--lesson-primary); color: var(--lesson-surface); }
  .exemplar-panel h3 { margin: 0 0 5px; font: 400 1.65rem Georgia, serif; } .exemplar-panel > div > span { color: color-mix(in srgb, var(--lesson-surface) 65%, transparent); font-size: .78rem; } .exemplar-panel > div > p { color: var(--lesson-accent); }
  .exemplar-panel > button { border: 1px solid color-mix(in srgb, var(--lesson-surface) 30%, transparent); border-radius: 999px; padding: 10px 15px; background: transparent; color: var(--lesson-surface); font-weight: 780; cursor: pointer; }
  .exemplar-message { grid-column: 1 / -1; margin: 0; color: var(--lesson-surface); }
  .exemplar-grid { grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; } .exemplar-grid article { padding: 17px; border: 1px solid color-mix(in srgb, var(--lesson-surface) 16%, transparent); border-radius: 12px; } .exemplar-grid b { color: var(--lesson-accent); font-size: .68rem; text-transform: uppercase; } .exemplar-grid p { color: color-mix(in srgb, var(--lesson-surface) 80%, transparent); font-size: .8rem; line-height: 1.55; }
  .exemplar-reflection { grid-column: 1 / -1; display: grid; gap: 7px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--lesson-surface) 17%, transparent); } .exemplar-reflection > span { color: var(--lesson-accent); font-size: .67rem; font-weight: 850; text-transform: uppercase; } .exemplar-reflection > p { margin: 0; color: color-mix(in srgb, var(--lesson-surface) 72%, transparent); font-size: .76rem; }
  .exit-card { border-left: 4px solid var(--lesson-secondary); }
  @media (max-width: 900px) { .sense-grid, .connection-grid { grid-template-columns: 1fr; } }
  @media (max-width: 680px) { .context-grid { grid-template-columns: 1fr; } .image-track { grid-column: auto; } .response-heading { display: block; } .step-dots { margin-top: 18px; } .exemplar-panel { grid-template-columns: 1fr; } .exemplar-panel > button { justify-self: start; } .exemplar-grid { grid-template-columns: 1fr; } .teacher-note { grid-template-columns: 1fr; } }
</style>
