<script lang="ts">
  import InlineMotion from './InlineMotion.svelte';

  export let lens: string[];
  export let gospelName: string;
</script>

<section class="toolkit" aria-labelledby="toolkit-title">
  <div class="toolkit-hero">
    <div>
      <p class="section-kicker">Words you need to know</p>
      <h2 id="toolkit-title">A simple guide to reading Scripture</h2>
    </div>
    <p>Start with what the passage says. Then use evidence from the text to explain its deeper meaning.</p>
  </div>

  <div class="method-grid">
    <article>
      <span class="method-number">01</span>
      <h3>Hermeneutics</h3>
      <p>The way we interpret a text. It includes the questions and methods we use to understand meaning.</p>
    </article>
    <article>
      <span class="method-number">02</span>
      <h3>Exegesis</h3>
      <p>Building an interpretation from evidence in the passage and its original context.</p>
    </article>
    <article class="warning-card">
      <span class="method-number">03</span>
      <h3>Eisegesis</h3>
      <p>Putting your own idea into a passage when the text does not support it.</p>
    </article>
  </div>

  <div class="senses-panel">
    <div class="senses-intro">
      <p class="section-kicker">One passage · Four questions</p>
      <h3>The Four Senses, made simple</h3>
      <p>Always answer the literal question first. The other three questions build from it.</p>
    </div>
    <ol>
      <li><b>L</b><span><strong>Literal</strong>What happens in the passage?</span></li>
      <li><b>A</b><span><strong>Allegorical</strong>What does it show about Jesus and salvation?</span></li>
      <li><b>M</b><span><strong>Moral</strong>How should people live?</span></li>
      <li><b>A</b><span><strong>Anagogical</strong>How does it point to eternal life or God’s Kingdom?</span></li>
    </ol>
  </div>

  <InlineMotion
    id="four-senses-motion"
    title="The Four Senses: One Text, Four Connected Questions"
    description="Use the animation to see why the literal sense remains the foundation for allegorical, moral, and anagogical reading."
    src="media/four-senses-motion.mp4"
    poster="media/four-senses-poster.png"
    textAlternative="The animation begins with the literal sense as the foundation: what the text communicates in context. Allegorical, moral, and anagogical cards then build from that foundation, asking how the passage reveals Christ and salvation, calls God's people to live, and points toward creation's fulfillment. It ends with the reminder that deeper interpretation does not mean detaching from the text."
  />

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
