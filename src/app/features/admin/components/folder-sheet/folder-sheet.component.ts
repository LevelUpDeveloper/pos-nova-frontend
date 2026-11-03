import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NavActionComponent } from '../../../../shared/navigation/nav-action/nav-action.component';
import { NavItem } from '../../../../shared/navigation/nav-item';
import { BadgeTone, ModuleStats } from '../../admin.types';

/** Color del icono de cada ficha; se repite en orden. */
const ICON_TONES = [
  'bg-violet/10 text-violet-deep',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
] as const;

/** Cinta adhesiva decorativa de cada ficha; acompaña al color del icono. */
const TAPE_TONES = ['bg-violet/30', 'bg-amber-300/50', 'bg-emerald-300/50', 'bg-sky-300/50'] as const;

const BADGE_CLASS: Record<BadgeTone, string> = {
  good: 'rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700',
  bad: 'rounded-full bg-rose-50 px-2 py-0.5 text-rose-700',
  neutral: 'rounded bg-black/5 px-1.5 py-0.5',
};

const CARD =
  'relative flex h-full w-full flex-col rounded-2xl border border-folder-card-border bg-folder-card p-4 text-left text-folder-ink shadow-[0_12px_24px_-16px_rgb(20_24_50/0.5)] transition hover:-translate-y-0.5';
const CREATE_CARD =
  'grid h-full min-h-[150px] w-full place-items-center rounded-2xl border-2 border-dashed border-folder-rule p-4 text-center text-folder-muted transition hover:border-folder-accent hover:text-folder-accent';

/** Hoja del expediente: encabezado, sello y fichas de los módulos. */
@Component({
  selector: 'app-folder-sheet',
  imports: [NavActionComponent],
  templateUrl: './folder-sheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderSheetComponent {
  readonly folio = input.required<string>();
  readonly heading = input.required<string>();
  readonly stamp = input.required<string>();
  readonly modules = input.required<readonly NavItem[]>();
  readonly stats = input.required<Readonly<Record<string, ModuleStats>>>();
  readonly createAction = input<NavItem>();
  readonly comingSoon = input.required<string>();
  readonly emptyText = input.required<string>();

  protected readonly card = CARD;
  protected readonly createCard = CREATE_CARD;
  protected readonly badgeClass = BADGE_CLASS;

  protected iconTone(index: number): string {
    return ICON_TONES[index % ICON_TONES.length];
  }

  protected tapeTone(index: number): string {
    return TAPE_TONES[index % TAPE_TONES.length];
  }
}
