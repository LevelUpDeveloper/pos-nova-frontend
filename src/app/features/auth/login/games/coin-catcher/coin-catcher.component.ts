import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { GameOverlayComponent } from '../game-overlay/game-overlay.component';
import { GameComponent } from '../game.types';
import { BTN_GHOST, injectGameTimers } from '../game-utils';

interface FallingCoin {
  id: number;
  left: number;
  duration: number;
  delay: number;
  hidden: boolean;
  /** Cambia cada vez que la moneda reaparece para reiniciar su animación. */
  round: number;
}

/** Retrasos positivos: al empezar, todas las monedas entran desde arriba. */
const COINS: ReadonlyArray<Pick<FallingCoin, 'left' | 'duration' | 'delay'>> = [
  { left: 6, duration: 3.0, delay: 0 },
  { left: 22, duration: 4.1, delay: 1.4 },
  { left: 40, duration: 3.4, delay: 0.6 },
  { left: 56, duration: 4.6, delay: 2.1 },
  { left: 72, duration: 3.7, delay: 0.3 },
  { left: 84, duration: 4.3, delay: 1.0 },
];

const HIDE_MS = 600;

@Component({
  selector: 'app-coin-catcher',
  standalone: true,
  imports: [GameOverlayComponent],
  templateUrl: './coin-catcher.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinCatcherComponent implements GameComponent {
  readonly paused = input(false);
  readonly onScore = input.required<(score: number) => void>();

  protected readonly btnGhost = BTN_GHOST;
  protected readonly manualPause = signal(false);
  protected readonly running = signal(false);
  protected readonly lost = signal(false);
  protected readonly score = signal(0);
  protected readonly frozen = computed(
    () => !this.running() || this.paused() || this.manualPause(),
  );
  protected readonly coins = signal<FallingCoin[]>(this.initialCoins(0));

  private readonly timers = injectGameTimers();

  protected start(): void {
    this.score.set(0);
    this.onScore()(0);
    this.manualPause.set(false);
    this.lost.set(false);
    this.coins.update((coins) => this.initialCoins(Math.max(...coins.map((c) => c.round)) + 1));
    this.running.set(true);
  }

  protected catchCoin(coin: FallingCoin): void {
    if (this.frozen() || coin.hidden) return;
    this.score.update((s) => s + 1);
    this.onScore()(this.score());
    this.patch(coin.id, { hidden: true });
    this.timers.timeout(
      () => this.patch(coin.id, { hidden: false, delay: 0, round: coin.round + 1 }),
      HIDE_MS,
    );
  }

  /** La animación terminó una vuelta: la moneda llegó al fondo sin atraparla. */
  protected dropped(coin: FallingCoin): void {
    if (!this.running() || coin.hidden) return;
    this.running.set(false);
    this.lost.set(true);
    this.onScore()(0);
  }

  protected togglePause(): void {
    this.manualPause.update((value) => !value);
  }

  private patch(id: number, changes: Partial<FallingCoin>): void {
    this.coins.update((coins) => coins.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }

  private initialCoins(round: number): FallingCoin[] {
    return COINS.map((coin, id) => ({ ...coin, id, hidden: false, round }));
  }
}
