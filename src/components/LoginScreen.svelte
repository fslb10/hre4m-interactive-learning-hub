<script lang="ts">
  import type { StudentInfo } from '../utils/storage';

  export let lessonName: string;
  export let symbol: string;
  export let prefill: StudentInfo = { lastName: '', firstName: '', period: '' };
  export let onSubmit: (student: StudentInfo) => void;

  let lastName = prefill.lastName;
  let firstName = prefill.firstName;
  let period = prefill.period;
  let error = '';

  $: if (prefill && !lastName && !firstName && !period) {
    lastName = prefill.lastName;
    firstName = prefill.firstName;
    period = prefill.period;
  }

  function submit() {
    if (!lastName.trim() || !firstName.trim() || !period) {
      error = 'Complete all three fields to enter the lesson.';
      return;
    }

    error = '';
    onSubmit({
      lastName: lastName.trim(),
      firstName: firstName.trim(),
      period,
    });
  }
</script>

<div class="login-stage">
  <div class="login-glow" aria-hidden="true"></div>
  <section class="login-card" aria-labelledby="login-title">
    <div class="login-brand">
      <span class="login-symbol" aria-hidden="true">{symbol}</span>
      <span>HRE4M · UNIT 2</span>
    </div>

    <div class="login-intro">
      <p>Student entry</p>
      <h1 id="login-title">Ready to read<br />beneath the surface?</h1>
      <span>{lessonName}</span>
    </div>

    <form on:submit|preventDefault={submit}>
      <div class="field-row">
        <label>
          <span>Last name</span>
          <input bind:value={lastName} autocomplete="family-name" placeholder="Enter last name" />
        </label>
        <label>
          <span>First name</span>
          <input bind:value={firstName} autocomplete="given-name" placeholder="Enter first name" />
        </label>
      </div>
      <label>
        <span>Class period</span>
        <select bind:value={period}>
          <option value="" disabled>Select a period</option>
          {#each [1, 2, 3, 4, 5] as number}
            <option value={`Period ${number}`}>Period {number}</option>
          {/each}
        </select>
      </label>

      {#if error}<p class="form-error" role="alert">{error}</p>{/if}

      <button type="submit">Enter the Gospel lab <span aria-hidden="true">→</span></button>
    </form>

    <p class="privacy-note">
      <span aria-hidden="true">◌</span>
      Your work saves only in this browser. This is a classroom information gate, not an online account.
    </p>
  </section>
</div>

<style>
  .login-stage {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 30px;
    background:
      linear-gradient(115deg, color-mix(in srgb, var(--lesson-primary) 96%, #000), var(--lesson-primary)),
      var(--lesson-primary);
    position: relative;
    overflow: hidden;
  }
  .login-stage::before,
  .login-stage::after {
    content: '';
    position: absolute;
    border: 1px solid color-mix(in srgb, var(--lesson-accent) 38%, transparent);
    border-radius: 50%;
  }
  .login-stage::before { width: 620px; height: 620px; left: -280px; top: -340px; }
  .login-stage::after { width: 440px; height: 440px; right: -160px; bottom: -230px; }
  .login-glow { position: absolute; width: 420px; height: 420px; border-radius: 50%; background: var(--lesson-accent); filter: blur(140px); opacity: .16; top: 10%; right: 13%; }
  .login-card {
    position: relative;
    z-index: 1;
    width: min(760px, 100%);
    padding: clamp(28px, 6vw, 66px);
    border: 1px solid color-mix(in srgb, var(--lesson-accent) 40%, transparent);
    border-radius: 28px;
    color: var(--lesson-text);
    background: color-mix(in srgb, var(--lesson-surface) 97%, transparent);
    box-shadow: 0 40px 100px rgba(0,0,0,.28);
  }
  .login-brand { display: flex; align-items: center; gap: 12px; color: var(--lesson-primary); font-size: .72rem; letter-spacing: .16em; font-weight: 800; }
  .login-symbol { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font-size: 1.15rem; }
  .login-intro { margin: 46px 0 36px; }
  .login-intro p { margin: 0 0 11px; color: var(--lesson-secondary); font-size: .72rem; text-transform: uppercase; font-weight: 800; letter-spacing: .13em; }
  .login-intro h1 { margin: 0 0 14px; color: var(--lesson-text); font: 400 clamp(2.6rem, 7vw, 4.7rem)/.96 Georgia, serif; letter-spacing: -.045em; }
  .login-intro > span { color: var(--lesson-muted); }
  form { display: grid; gap: 18px; }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  label { display: grid; gap: 8px; }
  label > span { color: var(--lesson-muted); font-size: .69rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  input, select {
    width: 100%;
    min-height: 52px;
    border: 1px solid var(--lesson-border);
    border-radius: 11px;
    padding: 0 15px;
    background: color-mix(in srgb, var(--lesson-background) 45%, white);
    color: var(--lesson-text);
  }
  input:focus, select:focus { border-color: var(--lesson-accent); outline: 3px solid color-mix(in srgb, var(--lesson-accent) 20%, transparent); }
  button {
    margin-top: 8px;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border: 0;
    border-radius: 12px;
    background: var(--lesson-primary);
    color: var(--lesson-surface);
    font-weight: 780;
    cursor: pointer;
  }
  button span { color: var(--lesson-accent); font-size: 1.25rem; }
  .form-error { margin: 0; color: #a02c39; font-weight: 700; font-size: .86rem; }
  .privacy-note { margin: 26px 0 0; display: flex; gap: 9px; color: var(--lesson-muted); font-size: .75rem; line-height: 1.5; }
  .privacy-note span { color: var(--lesson-accent); }
  @media (max-width: 620px) {
    .login-stage { padding: 14px; align-items: start; }
    .login-card { margin-top: 18px; border-radius: 20px; }
    .field-row { grid-template-columns: 1fr; }
    .login-intro { margin: 34px 0 28px; }
  }
</style>
