<script lang="ts">
  import type { GospelLesson } from '../content/types';
  import type { LessonState, StudentInfo } from '../utils/storage';
  import { completionSummary } from '../utils/progress';

  export let lesson: GospelLesson;
  export let student: StudentInfo;
  export let state: LessonState;
  export let onExport: () => void;
  export let onCopy: () => void;
  export let onPrint: () => void;

  $: summary = completionSummary(lesson, state);
  $: completedResponseCount = Object.values(state.responses).filter((response) =>
    [response.literal, response.allegorical, response.moral, response.anagogical, response.exit].some((value) => value.trim()),
  ).length;
</script>

<section class="collection-shell" aria-labelledby="collection-title">
  <header class="collection-header no-print">
    <div>
      <p>Teacher collection view</p>
      <h2 id="collection-title">Clean work record</h2>
      <span>Only fields with student writing appear below.</span>
    </div>
    <div class="collection-actions">
      <button on:click={onCopy}>Copy all</button>
      <button on:click={onExport}>Export .txt</button>
      <button class="primary" on:click={onPrint}>Print / PDF</button>
    </div>
  </header>

  <article class="report" id="student-report">
    <header class="report-heading">
      <div>
        <p>HRE4M · UNIT 2</p>
        <h1>{lesson.title}</h1>
      </div>
      <span>{lesson.symbol}</span>
    </header>

    <div class="student-strip">
      <span><small>Student</small><b>{student.lastName}, {student.firstName}</b></span>
      <span><small>Class</small><b>{student.period}</b></span>
      <span><small>Progress</small><b>{summary.percentage}%</b></span>
      <span><small>Passages</small><b>{summary.fullPassages}/{lesson.passages.length}</b></span>
    </div>

    {#if completedResponseCount === 0 && !state.synthesis.trim() && !state.reflectionResponse.trim()}
      <div class="empty-report">No written responses yet. Completed work will appear here.</div>
    {/if}

    {#each lesson.passages as passage}
      {@const response = state.responses[passage.id]}
      {#if response && [response.literal, response.allegorical, response.moral, response.anagogical, response.exit].some((value) => value.trim())}
        <section class="report-section">
          <div class="report-title"><span>{passage.reference}</span><h2>{passage.title}</h2></div>
          <div class="report-responses">
            {#each [
              ['Literal / Context', response.literal],
              ['Allegorical', response.allegorical],
              ['Moral', response.moral],
              ['Anagogical', response.anagogical],
              ['Exit Check', response.exit],
            ] as field}
              {#if field[1].trim()}<div><b>{field[0]}</b><p>{field[1]}</p></div>{/if}
            {/each}
          </div>
        </section>
      {/if}
    {/each}

    {#if state.synthesis.trim()}
      <section class="report-section"><div class="report-title"><span>Final task</span><h2>Mini-exegesis</h2></div><div class="report-responses"><div><p>{state.synthesis}</p></div></div></section>
    {/if}

    {#if state.reflectionResponse.trim()}
      <section class="report-section"><div class="report-title"><span>Reflection route</span><h2>{state.reflectionChoice}</h2></div><div class="report-responses"><div><p>{state.reflectionResponse}</p></div></div></section>
    {/if}

    <footer class="report-footer">
      <span>Exegesis check: {summary.quizCorrect}/{lesson.quiz.length}</span>
      <span>Four Senses sorter: {summary.sortCorrect}/{lesson.sortingActivity.length}</span>
      <span>Last saved: {new Date(state.updatedAt).toLocaleString()}</span>
    </footer>
  </article>
</section>

<style>
  .collection-shell { display: grid; gap: 24px; }
  .collection-header { display: flex; justify-content: space-between; align-items: end; gap: 25px; }
  .collection-header p { margin: 0 0 10px; color: var(--lesson-secondary); font-size: .68rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  .collection-header h2 { margin: 0 0 8px; font: 400 clamp(2.2rem, 5vw, 3.6rem)/1 Georgia, serif; }
  .collection-header span { color: var(--lesson-muted); font-size: .82rem; }
  .collection-actions { display: flex; flex-wrap: wrap; justify-content: end; gap: 8px; }
  .collection-actions button { padding: 10px 13px; border: 1px solid var(--lesson-border); border-radius: 999px; background: var(--lesson-surface); color: var(--lesson-text); font-size: .75rem; font-weight: 760; cursor: pointer; }
  .collection-actions .primary { border-color: var(--lesson-primary); background: var(--lesson-primary); color: var(--lesson-surface); }
  .report { padding: clamp(25px, 5vw, 52px); border: 1px solid var(--lesson-border); border-radius: 20px; background: white; color: #25242a; box-shadow: 0 20px 50px rgba(0,0,0,.06); }
  .report-heading { display: flex; justify-content: space-between; gap: 20px; padding-bottom: 26px; border-bottom: 3px solid var(--lesson-primary); }
  .report-heading p { margin: 0 0 6px; color: var(--lesson-secondary); font-size: .66rem; font-weight: 850; letter-spacing: .13em; }
  .report-heading h1 { margin: 0; font: 400 clamp(2rem, 5vw, 3.4rem)/1 Georgia, serif; }
  .report-heading > span { display: grid; place-items: center; flex: 0 0 auto; width: 54px; height: 54px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font-size: 1.3rem; }
  .student-strip { display: grid; grid-template-columns: 1.7fr repeat(3, 1fr); border-bottom: 1px solid #ddd; }
  .student-strip > span { padding: 18px 15px; border-right: 1px solid #ddd; }
  .student-strip > span:last-child { border-right: 0; }
  .student-strip small, .student-strip b { display: block; }
  .student-strip small { margin-bottom: 5px; color: #777; font-size: .62rem; text-transform: uppercase; letter-spacing: .1em; }
  .student-strip b { font-size: .82rem; }
  .empty-report { margin: 35px 0; padding: 24px; border: 1px dashed #bbb; border-radius: 12px; color: #777; text-align: center; }
  .report-section { padding: 28px 0; border-bottom: 1px solid #ddd; }
  .report-title span { color: var(--lesson-secondary); font-size: .65rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
  .report-title h2 { margin: 5px 0 18px; font: 400 1.65rem Georgia, serif; }
  .report-responses { display: grid; gap: 16px; }
  .report-responses b { color: #555; font-size: .67rem; text-transform: uppercase; letter-spacing: .09em; }
  .report-responses p { margin: 5px 0 0; white-space: pre-wrap; line-height: 1.65; font-size: .86rem; }
  .report-footer { display: flex; flex-wrap: wrap; gap: 10px 28px; padding-top: 22px; color: #777; font-size: .68rem; }
  @media (max-width: 800px) {
    .collection-header { display: block; }
    .collection-actions { justify-content: start; margin-top: 18px; }
    .student-strip { grid-template-columns: 1fr 1fr; }
    .student-strip > span { border-bottom: 1px solid #ddd; }
  }
  @media print {
    .no-print { display: none !important; }
    .collection-shell { display: block; }
    .report { padding: 0; border: 0; border-radius: 0; box-shadow: none; }
    .report-section { break-inside: avoid; }
  }
</style>
