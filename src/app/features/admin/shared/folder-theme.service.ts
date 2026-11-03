import { Injectable, computed, signal } from '@angular/core';

import { safeStorage } from '../../../shared/browser/safe-storage';
import { AA_CONTRAST, isHexColor } from '../../../shared/color/color';
import { FOLDER_PRESETS, FOLDER_THEME_STORAGE_KEY } from '../admin.config';
import {
  FolderColorKey,
  FolderPalette,
  folderContrast,
  folderCssVars,
  parseFolderPalette,
  samePalette,
} from './folder-theme';

const DEFAULT_PALETTE = FOLDER_PRESETS[0].palette;

/**
 * Paleta del archivero: la guardada en este equipo y un borrador que se ve
 * en vivo mientras el panel de personalización está abierto.
 * Se provee en `AdminComponent`.
 */
@Injectable()
export class FolderThemeService {
  private readonly saved = signal<FolderPalette>(
    parseFolderPalette(safeStorage.get(FOLDER_THEME_STORAGE_KEY)) ?? DEFAULT_PALETTE,
  );
  private readonly draft = signal<FolderPalette | null>(null);

  /** Paleta visible: el borrador si se está editando, si no la guardada. */
  readonly palette = computed(() => this.draft() ?? this.saved());
  readonly cssVars = computed(() => folderCssVars(this.palette()));
  readonly contrast = computed(() => folderContrast(this.palette()));
  readonly readable = computed(() => this.contrast() >= AA_CONTRAST);
  readonly editing = computed(() => this.draft() !== null);
  readonly activePresetId = computed(
    () => FOLDER_PRESETS.find((preset) => samePalette(preset.palette, this.palette()))?.id ?? null,
  );

  startEditing(): void {
    this.draft.set(this.saved());
  }

  preview(palette: FolderPalette): void {
    this.draft.set(palette);
  }

  setColor(key: FolderColorKey, value: string): void {
    if (!isHexColor(value)) return;
    this.draft.set({ ...this.palette(), [key]: value.toLowerCase() });
  }

  resetToDefault(): void {
    this.draft.set(DEFAULT_PALETTE);
  }

  /** Descarta el borrador y vuelve a la paleta guardada. */
  cancel(): void {
    this.draft.set(null);
  }

  /** Guarda el borrador si es legible. Devuelve si se guardó. */
  save(): boolean {
    const draft = this.draft();
    if (!draft || !this.readable()) return false;
    safeStorage.set(FOLDER_THEME_STORAGE_KEY, JSON.stringify(draft));
    this.saved.set(draft);
    this.draft.set(null);
    return true;
  }
}
