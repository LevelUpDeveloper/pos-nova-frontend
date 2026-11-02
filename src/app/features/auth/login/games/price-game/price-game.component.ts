import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { GameOverlayComponent } from '../game-overlay/game-overlay.component';
import { RoundTimerComponent } from '../round-timer/round-timer.component';
import { GameComponent, GameMessage } from '../game.types';
import {
  formatMoney,
  injectGameTimers,
  injectRoundTimer,
  randomInt,
  TONE_CLASS,
} from '../game-utils';
import { PriceGameProduct, SAMPLE_PRODUCTS } from './price-game.products';

const REVEAL_MS = 1100;
const ROUND_MS = 30_000;

@Component({
  selector: 'app-price-game',
  standalone: true,
  imports: [NgTemplateOutlet, GameOverlayComponent, RoundTimerComponent],
  templateUrl: './price-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceGameComponent implements GameComponent {
  readonly paused = input(false);
  readonly onScore = input.required<(score: number) => void>();

  protected readonly money = formatMoney;
  protected readonly toneClass = TONE_CLASS;

  protected readonly current = signal<PriceGameProduct>(SAMPLE_PRODUCTS[0]);
  protected readonly next = signal<PriceGameProduct>(SAMPLE_PRODUCTS[1]);
  protected readonly revealed = signal(false);
  protected readonly message = signal<GameMessage>({ text: '', tone: 'neutral' });
  protected readonly score = signal(0);
  protected readonly running = signal(false);
  protected readonly finished = signal(false);

  private readonly timers = injectGameTimers();
  protected readonly round = injectRoundTimer(
    ROUND_MS,
    () => this.paused(),
    () => this.end(),
  );

  constructor() {
    const first = this.pick();
    this.current.set(first);
    this.next.set(this.pick(first));
  }

  protected start(): void {
    this.score.set(0);
    this.onScore()(0);
    this.message.set({ text: '', tone: 'neutral' });
    this.finished.set(false);
    this.running.set(true);
    this.round.start();
  }

  protected guess(higher: boolean): void {
    if (!this.running() || this.revealed() || this.paused()) return;
    const isHigher = this.next().price > this.current().price;
    const correct = higher === isHigher;

    if (correct) {
      this.score.update((s) => s + 1);
      this.onScore()(this.score());
    }
    this.revealed.set(true);
    this.message.set(
      correct
        ? { text: '¡Correcto!', tone: 'good' }
        : { text: `Era más ${isHigher ? 'caro' : 'barato'}`, tone: 'bad' },
    );

    this.timers.timeout(() => {
      const current = this.next();
      this.current.set(current);
      this.next.set(this.pick(current));
      this.revealed.set(false);
      this.message.set({ text: '', tone: 'neutral' });
    }, REVEAL_MS);
  }

  private end(): void {
    this.running.set(false);
    this.finished.set(true);
  }

  /** Elige un producto al azar con precio distinto al de `other`. */
  private pick(other?: PriceGameProduct): PriceGameProduct {
    const pool = SAMPLE_PRODUCTS.filter((p) => p.price !== other?.price);
    return pool[randomInt(0, pool.length - 1)];
  }
}
