import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Floater {
  type: 'coin' | 'ticket';
  /** Posición horizontal en %. */
  left: number;
  /** Diámetro de la moneda, o [ancho, alto] del mini ticket, en px. */
  size: number | [number, number];
  duration: number;
  delay: number;
  opacity: number;
}

interface FloaterView extends Floater {
  width: number;
  height: number;
  lines: number[];
}

const FLOATERS: readonly Floater[] = [
  { type: 'coin', left: 3, size: 36, duration: 18, delay: -2, opacity: 0.65 },
  { type: 'ticket', left: 11, size: [28, 40], duration: 22, delay: -9, opacity: 0.45 },
  { type: 'coin', left: 19, size: 24, duration: 14, delay: -6, opacity: 0.55 },
  { type: 'coin', left: 30, size: 44, duration: 20, delay: -13, opacity: 0.5 },
  { type: 'ticket', left: 41, size: [30, 44], duration: 24, delay: -4, opacity: 0.4 },
  { type: 'coin', left: 52, size: 28, duration: 16, delay: -10, opacity: 0.6 },
  { type: 'ticket', left: 62, size: [24, 34], duration: 21, delay: -15, opacity: 0.4 },
  { type: 'coin', left: 71, size: 38, duration: 19, delay: -1, opacity: 0.55 },
  { type: 'coin', left: 80, size: 20, duration: 13, delay: -7, opacity: 0.5 },
  { type: 'ticket', left: 88, size: [28, 40], duration: 23, delay: -11, opacity: 0.45 },
  { type: 'coin', left: 95, size: 30, duration: 17, delay: -4, opacity: 0.6 },
];

/** Monedas y mini tickets que suben por el fondo. Puramente decorativo. */
@Component({
  selector: 'app-coins-background',
  standalone: true,
  templateUrl: './coins-background.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'pointer-events-none absolute inset-0 overflow-hidden',
    'aria-hidden': 'true',
  },
})
export class CoinsBackgroundComponent {
  protected readonly floaters: FloaterView[] = FLOATERS.map((f) => {
    const [width, height] = Array.isArray(f.size) ? f.size : [f.size, f.size];
    return { ...f, width, height, lines: Array.from({ length: height > 38 ? 4 : 3 }, (_, i) => i) };
  });
}
