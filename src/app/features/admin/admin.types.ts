import { NavItem } from '../../shared/navigation/nav-item';

export type AdminAreaId = 'people' | 'catalog' | 'business' | 'system';

/** Una carpeta del archivero (pestaña) con sus módulos. */
export interface AdminArea {
  readonly id: AdminAreaId;
  readonly label: string;
  readonly icon: string;
  /** Pregunta que resume la carpeta: "Quién trabaja y qué puede hacer". */
  readonly heading: string;
  readonly modules: readonly NavItem[];
  /** Acción de alta que se muestra como ficha punteada. */
  readonly createAction?: NavItem;
}

export type BadgeTone = 'good' | 'bad' | 'neutral';

export interface ModuleBadge {
  readonly label: string;
  readonly tone: BadgeTone;
}

/** Cifras que acompañan a una ficha de módulo. */
export interface ModuleStats {
  readonly count?: number;
  readonly badges?: readonly ModuleBadge[];
}

export type UserStatus = 'active' | 'blocked';

export interface AdminUserRow {
  readonly userName: string;
  readonly role: string;
  /** Fecha y hora ISO 8601 del último acceso. */
  readonly lastAccess: string;
  readonly status: UserStatus;
}

export interface ChangeLogEntry {
  /** Fecha y hora ISO 8601. */
  readonly at: string;
  readonly actor: string;
  readonly action: string;
}

/**
 * Datos del archivero. Es la forma que se espera de los futuros endpoints;
 * mientras no existan, se usa `ADMIN_PREVIEW` (admin.config.ts).
 */
export interface AdminSummary {
  readonly moduleStats: Readonly<Record<string, ModuleStats>>;
  readonly recentUsers: readonly AdminUserRow[];
  /** Del más reciente al más antiguo. */
  readonly changeLog: readonly ChangeLogEntry[];
}
