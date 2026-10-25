import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { GameOverlayComponent } from '../game-overlay/game-overlay.component';
import { RoundTimerComponent } from '../round-timer/round-timer.component';
import { GameComponent } from '../game.types';
import { injectGameTimers, injectRoundTimer, randomInt } from '../game-utils';

const ROUND_MS = 30_000;
const BOXES = 9;
const moveDelay = (score: number) => Math.max(450, 950 - score * 20);

@Component({
  selector: 'app-mouse-game',
  standalone: true,
  imports: [GameOverlayComponent, RoundTimerComponent],
  templateUrl: './mouse-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MouseGameComponent implements GameComponent {
  readonly paused = input(false);
  readonly onScore = input.required<(score: number) => void>();

  protected readonly boxes = Array.from({ length: BOXES }, (_, i) => i);
  protected readonly mouseAt = signal(-1);
  protected readonly running = signal(false);
  protected readonly finished = signal(false);
  protected readonly score = signal(0);

  private readonly timers = injectGameTimers();
  protected readonly round = injectRoundTimer(
    ROUND_MS,
    () => this.paused(),
    () => this.end(),
  );
  private moveTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    // Al pausar se detiene el ratón; al reanudar vuelve a moverse.
    effect(() => {
      const paused = this.paused();
      untracked(() => {
        if (!this.running()) return;
        this.timers.clear(this.moveTimer);
        if (!paused) this.scheduleMove();
      });
    });
  }

  protected start(): void {
    this.score.set(0);
    this.onScore()(0);
    this.finished.set(false);
    this.running.set(true);
    this.move();
    this.round.start();
  }

  protected hit(box: number): void {
    if (!this.running() || this.paused() || box !== this.mouseAt()) return;
    this.score.update((s) => s + 1);
    this.onScore()(this.score());
    this.move();
  }

  private move(): void {
    let next: number;
    do {
      next = randomInt(0, BOXES - 1);
    } while (next === this.mouseAt());
    this.mouseAt.set(next);
    this.timers.clear(this.moveTimer);
    if (!this.paused()) this.scheduleMove();
  }

  private scheduleMove(): void {
    this.moveTimer = this.timers.timeout(() => this.move(), moveDelay(this.score()));
  }

  private end(): void {
    this.running.set(false);
    this.finished.set(true);
    this.timers.clear(this.moveTimer);
    this.mouseAt.set(-1);
  }
}
