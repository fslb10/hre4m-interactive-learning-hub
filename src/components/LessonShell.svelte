<script lang="ts">
  import { onMount } from 'svelte';
  import type { GospelLesson } from '../content/types';
  import {
    clearLastStudent,
    clearLessonState,
    emptyLessonState,
    emptyPassageResponse,
    loadLastStudent,
    loadLessonState,
    saveLastStudent,
    saveLessonState,
    type LessonState,
    type PassageResponse,
    type StudentInfo,
  } from '../utils/storage';
  import { buildStudentExport, exportFilename } from '../utils/exportText';
  import { completionSummary, getBadges, passageComplete } from '../utils/progress';
  import ExegesisQuiz from './ExegesisQuiz.svelte';
  import FinalActivities from './FinalActivities.svelte';
  import FourSensesSorter from './FourSensesSorter.svelte';
  import LoginScreen from './LoginScreen.svelte';
  import PassageActivity from './PassageActivity.svelte';
  import PassageSelector from './PassageSelector.svelte';
  import TeacherCollectionView from './TeacherCollectionView.svelte';
  import UnitToolkit from './UnitToolkit.svelte';

  export let lesson: GospelLesson;
  export let homeHref = '/';

  type View = 'overview' | 'passages' | 'quiz' | 'sorter' | 'synthesis' | 'collection';

  let loggedIn = false;
  let prefill: StudentInfo = { lastName: '', firstName: '', period: '' };
  let student: StudentInfo = { lastName: '', firstName: '', period: '' };
  let state: LessonState = emptyLessonState();
  let view: View = 'overview';
  let activePassageId = '';
  let teacherMode = false;
  let sidebarOpen = false;
  let toast = '';
  let toastTimer: ReturnType<typeof setTimeout> | undefined;

  const navItems: Array<{ id: View; icon: string; label: string; short: string }> = [
    { id: 'overview', icon: '⌂', label: 'Gospel lens', short: 'Lens' },
    { id: 'passages', icon: '◫', label: 'Passage library', short: 'Passages' },
    { id: 'quiz', icon: '⌕', label: 'Exegesis check', short: 'Quiz' },
    { id: 'sorter', icon: '✣', label: 'Four Senses sorter', short: 'Sorter' },
    { id: 'synthesis', icon: '✎', label: 'Synthesis & reflection', short: 'Final' },
    { id: 'collection', icon: '▤', label: 'Collection view', short: 'Report' },
  ];

  const themeStyle = [
    `--lesson-background:${lesson.theme.colors.background}`,
    `--lesson-surface:${lesson.theme.colors.surface}`,
    `--lesson-primary:${lesson.theme.colors.primary}`,
    `--lesson-secondary:${lesson.theme.colors.secondary}`,
    `--lesson-accent:${lesson.theme.colors.accent}`,
    `--lesson-text:${lesson.theme.colors.text}`,
    `--lesson-muted:${lesson.theme.colors.muted}`,
    `--lesson-border:${lesson.theme.colors.border}`,
  ].join(';');

  $: summary = completionSummary(lesson, state);
  $: badges = getBadges(lesson, state, loggedIn);
  $: activePassage = lesson.passages.find((passage) => passage.id === activePassageId);
  $: nextPassage = lesson.passages.find((passage) => !passageComplete(state.responses[passage.id])) ?? lesson.passages[0];

  onMount(() => {
    const previous = loadLastStudent();
    if (previous) prefill = previous;
  });

  function notify(message: string) {
    toast = message;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast = ''), 2600);
  }

  function enterLesson(info: StudentInfo) {
    student = info;
    prefill = info;
    saveLastStudent(info);
    state = loadLessonState(lesson.id, info);
    loggedIn = true;
    view = 'overview';
    activePassageId = '';
  }

  function commit(next: LessonState) {
    state = { ...next, updatedAt: new Date().toISOString() };
    if (loggedIn) saveLessonState(lesson.id, student, state);
  }

  function updatePassage(id: string, response: PassageResponse) {
    commit({ ...state, responses: { ...state.responses, [id]: response } });
  }

  function navigate(target: View) {
    view = target;
    if (target !== 'passages') activePassageId = '';
    sidebarOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openPassage(id: string) {
    activePassageId = id;
    view = 'passages';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function downloadWork() {
    const text = buildStudentExport(lesson, student, state);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFilename(lesson, student);
    link.click();
    URL.revokeObjectURL(url);
    notify('Student work exported.');
  }

  async function copyWork() {
    try {
      await navigator.clipboard.writeText(buildStudentExport(lesson, student, state));
      notify('All completed work copied.');
    } catch {
      notify('Copy was blocked. Use Export .txt instead.');
    }
  }

  function resetResponses() {
    if (!window.confirm(`Clear all saved ${lesson.shortName} responses for ${student.firstName}? This cannot be undone.`)) return;
    clearLessonState(lesson.id, student);
    state = emptyLessonState();
    activePassageId = '';
    view = 'overview';
    notify('Lesson responses cleared.');
  }

  function clearEverything() {
    if (!window.confirm('Clear this lesson and the saved student information on this browser?')) return;
    clearLessonState(lesson.id, student);
    clearLastStudent();
    state = emptyLessonState();
    student = { lastName: '', firstName: '', period: '' };
    prefill = { lastName: '', firstName: '', period: '' };
    loggedIn = false;
    view = 'overview';
  }
</script>

<div class="lesson-root" style={themeStyle}>
  {#if !loggedIn}
    <LoginScreen lessonName={lesson.title} symbol={lesson.symbol} {prefill} onSubmit={enterLesson} />
  {:else}
    <div class="app-shell">
      <aside class:open={sidebarOpen} class="sidebar">
        <div class="side-brand">
          <a href={homeHref} aria-label="Back to learning hub"><span>{lesson.symbol}</span><b>HRE4M</b></a>
          <button class="close-sidebar" on:click={() => (sidebarOpen = false)} aria-label="Close lesson menu">×</button>
        </div>

        <div class="lesson-identity">
          <small>UNIT 2 · GOSPEL LAB</small>
          <strong>{lesson.shortName}</strong>
          <span>{lesson.theme.motif}</span>
        </div>

        <nav aria-label="Lesson sections">
          {#each navItems as item}
            <button class:active={view === item.id} on:click={() => navigate(item.id)}>
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </button>
          {/each}
        </nav>

        <div class="side-progress">
          <div class="progress-label"><span>Overall progress</span><b>{summary.percentage}%</b></div>
          <div class="progress-track"><span style={`width:${summary.percentage}%`}></span></div>
          <small>{summary.fullPassages}/{lesson.passages.length} full passages · autosaved locally</small>
        </div>

        <div class="teacher-toggle">
          <div><b>Teacher mode</b><small>Notes + unlocked fields</small></div>
          <button class:on={teacherMode} on:click={() => (teacherMode = !teacherMode)} aria-pressed={teacherMode} aria-label="Toggle teacher mode"><span></span></button>
        </div>
      </aside>

      {#if sidebarOpen}<button class="scrim" on:click={() => (sidebarOpen = false)} aria-label="Close lesson menu"></button>{/if}

      <div class="main-column">
        <header class="topbar">
          <button class="menu-button" on:click={() => (sidebarOpen = true)} aria-label="Open lesson menu">☰</button>
          <div class="crumb"><a href={homeHref}>Learning Hub</a><span>/</span><b>Unit 2 · {lesson.shortName}</b></div>
          <div class="student-menu">
            <span class="student-avatar">{student.firstName.charAt(0)}{student.lastName.charAt(0)}</span>
            <span><strong>{student.firstName} {student.lastName}</strong><small>{student.period}</small></span>
            <button on:click={() => (loggedIn = false)} aria-label="Edit student information">Edit</button>
          </div>
        </header>

        <main class="lesson-content">
          {#if view === 'overview'}
            <section class="lesson-landing" aria-labelledby="lesson-title">
              <div class="landing-copy">
                <p>{lesson.eyebrow}</p>
                <h1 id="lesson-title">{lesson.title}</h1>
                <span>{lesson.subtitle}</span>
                <div class="landing-actions">
                  <button class="primary-action" on:click={() => openPassage(nextPassage.id)}>{summary.literalPassages ? 'Continue investigation' : 'Begin first investigation'} <b>→</b></button>
                  <button class="secondary-action" on:click={() => navigate('passages')}>Browse passages</button>
                </div>
              </div>
              <div class="progress-medallion" style={`--progress:${summary.percentage * 3.6}deg`}>
                <div><strong>{summary.percentage}%</strong><span>complete</span></div>
                <small>{summary.fullPassages}<br />passages</small>
              </div>
            </section>

            <section class="student-dashboard" aria-label="Student progress summary">
              <div><small>Welcome back</small><strong>{student.firstName}</strong><span>{student.period}</span></div>
              <div><small>Next passage</small><strong>{nextPassage.reference}</strong><span>{nextPassage.title}</span></div>
              <div><small>Checks</small><strong>{summary.quizCorrect + summary.sortCorrect}/{lesson.quiz.length + lesson.sortingActivity.length}</strong><span>correct matches</span></div>
              <div><small>Saved</small><strong>On this device</strong><span>{new Date(state.updatedAt).toLocaleDateString()}</span></div>
            </section>

            <UnitToolkit lens={lesson.gospelLens} gospelName={lesson.shortName} />

            <section class="badge-section" aria-labelledby="badge-title">
              <div class="badge-heading"><div><p>Learning milestones</p><h2 id="badge-title">Badge cabinet</h2></div><span>{badges.filter((badge) => badge.earned).length}/{badges.length} earned</span></div>
              <div class="badge-grid">
                {#each badges as badge}
                  <article class:earned={badge.earned}>
                    <b aria-hidden="true">{badge.icon}</b><div><strong>{badge.label}</strong><span>{badge.description}</span></div>
                  </article>
                {/each}
              </div>
            </section>
          {:else if view === 'passages'}
            {#if activePassage}
              <PassageActivity
                passage={activePassage}
                response={state.responses[activePassage.id] ?? emptyPassageResponse()}
                {teacherMode}
                onChange={(response) => updatePassage(activePassage.id, response)}
                onBack={() => (activePassageId = '')}
              />
            {:else}
              <PassageSelector passages={lesson.passages} responses={state.responses} onSelect={openPassage} />
            {/if}
          {:else if view === 'quiz'}
            <ExegesisQuiz
              items={lesson.quiz}
              answers={state.quizAnswers}
              onAnswer={(id, answer) => commit({ ...state, quizAnswers: { ...state.quizAnswers, [id]: answer } })}
            />
          {:else if view === 'sorter'}
            <FourSensesSorter
              items={lesson.sortingActivity}
              answers={state.sortAnswers}
              onAnswer={(id, answer) => commit({ ...state, sortAnswers: { ...state.sortAnswers, [id]: answer } })}
            />
          {:else if view === 'synthesis'}
            <FinalActivities
              gospelName={lesson.shortName}
              synthesis={state.synthesis}
              reflectionChoice={state.reflectionChoice}
              reflectionResponse={state.reflectionResponse}
              onSynthesis={(value) => commit({ ...state, synthesis: value })}
              onReflectionChoice={(value) => commit({ ...state, reflectionChoice: value })}
              onReflectionResponse={(value) => commit({ ...state, reflectionResponse: value })}
            />
          {:else if view === 'collection'}
            <TeacherCollectionView {lesson} {student} {state} onExport={downloadWork} onCopy={copyWork} onPrint={() => window.print()} />
            <section class="data-controls no-print">
              <div><h3>Saved-work controls</h3><p>Use these only when you intend to remove work stored in this browser.</p></div>
              <div><button on:click={resetResponses}>Clear lesson responses</button><button class="danger" on:click={clearEverything}>Clear work + student info</button></div>
            </section>
          {/if}
        </main>

        <nav class="mobile-nav" aria-label="Mobile lesson sections">
          {#each navItems.slice(0, 5) as item}
            <button class:active={view === item.id} on:click={() => navigate(item.id)}><span>{item.icon}</span>{item.short}</button>
          {/each}
        </nav>
      </div>
    </div>

    {#if toast}<div class="toast" role="status">{toast}</div>{/if}
  {/if}
</div>

<style>
  .lesson-root { min-height: 100vh; background: var(--lesson-background); color: var(--lesson-text); }
  .app-shell { min-height: 100vh; display: grid; grid-template-columns: 282px minmax(0, 1fr); }
  .sidebar { position: sticky; top: 0; z-index: 50; height: 100vh; display: flex; flex-direction: column; padding: 23px 19px; background: var(--lesson-primary); color: var(--lesson-surface); overflow-y: auto; }
  .side-brand { display: flex; justify-content: space-between; align-items: center; }
  .side-brand a { display: inline-flex; align-items: center; gap: 10px; color: var(--lesson-surface); text-decoration: none; letter-spacing: .13em; font-size: .76rem; }
  .side-brand a span { display: grid; place-items: center; width: 33px; height: 33px; border: 1px solid color-mix(in srgb, var(--lesson-accent) 65%, transparent); border-radius: 50%; color: var(--lesson-accent); font-size: 1rem; }
  .close-sidebar { display: none; border: 0; background: none; color: var(--lesson-surface); font-size: 1.5rem; cursor: pointer; }
  .lesson-identity { margin: 40px 0 30px; padding: 20px 4px 26px; border-bottom: 1px solid color-mix(in srgb, var(--lesson-surface) 17%, transparent); }
  .lesson-identity small, .lesson-identity strong, .lesson-identity span { display: block; }
  .lesson-identity small { color: var(--lesson-accent); font-size: .58rem; font-weight: 850; letter-spacing: .15em; }
  .lesson-identity strong { margin: 11px 0 6px; font: 400 2.8rem/1 Georgia, serif; }
  .lesson-identity span { color: color-mix(in srgb, var(--lesson-surface) 65%, transparent); font-size: .68rem; }
  nav { display: grid; gap: 4px; }
  .sidebar nav button { width: 100%; display: flex; align-items: center; gap: 12px; padding: 10px 11px; border: 0; border-radius: 9px; background: transparent; color: color-mix(in srgb, var(--lesson-surface) 68%, transparent); text-align: left; font-size: .76rem; font-weight: 680; cursor: pointer; }
  .sidebar nav button:hover, .sidebar nav button.active { color: var(--lesson-surface); background: color-mix(in srgb, var(--lesson-surface) 10%, transparent); }
  .sidebar nav button span { display: grid; place-items: center; width: 24px; color: var(--lesson-accent); font-size: .95rem; }
  .side-progress { margin-top: auto; padding: 22px 4px; border-top: 1px solid color-mix(in srgb, var(--lesson-surface) 17%, transparent); }
  .progress-label { display: flex; justify-content: space-between; align-items: center; color: color-mix(in srgb, var(--lesson-surface) 72%, transparent); font-size: .65rem; }
  .progress-label b { color: var(--lesson-accent); }
  .progress-track { height: 5px; margin: 10px 0; border-radius: 999px; background: color-mix(in srgb, var(--lesson-surface) 14%, transparent); overflow: hidden; }
  .progress-track span { display: block; height: 100%; border-radius: inherit; background: var(--lesson-accent); transition: width .35s ease; }
  .side-progress small { color: color-mix(in srgb, var(--lesson-surface) 52%, transparent); font-size: .59rem; }
  .teacher-toggle { display: flex; align-items: center; justify-content: space-between; padding: 13px 4px 2px; border-top: 1px solid color-mix(in srgb, var(--lesson-surface) 17%, transparent); }
  .teacher-toggle b, .teacher-toggle small { display: block; }
  .teacher-toggle b { font-size: .68rem; }
  .teacher-toggle small { margin-top: 2px; color: color-mix(in srgb, var(--lesson-surface) 50%, transparent); font-size: .56rem; }
  .teacher-toggle > button { width: 37px; height: 21px; padding: 2px; border: 0; border-radius: 999px; background: color-mix(in srgb, var(--lesson-surface) 20%, transparent); cursor: pointer; transition: background .2s; }
  .teacher-toggle > button span { display: block; width: 17px; height: 17px; border-radius: 50%; background: var(--lesson-surface); transition: transform .2s; }
  .teacher-toggle > button.on { background: var(--lesson-accent); }
  .teacher-toggle > button.on span { transform: translateX(16px); background: var(--lesson-primary); }
  .scrim { display: none; }
  .main-column { min-width: 0; }
  .topbar { min-height: 72px; position: sticky; top: 0; z-index: 30; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 0 32px; border-bottom: 1px solid var(--lesson-border); background: color-mix(in srgb, var(--lesson-background) 88%, transparent); backdrop-filter: blur(16px); }
  .menu-button { display: none; border: 0; background: none; color: var(--lesson-text); font-size: 1.2rem; }
  .crumb { display: flex; gap: 9px; color: var(--lesson-muted); font-size: .68rem; }
  .crumb a { color: var(--lesson-secondary); text-decoration: none; }
  .crumb b { color: var(--lesson-text); }
  .student-menu { display: flex; align-items: center; gap: 9px; }
  .student-avatar { display: grid; place-items: center; width: 35px; height: 35px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); font-size: .65rem; font-weight: 850; }
  .student-menu strong, .student-menu small { display: block; }
  .student-menu strong { font-size: .72rem; }
  .student-menu small { color: var(--lesson-muted); font-size: .59rem; }
  .student-menu button { margin-left: 4px; border: 0; border-bottom: 1px solid var(--lesson-border); background: none; color: var(--lesson-secondary); font-size: .62rem; cursor: pointer; }
  .lesson-content { width: min(1160px, calc(100% - 56px)); margin: 0 auto; padding: 44px 0 110px; }
  .lesson-landing { min-height: 480px; display: grid; grid-template-columns: 1.35fr .65fr; align-items: center; gap: 50px; padding: clamp(34px, 6vw, 68px); border-radius: 28px; background: var(--lesson-primary); color: var(--lesson-surface); overflow: hidden; position: relative; }
  .lesson-landing::before { content: ''; position: absolute; width: 470px; height: 470px; border: 1px solid color-mix(in srgb, var(--lesson-accent) 45%, transparent); border-radius: 50%; right: -210px; top: -260px; box-shadow: 0 0 0 70px color-mix(in srgb, var(--lesson-accent) 5%, transparent); }
  .landing-copy { position: relative; z-index: 1; }
  .landing-copy > p { margin: 0 0 14px; color: var(--lesson-accent); font-size: .68rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
  .landing-copy h1 { max-width: 750px; margin: 0 0 21px; font: 400 clamp(3rem, 7vw, 6.4rem)/.9 Georgia, serif; letter-spacing: -.052em; }
  .landing-copy > span { display: block; max-width: 610px; color: color-mix(in srgb, var(--lesson-surface) 70%, transparent); line-height: 1.6; }
  .landing-actions { display: flex; gap: 9px; margin-top: 31px; }
  .landing-actions button { min-height: 44px; padding: 0 15px; border-radius: 999px; font-size: .74rem; font-weight: 780; cursor: pointer; }
  .primary-action { border: 0; background: var(--lesson-accent); color: var(--lesson-primary); }
  .primary-action b { margin-left: 13px; }
  .secondary-action { border: 1px solid color-mix(in srgb, var(--lesson-surface) 30%, transparent); background: transparent; color: var(--lesson-surface); }
  .progress-medallion { position: relative; z-index: 1; justify-self: center; display: grid; place-items: center; width: min(240px, 21vw); aspect-ratio: 1; border-radius: 50%; background: conic-gradient(var(--lesson-accent) var(--progress), color-mix(in srgb, var(--lesson-surface) 12%, transparent) 0); }
  .progress-medallion::before { content: ''; position: absolute; inset: 11px; border-radius: 50%; background: var(--lesson-primary); }
  .progress-medallion > div { position: relative; z-index: 1; text-align: center; }
  .progress-medallion strong, .progress-medallion span { display: block; }
  .progress-medallion strong { font: 400 clamp(2.4rem, 5vw, 4rem) Georgia, serif; }
  .progress-medallion span { color: color-mix(in srgb, var(--lesson-surface) 60%, transparent); font-size: .62rem; text-transform: uppercase; letter-spacing: .12em; }
  .progress-medallion small { position: absolute; z-index: 1; right: -17px; bottom: 11%; display: grid; place-items: center; width: 58px; height: 58px; border-radius: 50%; background: var(--lesson-accent); color: var(--lesson-primary); text-align: center; font-size: .58rem; font-weight: 800; }
  .student-dashboard { display: grid; grid-template-columns: repeat(4, 1fr); margin: 16px 0 70px; border: 1px solid var(--lesson-border); border-radius: 16px; background: var(--lesson-surface); overflow: hidden; }
  .student-dashboard > div { padding: 18px; border-right: 1px solid var(--lesson-border); }
  .student-dashboard > div:last-child { border-right: 0; }
  .student-dashboard small, .student-dashboard strong, .student-dashboard span { display: block; }
  .student-dashboard small { color: var(--lesson-muted); font-size: .6rem; text-transform: uppercase; letter-spacing: .1em; }
  .student-dashboard strong { margin: 8px 0 4px; font: 400 1.2rem Georgia, serif; }
  .student-dashboard span { color: var(--lesson-muted); font-size: .66rem; }
  .badge-section { margin-top: 70px; }
  .badge-heading { display: flex; justify-content: space-between; align-items: end; margin-bottom: 20px; }
  .badge-heading p { margin: 0 0 8px; color: var(--lesson-secondary); font-size: .66rem; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
  .badge-heading h2 { margin: 0; font: 400 2.5rem Georgia, serif; }
  .badge-heading > span { color: var(--lesson-muted); font-size: .75rem; }
  .badge-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
  .badge-grid article { min-height: 100px; display: grid; grid-template-columns: 36px 1fr; gap: 11px; align-items: center; padding: 16px; border: 1px solid var(--lesson-border); border-radius: 14px; background: var(--lesson-surface); opacity: .48; filter: grayscale(.75); }
  .badge-grid article.earned { opacity: 1; filter: none; border-color: color-mix(in srgb, var(--lesson-accent) 45%, var(--lesson-border)); }
  .badge-grid article > b { display: grid; place-items: center; width: 34px; height: 34px; border-radius: 50%; background: var(--lesson-primary); color: var(--lesson-accent); }
  .badge-grid strong, .badge-grid span { display: block; }
  .badge-grid strong { font-size: .75rem; }
  .badge-grid span { margin-top: 3px; color: var(--lesson-muted); font-size: .62rem; line-height: 1.35; }
  .data-controls { margin-top: 24px; display: flex; justify-content: space-between; align-items: center; gap: 30px; padding: 22px; border: 1px solid var(--lesson-border); border-radius: 15px; }
  .data-controls h3 { margin: 0 0 4px; font: 400 1.2rem Georgia, serif; }
  .data-controls p { margin: 0; color: var(--lesson-muted); font-size: .72rem; }
  .data-controls > div:last-child { display: flex; gap: 8px; }
  .data-controls button { padding: 9px 12px; border: 1px solid var(--lesson-border); border-radius: 9px; background: var(--lesson-surface); color: var(--lesson-text); font-size: .7rem; font-weight: 750; cursor: pointer; }
  .data-controls button.danger { color: #9f3346; border-color: #d9a2ad; }
  .mobile-nav { display: none; }
  .toast { position: fixed; z-index: 100; right: 25px; bottom: 25px; padding: 13px 17px; border-radius: 11px; background: var(--lesson-primary); color: var(--lesson-surface); box-shadow: 0 16px 40px rgba(0,0,0,.22); font-size: .78rem; font-weight: 720; }
  @media (max-width: 1040px) {
    .app-shell { grid-template-columns: 1fr; }
    .sidebar { position: fixed; left: 0; top: 0; width: min(300px, 86vw); transform: translateX(-105%); transition: transform .25s ease; box-shadow: 20px 0 60px rgba(0,0,0,.2); }
    .sidebar.open { transform: translateX(0); }
    .close-sidebar { display: block; }
    .scrim { display: block; position: fixed; inset: 0; z-index: 40; border: 0; background: rgba(0,0,0,.38); }
    .menu-button { display: block; }
    .badge-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 760px) {
    .topbar { padding: 0 15px; min-height: 62px; }
    .crumb { display: none; }
    .lesson-content { width: min(100% - 28px, 1160px); padding: 24px 0 95px; }
    .lesson-landing { min-height: auto; grid-template-columns: 1fr; }
    .progress-medallion { width: 190px; justify-self: start; }
    .student-dashboard { grid-template-columns: 1fr 1fr; }
    .student-dashboard > div { border-bottom: 1px solid var(--lesson-border); }
    .landing-actions { flex-wrap: wrap; }
    .mobile-nav { position: fixed; z-index: 35; left: 0; right: 0; bottom: 0; display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; padding: 7px max(7px, env(safe-area-inset-left)) calc(7px + env(safe-area-inset-bottom)); border-top: 1px solid var(--lesson-border); background: color-mix(in srgb, var(--lesson-surface) 95%, transparent); backdrop-filter: blur(14px); }
    .mobile-nav button { min-height: 47px; border: 0; border-radius: 8px; background: none; color: var(--lesson-muted); font-size: .54rem; font-weight: 720; }
    .mobile-nav button span { display: block; margin-bottom: 2px; color: var(--lesson-secondary); font-size: .9rem; }
    .mobile-nav button.active { background: color-mix(in srgb, var(--lesson-secondary) 9%, transparent); color: var(--lesson-text); }
    .data-controls { display: block; }
    .data-controls > div:last-child { margin-top: 16px; flex-wrap: wrap; }
  }
  @media (max-width: 520px) {
    .student-menu > span:not(.student-avatar) { display: none; }
    .badge-grid { grid-template-columns: 1fr; }
    .student-dashboard { grid-template-columns: 1fr; }
    .student-dashboard > div { border-right: 0; }
  }
  @media print {
    .sidebar, .topbar, .mobile-nav, .no-print, .toast { display: none !important; }
    .app-shell { display: block; }
    .lesson-content { width: 100%; padding: 0; }
    .lesson-root { background: white; }
  }
</style>
