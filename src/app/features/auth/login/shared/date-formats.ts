/** Formatos de fecha y hora que comparten el ticket y el panel de información. */
export const TIME_FORMAT = new Intl.DateTimeFormat('es-MX', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export const SHORT_DATE_FORMAT = new Intl.DateTimeFormat('es-MX', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const LONG_DATE_FORMAT = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
