<script lang="ts">
  export let lens: string[];
  export let gospelName: string;
</script>

<section class="toolkit" aria-labelledby="toolkit-title">
  <div class="toolkit-hero">
    <div>
      <p class="section-kicker">Before you interpret</p>
      <h2 id="toolkit-title">Your Unit 2 field kit</h2>
    </div>
    <p>Strong spiritual reading begins with close attention to what the text actually communicates.</p>
  </div>

  <div class="method-grid">
    <article>
      <span class="method-number">01</span>
      <h3>Hermeneutics</h3>
      <p>The study and practice of interpretation—the choices and principles readers bring to meaning.</p>
    </article>
    <article>
      <span class="method-number">02</span>
      <h3>Exegesis</h3>
      <p>Drawing meaning from the text by attending to context, author, audience, genre, structure, and message.</p>
    </article>
    <article class="warning-card">
      <span class="method-number">03</span>
      <h3>Eisegesis</h3>
      <p>Reading an opinion or assumption into the text without sufficient evidence from the passage.</p>
    </article>
  </div>

  <div class="senses-panel">
    <div class="senses-intro">
      <p class="section-kicker">One text · Four connected questions</p>
      <h3>The Four Senses</h3>
      <p>The spiritual senses deepen the literal sense; they do not replace it.</p>
    </div>
    <ol>
      <li><b>L</b><span><strong>Literal</strong>What does the text communicate in context?</span></li>
      <li><b>A</b><span><strong>Allegorical</strong>How does it reveal Christ and salvation?</span></li>
      <li><b>M</b><span><strong>Moral</strong>How should God’s people live?</span></li>
      <li><b>A</b><span><strong>Anagogical</strong>Where is God leading creation?</span></li>
    </ol>
  </div>

  <div class="gospel-lens">
    <span class="lens-label">THE {gospelName.toUpperCase()} LENS</span>
    <div class="lens-grid">
      {#each lens as item, index}
        <p><b>0{index + 1}</b>{item}</p>
      {/each}
    </div>
  </div>
</section>

<style>
  .toolkit { display: grid; gap: 28px; }
  .toolkit-hero { display: flex; justify-content: space-between; gap: 40px; align-items: end; }
  .toolkit-hero h2 { margin: 0; font: 400 clamp(2.3rem, 5vw, 4rem)/1 Georgia, serif; letter-spacing: -.04em; }
  .toolkit-hero > p { max-width: 420px; margin: 0; color: var(--lesson-muted); line-height: 1.7; }
  .section-kicker { margin: 0 0 11px; color: var(--lesson-secondary); font-size: .68rem; letter-spacing: .14em; font-weight: 850; text-transform: uppercase; }
  .method-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .method-grid article { min-height: 220px; padding: 24px; border: 1px solid var(--lesson-border); border-radius: 18px; background: var(--lesson-surface); }
  .method-grid .warning-card { background: color-mix(in srgb, var(--lesson-accent) 8%, var(--lesson-surface)); }
  .method-number { color: var(--lesson-accent); font: 400 1.4rem Georgia, serif; }
  .method-grid h3 { margin: 38px 0 10px; font: 400 1.55rem Georgia, serif; }
  .method-grid p { margin: 0; color: var(--lesson-muted); font-size: .9rem; line-height: 1.65; }
  .senses-panel { display: grid; grid-template-columns: .8fr 1.2fr; gap: 50px; padding: clamp(26px, 5vw, 48px); border-radius: 24px; background: var(--lesson-primary); color: var(--lesson-surface); }
  .senses-intro h3 { margin: 0 0 16px; font: 400 2.4rem Georgia, serif; }
  .senses-intro > p:last-child { color: color-mix(in srgb, var(--lesson-surface) 68%, transparent); line-height: 1.6; }
  .senses-panel .section-kicker { color: var(--lesson-accent); }
  .senses-panel ol { margin: 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .senses-panel li { display: grid; grid-template-columns: 36px 1fr; gap: 12px; padding: 15px; border: 1px solid color-mix(in srgb, var(--lesson-surface) 18%, transparent); border-radius: 12px; }
  .senses-panel li b { display: grid; place-items: center; width: 32px; height: 32px; border-radius: 50%; background: var(--lesson-accent); color: var(--lesson-primary); }
  .senses-panel li span { color: color-mix(in srgb, var(--lesson-surface) 70%, transparent); font-size: .78rem; line-height: 1.45; }
  .senses-panel li strong { display: block; margin-bottom: 3px; color: var(--lesson-surface); font-size: .9rem; }
  .gospel-lens { padding: 26px; border: 1px solid var(--lesson-border); border-radius: 18px; background: color-mix(in srgb, var(--lesson-background) 72%, var(--lesson-surface)); }
  .lens-label { display: block; margin-bottom: 18px; color: var(--lesson-secondary); font-weight: 850; font-size: .68rem; letter-spacing: .14em; }
  .lens-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 28px; }
  .lens-grid p { margin: 0; display: grid; grid-template-columns: 28px 1fr; gap: 10px; color: var(--lesson-muted); line-height: 1.55; font-size: .86rem; }
  .lens-grid b { color: var(--lesson-accent); font: 400 1rem Georgia, serif; }
  @media (max-width: 800px) {
    .toolkit-hero { display: block; }
    .toolkit-hero > p { margin-top: 20px; }
    .method-grid { grid-template-columns: 1fr; }
    .method-grid article { min-height: 180px; }
    .senses-panel { grid-template-columns: 1fr; gap: 24px; }
  }
  @media (max-width: 560px) {
    .senses-panel ol, .lens-grid { grid-template-columns: 1fr; }
  }
</style>
