import { NavItem } from '../../shared/navigation/nav-item';
import { HomeSummary, PaymentMethod } from './home.types';
import { Greeting } from './shared/greeting';

export const HOME_TEXT = {
  soldLabel: 'Vendido en tu turno',
  trendLabel: 'Tendencia de ventas por hora del turno',
  ticketsLabel: 'Tickets',
  averageLabel: 'Promedio',
  lowStockLabel: 'Por surtir',
  recentLabel: 'Últimos tickets',
  live: 'En vivo',
  total: 'Total',
  paid: 'Pagado',
  reprint: 'Reimprimir',
  refund: 'Devolver',
  noticeLabel: 'Aviso',
  quickActionsLabel: 'Accesos rápidos',
  comingSoon: 'Próximamente',
  emptyTickets: 'Aún no hay tickets en este turno.',
  itemCount: (count: number) => `${count} ${count === 1 ? 'artículo' : 'artículos'}`,
} as const;

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  cash: 'efectivo',
  card: 'tarjeta',
};

/** Saludo según la hora: se usa el último cuyo `fromHour` ya pasó. */
export const GREETINGS: readonly Greeting[] = [
  { fromHour: 5, text: 'Buenos días' },
  { fromHour: 12, text: 'Buenas tardes' },
  { fromHour: 19, text: 'Buenas noches' },
];

/** Horas que abarca la gráfica del turno (la parte sin ventas se dibuja punteada). */
export const SHIFT_TREND_SLOTS = 10;

/** Cuántos tickets se apilan en la columna central. */
export const RECENT_TICKETS_SHOWN = 3;

export const HOME_QUICK_ACTIONS: readonly NavItem[] = [
  {
    id: 'new-sale',
    label: 'Nueva venta',
    description: 'Escanea y cobra',
    icon: 'bi-upc-scan',
    shortcut: 'F1',
    tone: 'primary',
  },
  { id: 'price-check', label: 'Consultar precio', icon: 'bi-search', shortcut: 'F2' },
  { id: 'refund', label: 'Devolución', icon: 'bi-arrow-counterclockwise', shortcut: 'F4' },
  { id: 'stock-entry', label: 'Entrada de mercancía', icon: 'bi-box-arrow-in-down', shortcut: 'F6' },
  { id: 'cash-cut', label: 'Corte de caja', icon: 'bi-cash-coin', shortcut: 'F5', tone: 'gold' },
];

/**
 * Datos de muestra para diseñar el panel. Todavía no existe el endpoint de
 * resumen del turno; cuando exista, se reemplaza por la respuesta del backend.
 */
export const HOME_PREVIEW: HomeSummary = {
  soldTotal: 12480,
  ticketCount: 86,
  averageTicket: 145,
  lowStockCount: 7,
  hourlySales: [820, 1240, 1610, 2050, 1890, 2860, 2010],
  recentTickets: [
    {
      folio: '000186',
      issuedAt: '2026-10-25T11:42:00',
      total: 183,
      payment: 'cash',
      itemCount: 5,
      lines: [
        { quantity: 2, description: 'Coca-Cola 600 ml', amount: 44 },
        { quantity: 1, description: 'Pan blanco grande', amount: 52 },
        { quantity: 1, description: 'Leche entera 1 L', amount: 29 },
        { quantity: 1, description: 'Huevo 12 pzas', amount: 58 },
      ],
    },
    {
      folio: '000185',
      issuedAt: '2026-10-25T11:38:00',
      total: 96.5,
      payment: 'card',
      itemCount: 3,
      lines: [],
    },
    {
      folio: '000184',
      issuedAt: '2026-10-25T11:31:00',
      total: 1120,
      payment: 'card',
      itemCount: 14,
      lines: [],
    },
  ],
};
