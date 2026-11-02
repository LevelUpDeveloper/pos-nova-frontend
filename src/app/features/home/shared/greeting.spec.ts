import { greetingFor } from './greeting';

const GREETINGS = [
  { fromHour: 12, text: 'tardes' },
  { fromHour: 5, text: 'días' },
  { fromHour: 19, text: 'noches' },
];

describe('greetingFor', () => {
  it('elige el saludo del tramo actual aunque la lista no esté ordenada', () => {
    expect(greetingFor(5, GREETINGS)).toBe('días');
    expect(greetingFor(11, GREETINGS)).toBe('días');
    expect(greetingFor(12, GREETINGS)).toBe('tardes');
    expect(greetingFor(23, GREETINGS)).toBe('noches');
  });

  it('antes del primer tramo usa el último', () => {
    expect(greetingFor(2, GREETINGS)).toBe('noches');
  });

  it('sin saludos devuelve vacío', () => {
    expect(greetingFor(10, [])).toBe('');
  });
});
