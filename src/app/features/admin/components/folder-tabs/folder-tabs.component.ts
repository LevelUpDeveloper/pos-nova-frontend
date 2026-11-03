import { ChangeDetectionStrategy, Component, ElementRef, input, output, viewChildren } from '@angular/core';

import { AdminArea, AdminAreaId } from '../../admin.types';

/** Fondos de las pestañas inactivas, de la más clara a la más oscura. */
const IDLE_TABS = ['bg-folder-tab', 'bg-folder-tab-2', 'bg-folder-tab-3'] as const;

/** Pestañas de carpeta del archivero (role="tablist"; flechas para moverse). */
@Component({
  selector: 'app-folder-tabs',
  templateUrl: './folder-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderTabsComponent {
  readonly areas = input.required<readonly AdminArea[]>();
  /** Pestaña activa; null mientras se muestran resultados de búsqueda. */
  readonly active = input.required<AdminAreaId | null>();
  readonly label = input.required<string>();
  readonly panelId = input.required<string>();
  readonly selected = output<AdminAreaId>();

  private readonly tabs = viewChildren<ElementRef<HTMLButtonElement>>('tab');

  protected tabClass(index: number, isActive: boolean): string {
    return isActive
      ? 'relative z-10 bg-folder-paper pb-3 pt-3.5 font-extrabold text-folder-ink'
      : `${IDLE_TABS[index % IDLE_TABS.length]} pb-2.5 pt-3 font-bold text-folder-tab-ink hover:brightness-105`;
  }

  protected onKeydown(event: KeyboardEvent, index: number): void {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const areas = this.areas();
    const next = (index + step + areas.length) % areas.length;
    this.selected.emit(areas[next].id);
    this.tabs()[next]?.nativeElement.focus();
  }
}
