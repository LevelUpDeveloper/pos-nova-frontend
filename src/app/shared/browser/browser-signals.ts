import { DestroyRef, inject, signal, Signal } from '@angular/core';

/** Fecha y hora actuales, actualizadas cada segundo (useNow). */
export function injectNow(intervalMs = 1000): Signal<Date> {
  const now = signal(new Date());
  const id = setInterval(() => now.set(new Date()), intervalMs);
  inject(DestroyRef).onDestroy(() => clearInterval(id));
  return now.asReadonly();
}

/** true mientras la pestaña está oculta. */
export function injectPageHidden(): Signal<boolean> {
  const hidden = signal(document.visibilityState === 'hidden');
  const onChange = () => hidden.set(document.visibilityState === 'hidden');
  document.addEventListener('visibilitychange', onChange);
  inject(DestroyRef).onDestroy(() => document.removeEventListener('visibilitychange', onChange));
  return hidden.asReadonly();
}

/** Estado de conexión del navegador. */
export function injectOnline(): Signal<boolean> {
  const online = signal(navigator.onLine);
  const sync = () => online.set(navigator.onLine);
  window.addEventListener('online', sync);
  window.addEventListener('offline', sync);
  inject(DestroyRef).onDestroy(() => {
    window.removeEventListener('online', sync);
    window.removeEventListener('offline', sync);
  });
  return online.asReadonly();
}

/** Resultado de una media query, reactivo. */
export function injectMediaQuery(query: string): Signal<boolean> {
  const mql = window.matchMedia(query);
  const matches = signal(mql.matches);
  const onChange = (e: MediaQueryListEvent) => matches.set(e.matches);
  mql.addEventListener('change', onChange);
  inject(DestroyRef).onDestroy(() => mql.removeEventListener('change', onChange));
  return matches.asReadonly();
}
