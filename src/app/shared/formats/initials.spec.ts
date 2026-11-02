import { initialsOf } from './initials';

describe('initialsOf', () => {
  it('toma la primera letra del primer y último nombre', () => {
    expect(initialsOf('Ana López')).toBe('AL');
    expect(initialsOf('  maría  del  carmen ruiz ')).toBe('MR');
  });

  it('usa dos letras con un solo nombre', () => {
    expect(initialsOf('ana')).toBe('AN');
  });

  it('devuelve vacío sin nombre', () => {
    expect(initialsOf('   ')).toBe('');
  });
});
