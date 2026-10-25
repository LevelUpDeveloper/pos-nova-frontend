/**
 * Datos informativos del panel izquierdo del login.
 * Todavía no existe un endpoint que los entregue; cuando exista, basta con
 * reemplazar este objeto por la respuesta del backend.
 */
export const LOGIN_INFO = {
  branchName: 'Sucursal Centro',
  registerName: '01',
  notice: 'Recuerda hacer el corte de caja antes de cerrar tu turno.',
} as const;

/** Mensajes de error genéricos: nunca se muestra el detalle del backend. */
export const LOGIN_ERRORS = {
  network: 'No pudimos conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.',
  tooManyAttempts: 'Demasiados intentos. Espera un momento antes de volver a intentarlo.',
  server: 'El servicio no está disponible en este momento. Inténtalo más tarde.',
  credentials: 'Correo o contraseña incorrectos.',
} as const;
