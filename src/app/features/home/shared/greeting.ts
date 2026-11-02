export interface Greeting {
  /** Hora (0-23) desde la que aplica el saludo. */
  readonly fromHour: number;
  readonly text: string;
}

/**
 * Saludo para la hora dada. Antes del primer `fromHour` se usa el último
 * (p. ej. a las 2:00 sigue siendo "Buenas noches").
 */
export function greetingFor(hour: number, greetings: readonly Greeting[]): string {
  const sorted = [...greetings].sort((a, b) => a.fromHour - b.fromHour);
  const current = sorted.filter((greeting) => greeting.fromHour <= hour).at(-1);
  return (current ?? sorted.at(-1))?.text ?? '';
}
