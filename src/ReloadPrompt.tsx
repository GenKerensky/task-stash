import { interval } from 'rxjs';
import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { useRegisterSW } from 'virtual:pwa-register/solid';

import styles from './ReloadPrompt.module.css';

const ReloadPrompt: Component = () => {
  const updateInterval = 1000 * 60 * 60 * 1; // 1 hours

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swScriptUrl, registration) {
      console.log('Registered Service Worker:', swScriptUrl, registration);
      interval(updateInterval).subscribe(() => {
        registration?.update();
      });
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = (): void => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div class={styles.Container}>
      <Show when={offlineReady() || needRefresh()}>
        <div class={styles.Toast}>
          <div class={styles.Message}>
            <Show
              fallback={
                <span>
                  New content available, click on reload button to update.
                </span>
              }
              when={offlineReady()}
            >
              <span>App ready to work offline</span>
            </Show>
          </div>
          <Show when={needRefresh()}>
            <button
              class={styles.ToastButton}
              onClick={() => {
                updateServiceWorker(true);
              }}
            >
              Reload
            </button>
          </Show>
          <button
            class={styles.ToastButton}
            onClick={() => {
              close();
            }}
          >
            Close
          </button>
        </div>
      </Show>
    </div>
  );
};

export default ReloadPrompt;
