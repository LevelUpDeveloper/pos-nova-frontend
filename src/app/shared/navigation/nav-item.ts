/** Acceso a un módulo o acción (dock, accesos rápidos). */
export interface NavItem {
  readonly id: string;
  readonly label: string;
  /** Clase de bootstrap-icons sin el prefijo `bi`, p. ej. `bi-receipt`. */
  readonly icon: string;
  /** Ruta absoluta. Sin ruta, el acceso se muestra como "próximamente". */
  readonly path?: string;
  /** Tecla de función que se muestra como atajo (F1, F2…). */
  readonly shortcut?: string;
  readonly description?: string;
  readonly tone?: 'primary' | 'gold';
  /** Si se indica, solo lo ven usuarios con alguno de estos roles. */
  readonly roles?: readonly string[];
}
