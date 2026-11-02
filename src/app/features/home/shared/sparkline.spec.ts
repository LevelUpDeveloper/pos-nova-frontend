import { buildSparkline } from './sparkline';

describe('buildSparkline', () => {
  it('sin datos no dibuja nada', () => {
    expect(buildSparkline([], 100, 50)).toEqual({ line: '', area: '', last: null });
  });

  it('el máximo queda arriba y el cero abajo, respetando el margen', () => {
    const { line, last } = buildSparkline([0, 10], 100, 50, 2, 5);
    expect(line).toBe('0,45 100,5');
    expect(last).toEqual({ x: 100, y: 5 });
  });

  it('reserva huecos para horas futuras', () => {
    const { last } = buildSparkline([1, 2, 3], 90, 40, 10);
    expect(last?.x).toBe(20);
  });

  it('cierra el área contra la base', () => {
    const { area } = buildSparkline([2, 4], 10, 20, 2, 0);
    expect(area).toBe('M0,20 L0,10 L10,0 L10,20 Z');
  });

  it('con todo en cero no divide entre cero', () => {
    expect(buildSparkline([0, 0], 10, 20, 2, 0).line).toBe('0,20 10,20');
  });
});
