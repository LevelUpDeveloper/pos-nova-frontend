import { normalizeSearch } from './search-text';

describe('normalizeSearch', () => {
  it('quita acentos, mayúsculas y espacios de los extremos', () => {
    expect(normalizeSearch('  Categorías ')).toBe('categorias');
    expect(normalizeSearch('PESTAÑAS')).toBe('pestanas');
  });
});
