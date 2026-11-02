/**
 * Datos del panel principal. Es la forma que se espera del futuro endpoint de
 * resumen del turno; mientras no exista, se usa `HOME_PREVIEW` (home.config.ts).
 */
export type PaymentMethod = 'cash' | 'card';

export interface TicketLine {
  readonly quantity: number;
  readonly description: string;
  readonly amount: number;
}

export interface RecentTicket {
  readonly folio: string;
  /** Fecha y hora ISO 8601. */
  readonly issuedAt: string;
  readonly total: number;
  readonly payment: PaymentMethod;
  readonly itemCount: number;
  readonly lines: readonly TicketLine[];
}

export interface HomeSummary {
  readonly soldTotal: number;
  readonly ticketCount: number;
  readonly averageTicket: number;
  readonly lowStockCount: number;
  /** Venta acumulada por hora desde la apertura del turno. */
  readonly hourlySales: readonly number[];
  /** Del más reciente al más antiguo. */
  readonly recentTickets: readonly RecentTicket[];
}
