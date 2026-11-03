import { AdminArea, AdminSummary, UserStatus } from './admin.types';
import { FolderColorKey, FolderPalette } from './shared/folder-theme';

export const ADMIN_TEXT = {
  eyebrow: 'Administración',
  title: 'El archivero',
  titleMuted: 'de tu negocio',
  searchLabel: 'Buscar módulo en el archivero',
  searchPlaceholder: 'Buscar en el archivero…',
  areasLabel: 'Áreas del archivero',
  confidential: 'Confidencial',
  folio: (index: number, label: string) => `Expediente ${String(index).padStart(2, '0')} · ${label}`,
  resultsFolio: 'Búsqueda',
  resultsHeading: (query: string) => `Resultados para “${query}”`,
  noResults: 'No encontramos módulos con ese nombre.',
  comingSoon: 'Próximamente',
  usersTable: {
    caption: 'Usuarios con actividad reciente',
    user: 'Usuario',
    role: 'Rol',
    lastAccess: 'Último acceso',
    status: 'Estado',
    today: 'hoy',
  },
  changeLog: {
    printer: 'Bitácora · TP-80',
    title: 'Bitácora de cambios',
    subtitle: (branch: string) => `Hoy · ${branch}`,
    seeAll: 'Ver bitácora completa',
    empty: 'Sin cambios registrados hoy.',
  },
} as const;

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: 'Activo',
  blocked: 'Bloqueado',
};

export const ADMIN_AREAS: readonly AdminArea[] = [
  {
    id: 'people',
    label: 'Personas',
    icon: 'bi-people-fill',
    heading: 'Quién trabaja y qué puede hacer',
    modules: [
      { id: 'users', label: 'Usuarios', icon: 'bi-person-badge', description: 'Altas, bajas, contraseñas y sucursal.' },
      { id: 'roles', label: 'Roles y permisos', icon: 'bi-key', description: 'Qué puede hacer cada quien.' },
    ],
    createAction: { id: 'new-user', label: 'Nuevo usuario', icon: 'bi-plus-circle', description: 'o crea un rol nuevo' },
  },
  {
    id: 'catalog',
    label: 'Catálogo',
    icon: 'bi-box-seam',
    heading: 'Lo que vendes y a quién se lo compras',
    modules: [
      { id: 'products', label: 'Productos', icon: 'bi-box-seam', description: 'Precios, existencias e imágenes.' },
      { id: 'categories', label: 'Categorías', icon: 'bi-tags', description: 'Agrupa tus productos.' },
      { id: 'providers', label: 'Proveedores', icon: 'bi-truck', description: 'Contactos y compras.' },
      {
        id: 'document-types',
        label: 'Tipos de documento',
        icon: 'bi-file-earmark-text',
        description: 'Identificaciones aceptadas.',
      },
    ],
    createAction: { id: 'new-product', label: 'Nuevo producto', icon: 'bi-plus-circle', description: 'o una categoría' },
  },
  {
    id: 'business',
    label: 'Negocio',
    icon: 'bi-shop',
    heading: 'Dónde y cómo cobras',
    modules: [
      { id: 'branches', label: 'Sucursales', icon: 'bi-geo-alt', description: 'Tus tiendas y sus datos.' },
      { id: 'registers', label: 'Cajas', icon: 'bi-pc-display-horizontal', description: 'Cajas por sucursal.' },
      { id: 'taxes', label: 'Impuestos', icon: 'bi-percent', description: 'Tasas que aplican a tus ventas.' },
    ],
    createAction: { id: 'new-branch', label: 'Nueva sucursal', icon: 'bi-plus-circle', description: 'o una caja' },
  },
  {
    id: 'system',
    label: 'Sistema',
    icon: 'bi-gear',
    heading: 'Cómo se comporta NOVA',
    modules: [
      { id: 'receipt', label: 'Diseño del ticket', icon: 'bi-receipt-cutoff', description: 'Lo que se imprime en cada venta.' },
      { id: 'security', label: 'Seguridad', icon: 'bi-shield-check', description: 'Sesiones y contraseñas.' },
      { id: 'change-log', label: 'Bitácora', icon: 'bi-journal-text', description: 'Historial de cambios.' },
    ],
  },
];

/** Paletas del archivero. La primera es la predeterminada. */
export const FOLDER_PRESETS: readonly { id: string; label: string; palette: FolderPalette }[] = [
  { id: 'cream', label: 'Papel crema', palette: { paper: '#f7f5ef', tab: '#ddd8ca', ink: '#141832', accent: '#5b47f0' } },
  { id: 'manila', label: 'Manila kraft', palette: { paper: '#f5e6bd', tab: '#ead395', ink: '#2b2112', accent: '#5b47f0' } },
  { id: 'lavender', label: 'Lavanda NOVA', palette: { paper: '#f2efff', tab: '#ddd6ff', ink: '#1b1747', accent: '#5b47f0' } },
  { id: 'slate', label: 'Azul pizarra', palette: { paper: '#eef2f8', tab: '#d9e1ee', ink: '#13203a', accent: '#5b47f0' } },
  { id: 'graphite', label: 'Grafito nocturno', palette: { paper: '#1d1a4a', tab: '#27235c', ink: '#e8eaff', accent: '#a99bff' } },
];

/** Preferencia visual por equipo (no contiene datos sensibles). */
export const FOLDER_THEME_STORAGE_KEY = 'nova.admin.folder-theme';

export const THEME_PANEL_TEXT = {
  trigger: 'Personalizar',
  eyebrow: 'Apariencia',
  title: 'Colores del archivero',
  subtitle: 'Los cambios se ven al instante.',
  presets: 'Paletas',
  fineTune: 'Ajuste fino',
  colors: { paper: 'Papel', tab: 'Pestañas', ink: 'Tinta', accent: 'Acento' } satisfies Record<FolderColorKey, string>,
  contrast: 'Contraste de lectura',
  contrastOk: 'AA ✓',
  contrastLow: 'Bajo',
  contrastHint: 'La tinta no se lee bien sobre el papel. Elige colores con más contraste para guardar.',
  reset: 'Restablecer',
  cancel: 'Cancelar',
  save: 'Guardar',
  close: 'Cerrar',
  storageNote: 'Se guarda en este equipo.',
} as const;

/**
 * Datos de muestra para diseñar el archivero. Todavía no existen los endpoints
 * de conteos, usuarios recientes ni bitácora; cuando existan, se reemplaza
 * por la respuesta del backend.
 */
export const ADMIN_PREVIEW: AdminSummary = {
  moduleStats: {
    users: {
      count: 12,
      badges: [
        { label: '10 activos', tone: 'good' },
        { label: '2 bloq.', tone: 'bad' },
      ],
    },
    roles: {
      count: 4,
      badges: [
        { label: 'ADMIN', tone: 'neutral' },
        { label: 'MANAGER', tone: 'neutral' },
      ],
    },
    products: { count: 1204 },
    categories: { count: 38 },
    providers: { count: 21 },
    'document-types': { count: 6 },
    branches: { count: 3 },
    registers: { count: 5 },
    taxes: { badges: [{ label: 'IVA 16%', tone: 'neutral' }] },
    security: { badges: [{ label: '1 aviso', tone: 'bad' }] },
  },
  recentUsers: [
    { userName: 'Ana López', role: 'Admin', lastAccess: '2026-11-02T08:00:00', status: 'active' },
    { userName: 'Jorge Ruiz', role: 'Manager', lastAccess: '2026-11-02T09:12:00', status: 'active' },
    { userName: 'cajero2', role: 'Cajero', lastAccess: '2026-10-24T19:40:00', status: 'blocked' },
  ],
  changeLog: [
    { at: '2026-11-02T18:02:00', actor: 'Ana', action: 'bloqueó a cajero2' },
    { at: '2026-11-02T16:40:00', actor: 'Ana', action: 'creó la categoría Lácteos' },
    { at: '2026-11-02T13:15:00', actor: 'Jorge', action: 'cambió el precio de 4 productos' },
    { at: '2026-11-02T10:30:00', actor: 'Ana', action: 'agregó el proveedor Bimbo' },
    { at: '2026-11-02T08:00:00', actor: 'Sistema', action: 'abrió la Caja 01' },
  ],
};
