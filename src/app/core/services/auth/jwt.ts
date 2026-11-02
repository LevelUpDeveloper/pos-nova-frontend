/**
 * Lee la fecha de expiración (`exp`, en segundos) de un JWT sin validarlo.
 * Solo sirve para que la interfaz no muestre una sesión vencida; la firma la
 * valida el backend en cada petición.
 */
export function readJwtExpiry(token: string): number | null {
  const payload = token.split('.')[1];
  if (!payload) return null;
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const exp: unknown = JSON.parse(atob(padded)).exp;
    return typeof exp === 'number' ? exp : null;
  } catch {
    return null;
  }
}

/** true si el token ya venció (o no se puede leer) en el instante `nowMs`. */
export function isJwtExpired(token: string, nowMs: number): boolean {
  const exp = readJwtExpiry(token);
  return exp === null || exp * 1000 <= nowMs;
}
