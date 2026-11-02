import { APP_CURRENCY, APP_LOCALE } from './locale';

/** $12,480.00 */
export const MONEY_FORMAT = new Intl.NumberFormat(APP_LOCALE, {
  style: 'currency',
  currency: APP_CURRENCY,
});

/** $12,480 (sin centavos, para cifras de resumen). */
export const MONEY_SHORT_FORMAT = new Intl.NumberFormat(APP_LOCALE, {
  style: 'currency',
  currency: APP_CURRENCY,
  maximumFractionDigits: 0,
});

/**
 * Separa un importe en entero y centavos para mostrarlos con distinto peso:
 * 12480.5 → { whole: '$12,480', cents: '.50' }.
 */
export function splitMoney(value: number): { whole: string; cents: string } {
  const parts = MONEY_FORMAT.formatToParts(value);
  const decimalIndex = parts.findIndex((part) => part.type === 'decimal');
  if (decimalIndex < 0) return { whole: MONEY_FORMAT.format(value), cents: '' };
  const join = (list: Intl.NumberFormatPart[]) => list.map((part) => part.value).join('');
  return { whole: join(parts.slice(0, decimalIndex)), cents: join(parts.slice(decimalIndex)) };
}
