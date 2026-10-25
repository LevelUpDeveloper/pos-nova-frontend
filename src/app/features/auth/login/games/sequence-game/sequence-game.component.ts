import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { GameOverlayComponent } from '../game-overlay/game-overlay.component';
import { RoundTimerComponent } from '../round-timer/round-timer.component';
import { GameComponent, GameMessage } from '../game.types';
import { injectGameTimers, injectRoundTimer, randomInt, TONE_CLASS } from '../game-utils';

interface PaymentPad {
  /** Etiqueta solo visual; no es un atajo de teclado. */
  key: string;
  label: string;
  color: string;
  icon: string;
}

const PADS: readonly PaymentPad[] = [
  { key: 'F1', label: 'Efectivo', color: '#22c55e', icon: 'bi-cash-stack' },
  { key: 'F2', label: 'Tarjeta', color: '#7565ff', icon: 'bi-credit-card-2-front' },
  { key: 'F3', label: 'Vales', color: '#f59e0b', icon: 'bi-ticket-perforated' },
  { key: 'F4', label: 'Transferencia', color: '#ec4899', icon: 'bi-bank' },
];

const PAUSE_POLL_MS = 120;
const FLASH_MS = 180;
const NEXT_ROUND_MS = 650;
const ROUND_MS = 30_000;
const stepDelay = (length: number) => Math.max(320, 620 - length * 25);

type Phase = 'intro' | 'showing' | 'input' | 'failed' | 'timeout';

@Component({
  selector: 'app-sequence-game',
  standalone: true,
  imports: [GameOverlayComponent, RoundTimerComponent],
  templateUrl: './sequence-game.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SequenceGameComponent implements GameComponent {
  readonly paused = input(false);
  readonly onScore = input.required<(score: number) => void>();

  protected readonly pads = PADS;
  protected readonly toneClass = TONE_CLASS;
  protected readonly phase = signal<Phase>('intro');
  protected readonly lit = signal<number | null>(null);
  protected readonly message = signal<GameMessage>({ text: '', tone: 'neutral' });
  protected readonly reachedLevel = signal(0);

  private readonly timers = injectGameTimers();
  /** El tiempo solo corre en el turno del jugador, no mientras se muestra la secuencia. */
  protected readonly round = injectRoundTimer(
    ROUND_MS,
    () => this.paused() || this.phase() !== 'input',
    () => this.end('timeout'),
  );
  private sequence: number[] = [];
  private position = 0;

  protected start(): void {
    this.sequence = [randomInt(0, PADS.length - 1)];
    this.onScore()(0);
    this.play();
    this.round.start();
  }

  protected press(pad: number): void {
    if (this.phase() !== 'input' || this.paused()) return;
    this.flash(pad);

    if (pad !== this.sequence[this.position]) {
      this.round.stop();
      this.end('failed');
      this.onScore()(0);
      return;
    }

    this.position++;
    if (this.position === this.sequence.length) {
      this.onScore()(this.sequence.length);
      this.message.set({ text: '¡Cobro correcto!', tone: 'good' });
      this.sequence.push(randomInt(0, PADS.length - 1));
      this.phase.set('showing');
      this.timers.timeout(() => this.play(), NEXT_ROUND_MS);
    }
  }

  private end(phase: 'failed' | 'timeout'): void {
    this.reachedLevel.set(this.sequence.length);
    this.lit.set(null);
    this.phase.set(phase);
    this.message.set({ text: '', tone: 'neutral' });
  }

  private play(): void {
    this.phase.set('showing');
    this.message.set({ text: 'Observa la secuencia…', tone: 'neutral' });
    this.showStep(0, false);
  }

  /** Muestra la secuencia paso a paso; si el juego está en pausa, espera. */
  private showStep(index: number, on: boolean): void {
    if (this.paused()) {
      this.timers.timeout(() => this.showStep(index, on), PAUSE_POLL_MS);
      return;
    }
    const delay = stepDelay(this.sequence.length);

    if (!on) {
      if (index >= this.sequence.length) {
        this.lit.set(null);
        this.position = 0;
        this.phase.set('input');
        this.message.set({ text: 'Tu turno: repite el cobro', tone: 'neutral' });
        return;
      }
      this.lit.set(this.sequence[index]);
      this.timers.timeout(() => this.showStep(index, true), delay);
    } else {
      this.lit.set(null);
      this.timers.timeout(() => this.showStep(index + 1, false), delay * 0.45);
    }
  }

  private flash(pad: number): void {
    this.lit.set(pad);
    this.timers.timeout(() => this.lit.set(null), FLASH_MS);
  }
}
