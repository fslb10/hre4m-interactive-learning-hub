<script lang="ts">
  import { protectStudentWriting } from '../utils/studentWriting';

  export let gospelName: string;
  export let synthesis = '';
  export let reflectionChoice = '';
  export let reflectionResponse = '';
  export let showSynthesis = true;
  export let showReflection = true;
  export let onSynthesis: (value: string) => void;
  export let onReflectionChoice: (value: string) => void;
  export let onReflectionResponse: (value: string) => void;

  const choices = [
    { id: 'Prayer', icon: '✦', title: 'Write a prayer', prompt: 'Write a short prayer inspired by one passage.' },
    { id: 'Symbol Map', icon: '◎', title: 'Create a symbol map', prompt: 'Explain how one symbol connects to the Four Senses.' },
    { id: 'Teach Grade 9', icon: '↗', title: 'Teach it forward', prompt: 'Explain one passage clearly to a Grade 9 student.' },
    { id: 'Modern Moral Issue', icon: '⚖', title: 'Connect a real issue', prompt: 'Connect one passage to a moral or social issue today.' },
    { id: 'Compare Images', icon: '◫', title: 'Compare two images', prompt: 'Compare two images of Jesus within this Gospel.' },
    { id: 'Discipleship', icon: '➜', title: 'Name the next step', prompt: 'Explain how one passage reshapes Christian discipleship.' },
  ];

  $: selected = choices.find((choice) => choice.id === reflectionChoice);
</script>

<div class="final-shell">
  {#if showSynthesis}<section class="synthesis" aria-labelledby="synthesis-title">
    <div class="section-intro">
      <p>Final writing · Step 1</p>
      <h2 id="synthesis-title">Explain one passage</h2>
      <span>Choose one {gospelName} passage. Write one paragraph that uses evidence and all Four Senses.</span>
    </div>
    <div class="prompt-card">
      <h3>Use this checklist</h3>
      <ol>
        <li><b>01</b>Explain what happens in the passage.</li>
        <li><b>02</b>Use one important detail or symbol.</li>
        <li><b>03</b>Explain what it shows about Jesus.</li>
        <li><b>04</b>Explain how people should live.</li>
        <li><b>05</b>Connect it to eternal life or God’s Kingdom.</li>
      </ol>
      <details>
        <summary>Need help starting? Open this sentence frame</summary>
        <p>In [reference], ____ happens. The detail ____ is important because ____. This shows us ____ about Jesus. It calls people to ____. It also points to God’s Kingdom because ____.</p>
      </details>
    </div>
    <label>
      <span>Your paragraph</span>
      <textarea use:protectStudentWriting value={synthesis} on:input={(event) => onSynthesis(event.currentTarget.value)} rows="11" placeholder="Write your paragraph here in your own words…"></textarea>
      <small class:ready={synthesis.trim().length >= 180}>{synthesis.trim().length} characters {synthesis.trim().length >= 180 ? '· step complete' : '· write about 4–6 sentences'}</small>
      <small class="writing-rule">Type your own response. Copy, cut, paste, and drag-and-drop are turned off in student writing boxes.</small>
    </label>
  </section>{/if}

  {#if showReflection}<section class="choice-board" aria-labelledby="choice-title">
    <div class="section-intro">
      <p>Final writing · Step 2</p>
      <h2 id="choice-title">Choose one reflection</h2>
      <span>Pick the option that helps you explain your learning most clearly.</span>
    </div>
    <div class="choices">
      {#each choices as choice}
        <button class:selected={reflectionChoice === choice.id} on:click={() => onReflectionChoice(choice.id)} aria-pressed={reflectionChoice === choice.id}>
          <span aria-hidden="true">{choice.icon}</span><strong>{choice.title}</strong><small>{choice.prompt}</small>
        </button>
      {/each}
    </div>
    {#if selected}
      <label class="reflection-box">
        <span>{selected.title}</span>
        <p>{selected.prompt}</p>
        <textarea use:protectStudentWriting value={reflectionResponse} on:input={(event) => onReflectionResponse(event.currentTarget.value)} rows="8" placeholder="Write your reflection here in your own words…"></textarea>
        <small class:ready={reflectionResponse.trim().length >= 100}>{reflectionResponse.trim().length} characters {reflectionResponse.trim().length >= 100 ? '· step complete' : '· write about 3–4 sentences'}</small>
      </label>
    {/if}
  </section>{/if}
</div>

<style>
  .final-shell { display: grid; gap: 70px; }
  .synthesis, .choice-board { display: grid; gap: 22px; }
  .section-intro { padding: clamp(28px, 5vw, 48px); border-radius: 24px; background: var(--lesson-primary); color: var(--lesson-surface); }
  .section-intro p { margin: 0 0 12px; color: var(--lesson-accent); font-size: .68rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  .section-intro h2 { margin: 0 0 13px; font: 400 clamp(2.4rem, 5vw, 4rem)/1 Georgia, serif; letter-spacing: -.04em; }
  .section-intro span { color: color-mix(in srgb, var(--lesson-surface) 70%, transparent); font-size: .86rem; line-height: 1.6; }
  .prompt-card { display: grid; grid-template-columns: .6fr 1.4fr; gap: 18px 35px; padding: 25px; border: 1px solid var(--lesson-border); border-radius: 18px; background: var(--lesson-surface); }
  .prompt-card h3 { margin: 0; font: 400 1.4rem Georgia, serif; }
  .prompt-card ol { margin: 0; padding: 0; list-style: none; display: grid; gap: 9px; }
  .prompt-card li { display: grid; grid-template-columns: 28px 1fr; gap: 10px; color: var(--lesson-muted); font-size: .82rem; }
  .prompt-card li b { color: var(--lesson-accent); font-family: Georgia, serif; }
  details { grid-column: 1 / -1; padding-top: 15px; border-top: 1px solid var(--lesson-border); }
  summary { color: var(--lesson-secondary); font-weight: 800; cursor: pointer; font-size: .8rem; }
  details p { color: var(--lesson-muted); font-size: .83rem; line-height: 1.6; }
  label { display: grid; gap: 9px; }
  label > span { color: var(--lesson-secondary); font-size: .68rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  textarea { width: 100%; padding: 16px; resize: vertical; border: 1px solid var(--lesson-border); border-radius: 13px; background: var(--lesson-surface); color: var(--lesson-text); line-height: 1.6; }
  textarea:focus { outline: 3px solid color-mix(in srgb, var(--lesson-accent) 20%, transparent); border-color: var(--lesson-accent); }
  label small { color: var(--lesson-muted); font-size: .68rem; text-align: right; }
  label small.ready { color: #18725d; font-weight: 780; }
  label small.writing-rule { text-align: left; color: var(--lesson-muted); }
  .choices { display: grid; grid-template-columns: repeat(3, 1fr); gap: 11px; }
  .choices button { min-height: 175px; display: flex; flex-direction: column; align-items: start; text-align: left; gap: 8px; padding: 20px; border: 1px solid var(--lesson-border); border-radius: 16px; background: var(--lesson-surface); color: var(--lesson-text); cursor: pointer; }
  .choices button:hover, .choices button.selected { border-color: var(--lesson-accent); background: color-mix(in srgb, var(--lesson-accent) 8%, var(--lesson-surface)); }
  .choices button > span { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); }
  .choices strong { margin-top: 8px; font: 400 1.2rem Georgia, serif; }
  .choices small { color: var(--lesson-muted); font-size: .75rem; line-height: 1.45; }
  .reflection-box { margin-top: 4px; padding: 25px; border-radius: 18px; background: color-mix(in srgb, var(--lesson-secondary) 8%, var(--lesson-surface)); border: 1px solid color-mix(in srgb, var(--lesson-secondary) 26%, var(--lesson-border)); }
  .reflection-box p { margin: 0; color: var(--lesson-muted); font-size: .84rem; }
  @media (max-width: 800px) {
    .choices { grid-template-columns: 1fr 1fr; }
    .prompt-card { grid-template-columns: 1fr; }
    .prompt-card details { grid-column: 1; }
  }
  @media (max-width: 520px) { .choices { grid-template-columns: 1fr; } }
</style>
