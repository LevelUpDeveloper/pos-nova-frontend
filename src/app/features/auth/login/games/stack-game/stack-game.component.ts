import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { GameComponent, GameMessage } from '../game.types';
import {
  BTN_GHOST,
  BTN_PRIMARY,
  injectGameTimers,
  MAX_FRAME_DELTA_MS,
  TONE_CLASS,
} from '../game-utils';

interface Box {
  level: number;
  x: number;
  width: number;
}

const AREA_WIDTH = 280;
const BOX_HEIGHT = 22;
const BASE_WIDTH = 140;
const PERFECT_TOLERANCE = 3;
const VISIBLE_LEVELS = 11;
const START_SPEED = 2.4;
const SPEED_STEP = 0.25;
const MAX_SPEED = 7;
/** Las velocidades están en px por cuadro a 60 Hz; se escalan por tiempo real. */
const FRAME_MS = 1000 / 60;

@Component({
  selector: 'app-stack-game',
  standalone: true,
  templateUrl: './stack-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackGameComponent implements GameComponent {
  readonly paused = input(false);
  readonly onScore = input.required<(score: number) => void>();

  protected readonly boxHeight = BOX_HEIGHT;
  protected readonly btnGhost = BTN_GHOST;
  protected readonly btnPrimary = BTN_PRIMARY;
  protected readonly toneClass = TONE_CLASS;

  protected readonly stack = signal<Box[]>([]);
  protected readonly active = signal<Box | null>(null);
  protected readonly gameOver = signal(false);
  protected readonly message = signal<GameMessage>({ text: '', tone: 'neutral' });
  protected readonly cameraOffset = computed(
    () => Math.max(0, this.stack().length - VISIBLE_LEVELS) * BOX_HEIGHT,
  );

  private readonly timers = injectGameTimers();
  private direction = 1;
  private speed = START_SPEED;
  private lastFrame: number | null = null;

  constructor() {
    this.reset();
    this.timers.frame((time) => this.step(time));
  }

  protected drop(): void {
    const box = this.active();
    const stack = this.stack();
    if (!box || this.gameOver() || this.paused()) return;

    const top = stack[stack.length - 1];
    const left = Math.max(box.x, top.x);
    const right = Math.min(box.x + box.width, top.x + top.width);

    if (right - left <= 0) {
      this.gameOver.set(true);
      this.active.set(null);
      this.message.set({ text: 'Se cayó la caja', tone: 'bad' });
      return;
    }

    const perfect = Math.abs(box.x - top.x) <= PERFECT_TOLERANCE;
    const placed: Box = perfect
      ? { level: box.level, x: top.x, width: top.width }
      : { level: box.level, x: left, width: right - left };

    this.stack.set([...stack, placed]);
    this.message.set(
      perfect ? { text: '¡Perfecto!', tone: 'good' } : { text: '', tone: 'neutral' },
    );
    this.onScore()(this.stack().length - 1);
    this.direction = -this.direction;
    this.spawn();
  }

  protected restart(): void {
    this.reset();
    this.onScore()(0);
  }

  private reset(): void {
    this.stack.set([{ level: 0, x: (AREA_WIDTH - BASE_WIDTH) / 2, width: BASE_WIDTH }]);
    this.direction = 1;
    this.gameOver.set(false);
    this.message.set({ text: '', tone: 'neutral' });
    this.spawn();
  }

  private spawn(): void {
    const stack = this.stack();
    const top = stack[stack.length - 1];
    this.speed = Math.min(MAX_SPEED, START_SPEED + SPEED_STEP * (stack.length - 1));
    this.active.set({
      level: stack.length,
      x: this.direction > 0 ? 0 : AREA_WIDTH - top.width,
      width: top.width,
    });
  }

  private step(time: number): void {
    const elapsed =
      this.lastFrame === null ? 0 : Math.min(MAX_FRAME_DELTA_MS, time - this.lastFrame);
    this.lastFrame = time;
    const box = this.active();
    if (box && !this.paused()) {
      let x = box.x + this.speed * this.direction * (elapsed / FRAME_MS);
      if (x <= 0) {
        x = 0;
        this.direction = 1;
      } else if (x + box.width >= AREA_WIDTH) {
        x = AREA_WIDTH - box.width;
        this.direction = -1;
      }
      this.active.set({ ...box, x });
    }
    this.timers.frame((t) => this.step(t));
  }
}
