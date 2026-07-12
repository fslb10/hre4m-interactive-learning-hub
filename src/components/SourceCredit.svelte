<script lang="ts">
  import type { MediaCredit } from '../content/types';
  import { deploymentSafeMediaUrl } from '../utils/media';

  export let credit: MediaCredit;
  const base = import.meta.env.BASE_URL;
  $: sourceUrl = credit.sourceUrl
    ? deploymentSafeMediaUrl(credit.sourceUrl, /^https?:\/\//i.test(credit.sourceUrl) ? 'external' : 'local', base)
    : '';
</script>

<footer class="source-credit">
  <details>
    <summary>Source and licence</summary>
    <dl>
      <div><dt>Creator</dt><dd>{credit.creator}</dd></div>
      <div><dt>Source</dt><dd>{#if sourceUrl}<a href={sourceUrl} target="_blank" rel="noreferrer">{credit.sourceName} <span aria-hidden="true">↗</span></a>{:else}{credit.sourceName}{/if}</dd></div>
      <div><dt>Licence</dt><dd>{#if credit.licenceUrl}<a href={credit.licenceUrl} target="_blank" rel="noreferrer">{credit.licence}</a>{:else}{credit.licence}{/if}</dd></div>
    </dl>
    <p>{credit.attribution}</p>
  </details>
</footer>

<style>
  .source-credit { padding-top: 15px; border-top: 1px solid var(--lesson-border); color: var(--lesson-muted); }
  details { font-size: .74rem; }
  summary { width: fit-content; color: var(--lesson-secondary); font-weight: 800; cursor: pointer; }
  dl { display: grid; gap: 7px; margin: 13px 0 8px; }
  dl div { display: grid; grid-template-columns: 72px 1fr; gap: 10px; }
  dt { font-weight: 800; color: var(--lesson-text); }
  dd { margin: 0; }
  a { color: var(--lesson-secondary); overflow-wrap: anywhere; }
  p { margin: 10px 0 0; line-height: 1.5; }
</style>
