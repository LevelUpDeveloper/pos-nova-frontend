import { WORKSTATION } from '../../../shared/config/workstation.config';

/** Datos informativos del panel izquierdo del login (ver `WORKSTATION`). */
export const LOGIN_INFO = WORKSTATION;

/** Subtítulo bajo el logotipo del encabezado. */
export const LOGIN_BRAND_SUBTITLE = 'Punto de venta';

/** Mensajes de error genéricos: nunca se muestra el detalle del backend. */
export const LOGIN_ERRORS = {
  network: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
  tooManyAttempts: 'Demasiados intentos. Espera un momento antes de volver a intentarlo.',
  server: 'El servicio no está disponible en este momento. Inténtalo más tarde.',
  credentials: 'Correo o contraseña incorrectos.',
} as const;
