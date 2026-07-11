<script lang="ts">
  export let hasRecovery = false;
  export let onBackup: () => void;
  export let onImport: (file: File) => void;
  export let onRestore: () => void;

  let fileInput: HTMLInputElement;
</script>

<section class="backup-panel no-print" aria-labelledby="backup-title">
  <div>
    <p>Work portability</p>
    <h3 id="backup-title">Backup & recovery</h3>
    <span>Move work between devices or recover the version saved before a reset or import.</span>
  </div>
  <div class="backup-actions">
    <button on:click={onBackup}>Download backup</button>
    <button on:click={() => fileInput.click()}>Import backup</button>
    <button class="restore" disabled={!hasRecovery} on:click={onRestore}>Restore recovery snapshot</button>
    <input
      bind:this={fileInput}
      class="file-input"
      type="file"
      accept="application/json,.json,.hre4m"
      on:change={(event) => {
        const file = event.currentTarget.files?.[0];
        if (file) onImport(file);
        event.currentTarget.value = '';
      }}
    />
  </div>
</section>

<style>
  .backup-panel { margin-top: 18px; display: flex; justify-content: space-between; align-items: center; gap: 25px; padding: 22px; border: 1px solid var(--lesson-border); border-radius: 15px; background: color-mix(in srgb, var(--lesson-secondary) 7%, var(--lesson-surface)); }
  .backup-panel p { margin: 0 0 5px; color: var(--lesson-secondary); font-size: .62rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
  .backup-panel h3 { margin: 0 0 5px; font: 400 1.3rem Georgia, serif; }
  .backup-panel div > span { color: var(--lesson-muted); font-size: .72rem; line-height: 1.45; }
  .backup-actions { display: flex; flex-wrap: wrap; justify-content: end; gap: 7px; }
  button { padding: 9px 12px; border: 1px solid var(--lesson-border); border-radius: 9px; background: var(--lesson-surface); color: var(--lesson-text); font-size: .69rem; font-weight: 760; cursor: pointer; }
  button.restore { border-color: var(--lesson-secondary); }
  button:disabled { opacity: .42; cursor: not-allowed; }
  .file-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
  @media (max-width: 760px) { .backup-panel { display: block; } .backup-actions { justify-content: start; margin-top: 16px; } }
</style>
