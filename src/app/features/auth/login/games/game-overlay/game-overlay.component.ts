import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BTN_PRIMARY } from '../game-utils';

/** Capa de inicio / fin de partida que comparten los juegos. */
@Component({
  selector: 'app-game-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'absolute inset-0 z-20 grid place-items-center rounded-[inherit] bg-night/75 p-6 text-center backdrop-blur-[2px]',
  },
  template: `
    <div>
      <p class="text-lg font-extrabold">{{ heading() }}</p>
      <p class="mt-1 text-sm text-muted-3">{{ message() }}</p>
      <button type="button" [class]="btnPrimary" class="mt-4" (click)="action.emit()">
        {{ cta() }}
      </button>
    </div>
  `,
})
export class GameOverlayComponent {
  readonly heading = input.required<string>();
  readonly message = input.required<string>();
  readonly cta = input.required<string>();
  readonly action = output<void>();

  protected readonly btnPrimary = BTN_PRIMARY;
}
