import { APP_PATHS } from '../../app.paths';
import { WORKSTATION } from '../../shared/config/workstation.config';
import { NavItem } from '../../shared/navigation/nav-item';

/** Módulos del dock inferior. Los que aún no tienen ruta se muestran como "próximamente". */
export const APP_SHELL_NAV: readonly NavItem[] = [
  { id: 'home', label: 'Inicio', icon: 'bi-house-door-fill', path: `/${APP_PATHS.home}` },
  { id: 'sell', label: 'Vender', icon: 'bi-cart3' },
  { id: 'sales', label: 'Ventas', icon: 'bi-receipt' },
  { id: 'products', label: 'Productos', icon: 'bi-box-seam' },
  { id: 'inventory', label: 'Inventario', icon: 'bi-boxes' },
  { id: 'providers', label: 'Proveedores', icon: 'bi-truck' },
  { id: 'reports', label: 'Reportes', icon: 'bi-bar-chart-line' },
  { id: 'settings', label: 'Ajustes', icon: 'bi-gear' },
];

export const APP_SHELL_TEXT = {
  brandSubtitle: `${WORKSTATION.branchName} · Caja ${WORKSTATION.registerName}`,
  navLabel: 'Menú principal',
  comingSoon: 'Próximamente',
  logout: 'Cerrar sesión',
  online: 'En línea',
  offline: 'Sin conexión',
  noRole: 'Sin rol asignado',
} as const;
