import { APP_LOCALE } from './locale';

/** Formatos de fecha y hora compartidos por todas las pantallas. */
export const TIME_FORMAT = new Intl.DateTimeFormat(APP_LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

export const SHORT_DATE_FORMAT = new Intl.DateTimeFormat(APP_LOCALE, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const LONG_DATE_FORMAT = new Intl.DateTimeFormat(APP_LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

/** "sábado 25 de octubre": fecha sin año para saludos y encabezados. */
export const DAY_MONTH_FORMAT = new Intl.DateTimeFormat(APP_LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
