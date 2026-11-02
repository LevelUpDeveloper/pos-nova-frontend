import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { GameOverlayComponent } from '../game-overlay/game-overlay.component';
import { RoundTimerComponent } from '../round-timer/round-timer.component';
import { GameComponent, GameMessage } from '../game.types';
import {
  BTN_GHOST,
  formatMoney,
  injectGameTimers,
  injectRoundTimer,
  randomInt,
  TONE_CLASS,
} from '../game-utils';

const COINS = [1, 2, 5, 10] as const;
const BILLS = [20, 50, 100] as const;
const PAYMENT_BILLS = [50, 100, 200, 500] as const;
const NEXT_SALE_MS = 700;
const ROUND_MS = 30_000;
/** El jugador calcula el cambio; el juego no le dice cuánto falta. */
const PROMPT: GameMessage = { text: '¿Cuánto cambio entregas?', tone: 'neutral' };

@Component({
  selector: 'app-change-game',
  standalone: true,
  imports: [GameOverlayComponent, RoundTimerComponent],
  templateUrl: './change-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeGameComponent implements GameComponent {
  readonly paused = input(false);
  readonly onScore = input.required<(score: number) => void>();

  protected readonly coins = COINS;
  protected readonly bills = BILLS;
  protected readonly btnGhost = BTN_GHOST;
  protected readonly toneClass = TONE_CLASS;
  protected readonly money = formatMoney;

  protected readonly total = signal(0);
  protected readonly paidWith = signal(0);
  protected readonly carried = signal(0);
  protected readonly score = signal(0);
  protected readonly running = signal(false);
  protected readonly finished = signal(false);
  protected readonly message = signal<GameMessage>(PROMPT);
  private readonly settling = signal(false);

  private readonly timers = injectGameTimers();
  protected readonly round = injectRoundTimer(
    ROUND_MS,
    () => this.paused(),
    () => this.end(),
  );

  constructor() {
    this.newSale();
  }

  protected start(): void {
    this.score.set(0);
    this.onScore()(0);
    this.newSale();
    this.finished.set(false);
    this.running.set(true);
    this.round.start();
  }

  protected add(value: number): void {
    if (!this.running() || this.paused() || this.settling()) return;
    const carried = this.carried() + value;
    const change = this.paidWith() - this.total();

    if (carried === change) {
      this.carried.set(carried);
      this.score.update((s) => s + 1);
      this.onScore()(this.score());
      this.message.set({ text: '¡Cambio exacto!', tone: 'good' });
      this.settling.set(true);
      this.timers.timeout(() => this.newSale(), NEXT_SALE_MS);
    } else if (carried > change) {
      // Sin decir por cuánto: eso revelaría el cambio correcto.
      this.message.set({ text: 'Te pasaste, vuelve a contar', tone: 'bad' });
      this.carried.set(0);
    } else {
      this.carried.set(carried);
      this.message.set(PROMPT);
    }
  }

  protected clear(): void {
    if (!this.running() || this.settling()) return;
    this.carried.set(0);
    this.message.set(PROMPT);
  }

  private newSale(): void {
    const total = randomInt(11, 190);
    this.total.set(total);
    this.paidWith.set(PAYMENT_BILLS.find((bill) => bill > total) ?? 500);
    this.carried.set(0);
    this.settling.set(false);
    this.message.set(PROMPT);
  }

  private end(): void {
    this.running.set(false);
    this.finished.set(true);
  }
}
