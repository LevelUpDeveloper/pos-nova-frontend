import { APP_PATHS } from '../../app.paths';
import { ADMIN_AREA_ROLES } from '../../core/services/auth/roles';
import { WORKSTATION } from '../../shared/config/workstation.config';
import { NavItem } from '../../shared/navigation/nav-item';

/**
 * Módulos del dock inferior. Los que aún no tienen ruta se muestran como
 * "próximamente"; los que tienen `roles` solo los ven esos roles.
 * Proveedores y Ajustes viven dentro de Administración.
 */
export const APP_SHELL_NAV: readonly NavItem[] = [
  { id: 'home', label: 'Inicio', icon: 'bi-house-door-fill', path: `/${APP_PATHS.home}` },
  { id: 'sell', label: 'Vender', icon: 'bi-cart3' },
  { id: 'sales', label: 'Ventas', icon: 'bi-receipt' },
  { id: 'products', label: 'Productos', icon: 'bi-box-seam' },
  { id: 'inventory', label: 'Inventario', icon: 'bi-boxes' },
  { id: 'reports', label: 'Reportes', icon: 'bi-bar-chart-line' },
  {
    id: 'admin',
    label: 'Admin',
    icon: 'bi-shield-lock-fill',
    path: `/${APP_PATHS.admin}`,
    roles: ADMIN_AREA_ROLES,
  },
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
