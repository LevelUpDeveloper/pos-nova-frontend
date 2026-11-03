import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { injectNow } from '../../shared/browser/browser-signals';
import { WORKSTATION } from '../../shared/config/workstation.config';
import { normalizeSearch } from '../../shared/formats/search-text';
import { ChangeLogComponent } from './components/change-log/change-log.component';
import { FolderSheetComponent } from './components/folder-sheet/folder-sheet.component';
import { FolderTabsComponent } from './components/folder-tabs/folder-tabs.component';
import { ThemePanelComponent } from './components/theme-panel/theme-panel.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { ADMIN_AREAS, ADMIN_PREVIEW, ADMIN_TEXT } from './admin.config';
import { AdminAreaId } from './admin.types';
import { FolderThemeService } from './shared/folder-theme.service';

/** El "Último acceso" solo cambia de minuto en minuto. */
const CLOCK_REFRESH_MS = 60_000;

/** Menú de administración: archivero por áreas, bitácora y colores personalizables. */
@Component({
  selector: 'app-admin',
  imports: [FolderTabsComponent, FolderSheetComponent, UsersTableComponent, ChangeLogComponent, ThemePanelComponent],
  providers: [FolderThemeService],
  templateUrl: './admin.component.html',
  host: { class: 'block', '[style]': 'theme.cssVars()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  protected readonly theme = inject(FolderThemeService);

  protected readonly text = ADMIN_TEXT;
  protected readonly areas = ADMIN_AREAS;
  protected readonly summary = ADMIN_PREVIEW;
  protected readonly branchName = WORKSTATION.branchName;
  protected readonly panelId = 'admin-folder-panel';
  protected readonly now = injectNow(CLOCK_REFRESH_MS);

  protected readonly activeAreaId = signal<AdminAreaId>(ADMIN_AREAS[0].id);
  protected readonly query = signal('');

  private readonly searchTerm = computed(() => normalizeSearch(this.query()));
  protected readonly searching = computed(() => this.searchTerm().length > 0);
  protected readonly activeArea = computed(
    () => this.areas.find((area) => area.id === this.activeAreaId()) ?? this.areas[0],
  );
  protected readonly activeIndex = computed(() => this.areas.indexOf(this.activeArea()) + 1);

  /** Con búsqueda, módulos de todas las áreas que coinciden por nombre o descripción. */
  protected readonly results = computed(() => {
    const term = this.searchTerm();
    return this.areas
      .flatMap((area) => area.modules)
      .filter((module) => normalizeSearch(`${module.label} ${module.description ?? ''}`).includes(term));
  });

  protected selectArea(id: AdminAreaId): void {
    this.query.set('');
    this.activeAreaId.set(id);
  }

  protected onSearch(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
