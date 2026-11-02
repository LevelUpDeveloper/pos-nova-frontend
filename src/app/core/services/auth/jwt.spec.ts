import { isJwtExpired, readJwtExpiry } from './jwt';

const encode = (value: object) =>
  btoa(JSON.stringify(value)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const tokenWith = (payload: object) => `${encode({ alg: 'HS256' })}.${encode(payload)}.firma`;

describe('jwt', () => {
  it('lee exp del payload', () => {
    expect(readJwtExpiry(tokenWith({ exp: 1700000000 }))).toBe(1700000000);
  });

  it('devuelve null con tokens mal formados', () => {
    expect(readJwtExpiry('sin-puntos')).toBeNull();
    expect(readJwtExpiry('a.%%%.c')).toBeNull();
    expect(readJwtExpiry(tokenWith({ sub: '1' }))).toBeNull();
  });

  it('considera vencido un token sin exp o con exp en el pasado', () => {
    const now = 1_700_000_000_000;
    expect(isJwtExpired(tokenWith({ exp: now / 1000 - 1 }), now)).toBe(true);
    expect(isJwtExpired(tokenWith({}), now)).toBe(true);
    expect(isJwtExpired(tokenWith({ exp: now / 1000 + 60 }), now)).toBe(false);
  });
});
