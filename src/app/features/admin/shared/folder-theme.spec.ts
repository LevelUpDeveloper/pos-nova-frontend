import { folderContrast, folderCssVars, parseFolderPalette, samePalette } from './folder-theme';

const CREAM = { paper: '#f7f5ef', tab: '#ddd8ca', ink: '#141832', accent: '#5b47f0' };

describe('folder-theme', () => {
  it('deriva todas las variables a partir de 4 colores', () => {
    const vars = folderCssVars(CREAM);
    expect(Object.keys(vars)).toHaveLength(11);
    expect(vars['--folder-paper']).toBe(CREAM.paper);
    expect(Object.values(vars).every((v) => /^#[0-9a-f]{6}$/.test(v))).toBe(true);
  });

  it('en papel oscuro las fichas no se aclaran hacia blanco', () => {
    const dark = { paper: '#1d1a4a', tab: '#27235c', ink: '#e8eaff', accent: '#a99bff' };
    expect(folderContrast(dark)).toBeGreaterThan(4.5);
  });

  it('detecta combinaciones ilegibles', () => {
    expect(folderContrast(CREAM)).toBeGreaterThan(4.5);
    expect(folderContrast({ ...CREAM, ink: '#e0ded8' })).toBeLessThan(4.5);
  });

  it('acepta solo paletas guardadas válidas', () => {
    expect(parseFolderPalette(JSON.stringify({ ...CREAM, paper: '#F7F5EF' }))).toEqual(CREAM);
    expect(parseFolderPalette(null)).toBeNull();
    expect(parseFolderPalette('no-json')).toBeNull();
    expect(parseFolderPalette(JSON.stringify({ ...CREAM, ink: 'red; background:url(x)' }))).toBeNull();
    expect(parseFolderPalette(JSON.stringify({ paper: '#ffffff' }))).toBeNull();
  });

  it('compara paletas sin importar mayúsculas', () => {
    expect(samePalette(CREAM, { ...CREAM, paper: '#F7F5EF' })).toBe(true);
    expect(samePalette(CREAM, { ...CREAM, tab: '#000000' })).toBe(false);
  });
});
