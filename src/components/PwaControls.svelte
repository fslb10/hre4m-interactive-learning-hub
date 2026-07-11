<script lang="ts">
  import { onMount } from 'svelte';

  export let base = '/';

  type InstallPrompt = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
  };

  let installPrompt: InstallPrompt | null = null;
  let registration: ServiceWorkerRegistration | null = null;
  let updateReady = false;
  let online = true;
  let dismissed = false;
  let refreshing = false;

  onMount(() => {
    online = navigator.onLine;
    const onOnline = () => (online = true);
    const onOffline = () => (online = false);
    const onInstallPrompt = (event: Event) => {
      event.preventDefault();
      installPrompt = event as InstallPrompt;
      dismissed = false;
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    window.addEventListener('beforeinstallprompt', onInstallPrompt);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${base}sw.js`, { scope: base }).then((value) => {
        registration = value;
        updateReady = Boolean(value.waiting);
        value.addEventListener('updatefound', () => {
          const worker = value.installing;
          worker?.addEventListener('statechange', () => {
            if (worker.state === 'installed' && navigator.serviceWorker.controller) updateReady = true;
          });
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) window.location.reload();
      });
    }

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
    };
  });

  async function install() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result.outcome === 'accepted') installPrompt = null;
  }

  function update() {
    if (!registration?.waiting) return;
    refreshing = true;
    registration.waiting.postMessage('SKIP_WAITING');
  }
</script>

{#if !dismissed && (installPrompt || updateReady || !online)}
  <aside class="pwa-notice" aria-live="polite">
    <span aria-hidden="true">{!online ? '◌' : updateReady ? '↻' : '↓'}</span>
    <div>
      <strong>{!online ? 'Offline mode' : updateReady ? 'Hub update ready' : 'Install the Learning Hub'}</strong>
      <small>{!online ? 'Visited lessons remain available.' : updateReady ? 'Refresh to use the newest version.' : 'Launch it like an app on this device.'}</small>
    </div>
    {#if installPrompt && online}<button on:click={install}>Install</button>{/if}
    {#if updateReady && online}<button on:click={update}>Update</button>{/if}
    {#if online}<button class="dismiss" on:click={() => (dismissed = true)} aria-label="Dismiss notification">×</button>{/if}
  </aside>
{/if}

<style>
  .pwa-notice { position: fixed; z-index: 1000; right: 18px; bottom: 18px; width: min(390px, calc(100% - 36px)); display: grid; grid-template-columns: 38px 1fr auto auto; gap: 10px; align-items: center; padding: 13px; border: 1px solid #39456d; border-radius: 14px; background: #18234d; color: white; box-shadow: 0 18px 55px rgba(12,20,50,.3); }
  .pwa-notice > span { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; background: #f0c66f; color: #18234d; font-weight: 900; }
  strong, small { display: block; }
  strong { font-size: .76rem; }
  small { margin-top: 2px; color: #b9c2de; font-size: .62rem; line-height: 1.35; }
  button { border: 1px solid #f0c66f; border-radius: 999px; padding: 7px 10px; background: transparent; color: #f0c66f; font-size: .66rem; font-weight: 800; cursor: pointer; }
  button.dismiss { border: 0; padding: 4px; color: #aab4d1; font-size: 1rem; }
  @media (max-width: 520px) { .pwa-notice { bottom: 78px; grid-template-columns: 34px 1fr auto; } button.dismiss { display: none; } }
  @media print { .pwa-notice { display: none; } }
</style>
