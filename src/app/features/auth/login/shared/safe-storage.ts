/**
 * Acceso a localStorage que nunca lanza excepciones (modo privado,
 * almacenamiento bloqueado o lleno). Si falla, se usa el valor por defecto.
 */
export const safeStorage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Sin almacenamiento disponible: el dato solo vive en memoria.
    }
  },
};
