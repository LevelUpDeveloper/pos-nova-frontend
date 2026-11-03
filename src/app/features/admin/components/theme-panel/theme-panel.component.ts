import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  Injector,
  signal,
  viewChild,
} from '@angular/core';

import { BTN_GHOST, BTN_PRIMARY } from '../../../../shared/ui/buttons';
import { FOLDER_PRESETS, THEME_PANEL_TEXT } from '../../admin.config';
import { FOLDER_COLOR_KEYS, FolderColorKey, FolderPalette } from '../../shared/folder-theme';
import { FolderThemeService } from '../../shared/folder-theme.service';

/** Botón "Personalizar" y panel para elegir los colores del archivero. */
@Component({
  selector: 'app-theme-panel',
  templateUrl: './theme-panel.component.html',
  host: {
    class: 'relative block',
    '(document:keydown.escape)': 'onEscape()',
    '(document:pointerdown)': 'onDocumentPointer($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePanelComponent {
  protected readonly theme = inject(FolderThemeService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);
  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  protected readonly text = THEME_PANEL_TEXT;
  protected readonly presets = FOLDER_PRESETS;
  protected readonly colorKeys = FOLDER_COLOR_KEYS;
  protected readonly btnGhost = BTN_GHOST;
  protected readonly btnPrimary = BTN_PRIMARY;
  protected readonly open = signal(false);
  protected readonly contrastLabel = computed(() => `${this.theme.contrast().toFixed(1)} : 1`);

  protected toggle(): void {
    if (this.open()) {
      this.close();
      return;
    }
    this.theme.startEditing();
    this.open.set(true);
    afterNextRender(() => this.panel()?.nativeElement.focus(), { injector: this.injector });
  }

  protected pick(palette: FolderPalette): void {
    this.theme.preview(palette);
  }

  protected onColor(key: FolderColorKey, event: Event): void {
    this.theme.setColor(key, (event.target as HTMLInputElement).value);
  }

  protected save(): void {
    if (this.theme.save()) this.finish();
  }

  /** Cierra sin guardar: la paleta vuelve a la guardada. */
  protected close(): void {
    this.theme.cancel();
    this.finish();
  }

  protected onEscape(): void {
    if (this.open()) this.close();
  }

  protected onDocumentPointer(event: PointerEvent): void {
    if (this.open() && !this.host.nativeElement.contains(event.target as Node)) this.close();
  }

  private finish(): void {
    this.open.set(false);
    this.trigger().nativeElement.focus();
  }
}
