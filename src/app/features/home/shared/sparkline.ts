export interface SparklinePoint {
  readonly x: number;
  readonly y: number;
}

export interface Sparkline {
  /** Puntos para `<polyline points>`. */
  readonly line: string;
  /** Trazo cerrado para el relleno (`<path d>`). */
  readonly area: string;
  /** Último punto con datos, o null si no hay datos. */
  readonly last: SparklinePoint | null;
}

/**
 * Coordenadas de una minigráfica dentro de un lienzo `width × height`.
 * `slots` reserva espacio para horas futuras: con 7 valores y 10 huecos, la
 * línea ocupa el 60 % del ancho y el resto queda libre.
 */
export function buildSparkline(
  values: readonly number[],
  width: number,
  height: number,
  slots = values.length,
  padding = 8,
): Sparkline {
  if (values.length === 0) return { line: '', area: '', last: null };

  const max = Math.max(...values, 0);
  const step = width / Math.max(slots - 1, values.length - 1, 1);
  const usable = height - padding * 2;
  const points = values.map((value, index) => ({
    x: round(index * step),
    y: round(padding + (max > 0 ? 1 - value / max : 1) * usable),
  }));

  const line = points.map((p) => `${p.x},${p.y}`).join(' ');
  const last = points[points.length - 1];
  const area = `M${points[0].x},${height} L${line.replace(/ /g, ' L')} L${last.x},${height} Z`;
  return { line, area, last };
}

const round = (value: number) => Math.round(value * 10) / 10;
