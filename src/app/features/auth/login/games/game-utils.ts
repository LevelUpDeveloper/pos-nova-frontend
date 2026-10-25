import { DestroyRef, inject, signal } from '@angular/core';
import { GameMessageTone } from './game.types';

type TimeoutId = ReturnType<typeof setTimeout>;

/**
 * Temporizadores de un juego. Todo lo pendiente se cancela automáticamente
 * cuando el juego se destruye (por ejemplo, al cambiar de juego).
 */
export function injectGameTimers() {
  const timeouts = new Set<TimeoutId>();
  const frames = new Set<number>();

  inject(DestroyRef).onDestroy(() => {
    timeouts.forEach(clearTimeout);
    frames.forEach(cancelAnimationFrame);
    timeouts.clear();
    frames.clear();
  });

  return {
    timeout(fn: () => void, ms: number): TimeoutId {
      const id = setTimeout(() => {
        timeouts.delete(id);
        fn();
      }, ms);
      timeouts.add(id);
      return id;
    },
    clear(id: TimeoutId | undefined): void {
      if (id === undefined) return;
      clearTimeout(id);
      timeouts.delete(id);
    },
    frame(fn: (time: number) => void): number {
      const id = requestAnimationFrame((time) => {
        frames.delete(id);
        fn(time);
      });
      frames.add(id);
      return id;
    },
  };
}

/** Evita un salto grande después de una pausa larga del navegador. */
export const MAX_FRAME_DELTA_MS = 50;

/**
 * Cronómetro de una ronda por tiempo. Solo descuenta mientras el juego no
 * está en pausa y llama a `onEnd` al llegar a cero.
 */
export function injectRoundTimer(durationMs: number, paused: () => boolean, onEnd: () => void) {
  const timers = injectGameTimers();
  const remaining = signal(1);
  let running = false;
  let timeLeft = durationMs;
  let lastFrame = 0;

  const tick = (time: number): void => {
    if (!running) return;
    if (!paused()) {
      timeLeft -= Math.min(MAX_FRAME_DELTA_MS, time - lastFrame);
      remaining.set(Math.max(0, timeLeft / durationMs));
      if (timeLeft <= 0) {
        running = false;
        onEnd();
        return;
      }
    }
    lastFrame = time;
    timers.frame(tick);
  };

  return {
    /** Fracción restante de la ronda, de 1 a 0. */
    remaining: remaining.asReadonly(),
    seconds: durationMs / 1000,
    start(): void {
      timeLeft = durationMs;
      remaining.set(1);
      if (running) return;
      running = true;
      timers.frame((time) => {
        lastFrame = time;
        tick(time);
      });
    },
    /** Termina la ronda antes de tiempo sin llamar a `onEnd`. */
    stop(): void {
      running = false;
    },
  };
}

export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const formatMoney = (value: number) => '$' + value.toLocaleString('es-MX');

export const TONE_CLASS: Record<GameMessageTone, string> = {
  neutral: 'text-muted-3',
  good: 'text-success-soft',
  bad: 'text-danger',
};

export const BTN_GHOST =
  'inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] font-semibold text-ink transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40';

export const BTN_PRIMARY =
  'inline-flex items-center justify-center gap-1.5 rounded-xl bg-linear-to-b from-violet to-violet-deep px-4 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-violet-deep/30 transition hover:brightness-110 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50';
