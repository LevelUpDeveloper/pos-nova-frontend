import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BTN_GHOST } from '../../ui/buttons';

const LOAD_ERROR_TEXT = {
  title: 'No pudimos abrir esta sección',
  body: 'Revisa tu conexión y recarga la página para intentarlo de nuevo.',
  reload: 'Recargar',
} as const;

/**
 * Se muestra en lugar de una pantalla cuyo código no se pudo descargar.
 * Chromium no reintenta un módulo que falló: la recuperación es recargar.
 */
@Component({
  selector: 'app-load-error',
  template: `
    <div class="mx-auto mt-16 max-w-[420px] rounded-[20px] border border-white/10 bg-white/5 p-6 text-center backdrop-blur" role="alert">
      <i class="bi bi-wifi-off text-3xl text-muted" aria-hidden="true"></i>
      <h1 class="mt-3 text-[17px] font-extrabold">{{ text.title }}</h1>
      <p class="mt-1 text-[13px] text-muted">{{ text.body }}</p>
      <button type="button" class="mt-5" [class]="btnGhost" (click)="reload()">
        <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>{{ text.reload }}
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadErrorComponent {
  protected readonly text = LOAD_ERROR_TEXT;
  protected readonly btnGhost = BTN_GHOST;

  protected reload(): void {
    location.reload();
  }
}
