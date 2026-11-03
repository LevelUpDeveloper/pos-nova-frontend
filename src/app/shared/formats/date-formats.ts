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

/** "24/10": día y mes, para fechas recientes. */
export const DAY_MONTH_SHORT_FORMAT = new Intl.DateTimeFormat(APP_LOCALE, {
  day: '2-digit',
  month: '2-digit',
});

/** "hoy 08:00" si `date` es del mismo día que `now`; si no, "24/10 19:40". Vacío si la fecha no es válida. */
export function formatDayTime(date: Date, now: Date, todayLabel: string): string {
  if (Number.isNaN(date.getTime())) return '';
  const sameDay = date.toDateString() === now.toDateString();
  const day = sameDay ? todayLabel : DAY_MONTH_SHORT_FORMAT.format(date);
  return `${day} ${TIME_FORMAT.format(date)}`;
}

/** "sábado 25 de octubre": fecha sin año para saludos y encabezados. */
export const DAY_MONTH_FORMAT = new Intl.DateTimeFormat(APP_LOCALE, {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});
