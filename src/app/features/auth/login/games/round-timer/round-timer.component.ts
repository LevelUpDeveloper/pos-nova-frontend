import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Barra de tiempo restante que comparten los juegos por rondas. */
@Component({
  selector: 'app-round-timer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block h-2 overflow-hidden rounded-full bg-white/10',
    role: 'progressbar',
    'aria-label': 'Tiempo restante',
    'aria-valuemin': '0',
    '[attr.aria-valuemax]': 'seconds()',
    '[attr.aria-valuenow]': '(remaining() * seconds()).toFixed(0)',
  },
  template: `
    <div
      class="h-full rounded-full bg-linear-to-r from-violet-soft to-violet"
      [style.width.%]="remaining() * 100"
    ></div>
  `,
})
export class RoundTimerComponent {
  /** Fracción restante, de 1 a 0. */
  readonly remaining = input.required<number>();
  readonly seconds = input.required<number>();
}
