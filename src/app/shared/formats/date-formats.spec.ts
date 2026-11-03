import { formatDayTime } from './date-formats';

describe('formatDayTime', () => {
  const now = new Date(2026, 10, 2, 12, 0);

  it('usa la etiqueta de hoy para el mismo día', () => {
    expect(formatDayTime(new Date(2026, 10, 2, 8, 5), now, 'hoy')).toBe('hoy 08:05');
  });

  it('muestra día y mes para otros días', () => {
    expect(formatDayTime(new Date(2026, 9, 24, 19, 40), now, 'hoy')).toBe('24/10 19:40');
  });

  it('devuelve vacío con fechas inválidas', () => {
    expect(formatDayTime(new Date('x'), now, 'hoy')).toBe('');
  });
});
