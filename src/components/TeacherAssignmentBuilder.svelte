<script lang="ts">
  import { onMount } from 'svelte';
  import type { GospelLesson } from '../content/types';
  import { assignmentSearch, type AssignmentConfig } from '../utils/assignment';

  export let lessons: GospelLesson[];
  export let base = '/';

  let selectedSlug = lessons[0]?.shortName.toLowerCase() ?? 'john';
  let title = 'Unit 2 Gospel Investigation';
  let dueDate = '';
  let period = '';
  let selectedPassages: string[] = lessons[0]?.passages.slice(0, 3).map((passage) => passage.id) ?? [];
  let requireQuiz = true;
  let requireSorter = true;
  let requireSynthesis = true;
  let requireReflection = true;
  let allowExemplars = true;
  let requireUnlock = true;
  let includeOptionalMedia = true;
  let origin = '';
  let copied = false;
  let previousSlug = selectedSlug;

  $: lesson = lessons.find((item) => item.shortName.toLowerCase() === selectedSlug) ?? lessons[0];
  $: if (lesson && selectedSlug !== previousSlug) {
    previousSlug = selectedSlug;
    selectedPassages = lesson.passages.slice(0, 3).map((passage) => passage.id);
  }
  $: config = {
    enabled: true,
    title: title.trim() || `${lesson.shortName} Gospel Assignment`,
    dueDate,
    period,
    passageIds: selectedPassages,
    requireQuiz,
    requireSorter,
    requireSynthesis,
    requireReflection,
    allowExemplars,
    requireUnlock,
    includeOptionalMedia,
  } satisfies AssignmentConfig;
  $: assignmentPath = `${base}unit-2/${lesson.shortName.toLowerCase()}/?${assignmentSearch(config)}`;
  $: assignmentUrl = origin ? `${origin}${assignmentPath}` : assignmentPath;

  onMount(() => {
    origin = window.location.origin;
  });

  function togglePassage(id: string) {
    selectedPassages = selectedPassages.includes(id)
      ? selectedPassages.filter((passageId) => passageId !== id)
      : [...selectedPassages, id];
  }

  async function copyLink() {
    if (!selectedPassages.length) return;
    await navigator.clipboard.writeText(assignmentUrl);
    copied = true;
    window.setTimeout(() => (copied = false), 2200);
  }
</script>

<div class="builder-shell">
  <header class="builder-header">
    <a href={base}>← Learning Hub</a>
    <span>HRE4M · TEACHER TOOLS</span>
  </header>

  <main id="main-content">
    <section class="builder-hero">
      <div>
        <p>Assignment mode</p>
        <h1>Shape the route.<br /><em>Share one link.</em></h1>
        <span>Create a focused student pathway without changing lesson content or collecting student data online.</span>
      </div>
      <div class="hero-number"><small>VERSION</small><strong>02</strong><span>Teacher-configured</span></div>
    </section>

    <div class="builder-grid">
      <section class="builder-form" aria-labelledby="builder-title">
        <div class="section-title"><span>01</span><div><p>Configure</p><h2 id="builder-title">Assignment details</h2></div></div>

        <div class="field-grid">
          <label><span>Gospel laboratory</span><select bind:value={selectedSlug}>{#each lessons as item}<option value={item.shortName.toLowerCase()}>{item.shortName}</option>{/each}</select></label>
          <label><span>Class period</span><select bind:value={period}><option value="">Students choose</option>{#each [1,2,3,4,5] as number}<option value={`Period ${number}`}>Period {number}</option>{/each}</select></label>
          <label class="wide"><span>Assignment title</span><input bind:value={title} maxlength="80" /></label>
          <label><span>Due date</span><input type="date" bind:value={dueDate} /></label>
        </div>

        <div class="passage-picker">
          <div class="picker-heading">
            <div><span>Required passages</span><small>{selectedPassages.length} selected</small></div>
            <div><button on:click={() => (selectedPassages = lesson.passages.map((passage) => passage.id))}>Select all</button><button on:click={() => (selectedPassages = [])}>Clear</button></div>
          </div>
          <div class="passage-options">
            {#each lesson.passages as passage, index}
              <button class:selected={selectedPassages.includes(passage.id)} on:click={() => togglePassage(passage.id)} aria-pressed={selectedPassages.includes(passage.id)}>
                <b>{String(index + 1).padStart(2, '0')}</b><span><strong>{passage.reference}</strong><small>{passage.title}</small></span><i>{selectedPassages.includes(passage.id) ? '✓' : '+'}</i>
              </button>
            {/each}
          </div>
          {#if !selectedPassages.length}<p class="selection-error" role="alert">Select at least one passage to generate an assignment.</p>{/if}
        </div>

        <div class="requirement-grid">
          <label><input type="checkbox" bind:checked={requireQuiz} /><span><strong>Exegesis check</strong><small>Require the classification quiz</small></span></label>
          <label><input type="checkbox" bind:checked={requireSorter} /><span><strong>Four Senses sorter</strong><small>Require the interpretation match</small></span></label>
          <label><input type="checkbox" bind:checked={requireSynthesis} /><span><strong>Mini-exegesis</strong><small>Require the final paragraph</small></span></label>
          <label><input type="checkbox" bind:checked={requireReflection} /><span><strong>Choice-board reflection</strong><small>Require one reflection route</small></span></label>
          <label><input type="checkbox" bind:checked={allowExemplars} /><span><strong>Student exemplars</strong><small>Allow models after an attempt</small></span></label>
          <label><input type="checkbox" bind:checked={requireUnlock} /><span><strong>Literal-first unlock</strong><small>Ground deeper senses in context</small></span></label>
          <label><input type="checkbox" bind:checked={includeOptionalMedia} /><span><strong>Optional passage media</strong><small>Include optional images, audio, and video</small></span></label>
        </div>
      </section>

      <aside class="share-panel" aria-labelledby="share-title">
        <div class="section-title"><span>02</span><div><p>Share</p><h2 id="share-title">Student launch link</h2></div></div>
        <div class="assignment-preview">
          <span>{lesson.symbol}</span>
          <small>UNIT 2 · {lesson.shortName.toUpperCase()}</small>
          <h3>{config.title}</h3>
          <p>{selectedPassages.length} required passage{selectedPassages.length === 1 ? '' : 's'}{dueDate ? ` · Due ${new Date(`${dueDate}T12:00:00`).toLocaleDateString()}` : ''}</p>
        </div>
        <label class="link-field"><span>Generated link</span><textarea readonly value={assignmentUrl} rows="6"></textarea></label>
        <button class="copy-button" disabled={!selectedPassages.length} on:click={copyLink}>{copied ? '✓ Link copied' : 'Copy student link'}</button>
        {#if selectedPassages.length}<a class="preview-link" href={assignmentPath} target="_blank" rel="noreferrer">Preview student experience ↗</a>{/if}
        <p class="privacy-note"><b>Privacy note</b>This link contains assignment settings only. Student names and responses remain on their own device.</p>
      </aside>
    </div>
  </main>
</div>

<style>
  .builder-shell { min-height: 100vh; background: #f4f0e7; color: #17203c; }
  .builder-header { width: min(1280px, calc(100% - 40px)); margin: 0 auto; min-height: 74px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #d9d1bf; }
  .builder-header a { color: #253567; font-weight: 800; text-decoration: none; font-size: .78rem; }
  .builder-header span { color: #7a6a54; font-size: .66rem; letter-spacing: .15em; font-weight: 850; }
  main { width: min(1280px, calc(100% - 40px)); margin: 0 auto; padding: 45px 0 90px; }
  .builder-hero { min-height: 390px; display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 40px; padding: clamp(35px, 6vw, 70px); border-radius: 28px; background: #18234d; color: white; overflow: hidden; position: relative; }
  .builder-hero::after { content: ''; position: absolute; width: 420px; height: 420px; border: 1px solid rgba(244,198,111,.38); border-radius: 50%; right: -150px; top: -210px; box-shadow: 0 0 0 70px rgba(244,198,111,.04); }
  .builder-hero > div:first-child { position: relative; z-index: 1; }
  .builder-hero p { margin: 0 0 12px; color: #f0c66f; font-size: .68rem; font-weight: 850; letter-spacing: .15em; text-transform: uppercase; }
  .builder-hero h1 { margin: 0 0 20px; font: 400 clamp(3.2rem, 7vw, 6.4rem)/.92 Georgia, serif; letter-spacing: -.052em; }
  .builder-hero h1 em { color: #f0c66f; font-weight: 400; }
  .builder-hero div > span { display: block; max-width: 620px; color: #bfc6de; line-height: 1.65; }
  .hero-number { position: relative; z-index: 1; display: grid; place-items: center; width: 210px; aspect-ratio: 1; border: 1px solid #465174; border-radius: 50%; }
  .hero-number small, .hero-number span { color: #aeb7d4; font-size: .62rem; text-transform: uppercase; letter-spacing: .12em; }
  .hero-number strong { font: 400 5.5rem/.9 Georgia, serif; color: #f0c66f; }
  .builder-grid { display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(330px, .65fr); gap: 18px; margin-top: 18px; align-items: start; }
  .builder-form, .share-panel { padding: clamp(24px, 4vw, 38px); border: 1px solid #ddd4c2; border-radius: 22px; background: #fffdf8; }
  .share-panel { position: sticky; top: 18px; }
  .section-title { display: flex; gap: 14px; align-items: center; margin-bottom: 28px; }
  .section-title > span { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: #18234d; color: #f0c66f; font: 400 .85rem Georgia, serif; }
  .section-title p { margin: 0 0 3px; color: #9b6d29; font-size: .61rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  .section-title h2 { margin: 0; font: 400 1.65rem Georgia, serif; }
  .field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
  label { display: grid; gap: 7px; }
  label > span, .picker-heading > div > span { color: #6f675d; font-size: .65rem; font-weight: 850; letter-spacing: .1em; text-transform: uppercase; }
  label.wide { grid-column: 1 / -1; }
  input[type='text'], input[type='date'], input:not([type]), select, textarea { width: 100%; border: 1px solid #d9d1bf; border-radius: 10px; padding: 12px 13px; background: #f9f6ef; color: #17203c; }
  .passage-picker { margin-top: 30px; }
  .picker-heading { display: flex; justify-content: space-between; align-items: end; margin-bottom: 12px; }
  .picker-heading small { display: block; margin-top: 3px; color: #8a837a; font-size: .68rem; }
  .picker-heading button { border: 0; background: none; color: #354b83; font-size: .68rem; font-weight: 800; cursor: pointer; }
  .passage-options { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .passage-options button { min-height: 72px; display: grid; grid-template-columns: 28px 1fr 24px; gap: 9px; align-items: center; padding: 11px; border: 1px solid #ddd4c2; border-radius: 11px; background: #fff; color: #17203c; text-align: left; cursor: pointer; }
  .passage-options button.selected { border-color: #c48b31; background: #fcf5e5; }
  .passage-options b { color: #bd8430; font: 400 .95rem Georgia, serif; }
  .passage-options strong, .passage-options small { display: block; }
  .passage-options strong { font-size: .72rem; }
  .passage-options small { margin-top: 3px; color: #746f68; font-size: .64rem; }
  .passage-options i { display: grid; place-items: center; width: 22px; height: 22px; border-radius: 50%; background: #18234d; color: #f0c66f; font-style: normal; font-size: .7rem; }
  .selection-error { color: #9b354a; font-size: .75rem; font-weight: 750; }
  .requirement-grid { margin-top: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .requirement-grid label { display: grid; grid-template-columns: auto 1fr; gap: 10px; align-items: start; padding: 13px; border: 1px solid #ddd4c2; border-radius: 11px; cursor: pointer; }
  .requirement-grid input { margin-top: 3px; accent-color: #18234d; }
  .requirement-grid strong, .requirement-grid small { display: block; }
  .requirement-grid strong { font-size: .73rem; }
  .requirement-grid small { margin-top: 3px; color: #81796f; font-size: .63rem; line-height: 1.4; }
  .assignment-preview { padding: 23px; border-radius: 15px; background: #18234d; color: white; }
  .assignment-preview > span { display: grid; place-items: center; width: 39px; height: 39px; border: 1px solid #f0c66f; border-radius: 50%; color: #f0c66f; }
  .assignment-preview small { display: block; margin-top: 22px; color: #f0c66f; font-size: .59rem; letter-spacing: .12em; }
  .assignment-preview h3 { margin: 8px 0; font: 400 1.8rem/1.05 Georgia, serif; }
  .assignment-preview p { margin: 0; color: #b8c1dc; font-size: .7rem; line-height: 1.5; }
  .link-field { margin-top: 18px; }
  .link-field textarea { resize: none; font-size: .66rem; line-height: 1.5; }
  .copy-button { width: 100%; min-height: 46px; margin-top: 12px; border: 0; border-radius: 10px; background: #18234d; color: white; font-weight: 800; cursor: pointer; }
  .copy-button:disabled { opacity: .4; cursor: not-allowed; }
  .preview-link { display: block; margin-top: 13px; color: #354b83; text-align: center; font-size: .73rem; font-weight: 800; }
  .privacy-note { margin: 24px 0 0; padding-top: 18px; border-top: 1px solid #ddd4c2; color: #766f66; font-size: .69rem; line-height: 1.55; }
  .privacy-note b { display: block; color: #4c443b; }
  @media (max-width: 900px) { .builder-grid { grid-template-columns: 1fr; } .share-panel { position: static; } }
  @media (max-width: 650px) { .builder-hero { grid-template-columns: 1fr; } .hero-number { display: none; } .field-grid, .passage-options, .requirement-grid { grid-template-columns: 1fr; } label.wide { grid-column: auto; } }
</style>
