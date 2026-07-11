<script lang="ts">
  import { onMount } from 'svelte';
  import type { GospelLesson } from '../content/types';
  import { grantTeacherAccess, hasTeacherAccess, revokeTeacherAccess } from '../utils/teacherAccess';
  import TeacherAssignmentBuilder from './TeacherAssignmentBuilder.svelte';

  export let lessons: GospelLesson[];
  export let base = '/';

  let unlocked = false;
  let pin = '';
  let error = '';

  onMount(() => {
    unlocked = hasTeacherAccess();
  });

  function unlock() {
    if (grantTeacherAccess(pin)) {
      unlocked = true;
      pin = '';
      error = '';
      return;
    }
    error = 'Incorrect PIN. Please try again.';
    pin = '';
  }

  function lock() {
    revokeTeacherAccess();
    unlocked = false;
    pin = '';
    error = '';
  }
</script>

{#if unlocked}
  <div class="access-strip">
    <span><b>Teacher Tools unlocked</b> for this browser tab</span>
    <button on:click={lock}>Lock Teacher Tools</button>
  </div>
  <TeacherAssignmentBuilder {lessons} {base} />
{:else}
  <div class="pin-shell">
    <header><a href={base}>← Learning Hub</a><span>HRE4M · TEACHER ACCESS</span></header>
    <main id="main-content">
      <section class="pin-card" aria-labelledby="teacher-access-title">
        <div class="lock-mark" aria-hidden="true"><span></span></div>
        <p>Restricted workspace</p>
        <h1 id="teacher-access-title">Teacher Tools</h1>
        <span class="intro">Enter the four-digit teacher PIN to create assignment links and open teacher controls.</span>
        <form on:submit|preventDefault={unlock}>
          <label for="teacher-pin">Teacher PIN</label>
          <input
            id="teacher-pin"
            bind:value={pin}
            type="password"
            inputmode="numeric"
            pattern="[0-9]*"
            maxlength="4"
            autocomplete="off"
            autofocus
            aria-describedby={error ? 'pin-error' : undefined}
          />
          {#if error}<p id="pin-error" class="error" role="alert">{error}</p>{/if}
          <button type="submit" disabled={pin.length !== 4}>Unlock Teacher Tools</button>
        </form>
        <small>Access remains unlocked only in this browser tab.</small>
      </section>
    </main>
  </div>
{/if}

<style>
  .pin-shell { min-height: 100vh; background: radial-gradient(circle at 75% 10%, rgba(197,139,43,.17), transparent 25rem), #f4f0e7; color: #17203c; }
  header { width: min(1100px, calc(100% - 40px)); min-height: 74px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #d9d1bf; }
  header a { color: #253567; font-size: .78rem; font-weight: 800; text-decoration: none; }
  header span { color: #7a6a54; font-size: .66rem; font-weight: 850; letter-spacing: .15em; }
  main { min-height: calc(100vh - 74px); display: grid; place-items: center; padding: 45px 20px 90px; }
  .pin-card { width: min(480px, 100%); padding: clamp(34px, 7vw, 58px); border: 1px solid #d9d1bf; border-radius: 26px; background: #fffdf8; box-shadow: 0 28px 80px rgba(50,39,21,.12); text-align: center; }
  .lock-mark { width: 72px; height: 62px; margin: 0 auto 28px; display: grid; place-items: center; border-radius: 18px; background: #18234d; position: relative; }
  .lock-mark::before { content: ''; position: absolute; width: 30px; height: 25px; top: -17px; border: 5px solid #c58b2b; border-bottom: 0; border-radius: 18px 18px 0 0; }
  .lock-mark span { width: 9px; height: 17px; border-radius: 999px; background: #f0c66f; }
  .pin-card > p { margin: 0 0 9px; color: #9b6d29; font-size: .65rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  h1 { margin: 0; font: 400 clamp(2.8rem, 8vw, 4.4rem)/1 Georgia, serif; letter-spacing: -.045em; }
  .intro { display: block; margin: 18px auto 30px; color: #6f675d; font-size: .84rem; line-height: 1.65; }
  form { display: grid; gap: 10px; text-align: left; }
  label { color: #62594d; font-size: .66rem; font-weight: 850; letter-spacing: .11em; text-transform: uppercase; }
  input { width: 100%; min-height: 58px; border: 1px solid #d2c8b5; border-radius: 12px; background: #f8f4eb; color: #17203c; font-size: 1.45rem; letter-spacing: .5em; text-align: center; }
  form button { min-height: 50px; margin-top: 5px; border: 0; border-radius: 12px; background: #18234d; color: white; font-weight: 800; cursor: pointer; }
  form button:disabled { opacity: .42; cursor: not-allowed; }
  .error { margin: 0; color: #a12d43; font-size: .74rem; font-weight: 750; text-align: center; }
  .pin-card > small { display: block; margin-top: 19px; color: #81796f; font-size: .68rem; }
  .access-strip { min-height: 48px; display: flex; align-items: center; justify-content: center; gap: 18px; padding: 8px 20px; background: #0f1838; color: #d7ddf3; font-size: .7rem; }
  .access-strip b { color: #f0c66f; }
  .access-strip button { padding: 6px 10px; border: 1px solid #64709b; border-radius: 999px; background: transparent; color: white; font-size: .65rem; font-weight: 750; cursor: pointer; }
  @media (max-width: 560px) { header span { display: none; } .access-strip { justify-content: space-between; } }
</style>
