import { contrastRatio, isDarkColor, isHexColor, mixColors } from './color';

describe('color', () => {
  it('valida hexadecimales #rrggbb', () => {
    expect(isHexColor('#F7f5ef')).toBe(true);
    expect(isHexColor('#fff')).toBe(false);
    expect(isHexColor('red')).toBe(false);
    expect(isHexColor('#12345g')).toBe(false);
    expect(isHexColor(null)).toBe(false);
  });

  it('mezcla en línea recta entre dos colores', () => {
    expect(mixColors('#000000', '#ffffff', 0)).toBe('#000000');
    expect(mixColors('#000000', '#ffffff', 1)).toBe('#ffffff');
    expect(mixColors('#000000', '#ffffff', 0.5)).toBe('#808080');
  });

  it('calcula el contraste WCAG', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 5);
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
    expect(contrastRatio('#2b2112', '#f5e6bd')).toBeCloseTo(12.7, 1);
  });

  it('distingue colores oscuros', () => {
    expect(isDarkColor('#1d1a4a')).toBe(true);
    expect(isDarkColor('#f7f5ef')).toBe(false);
  });
});
