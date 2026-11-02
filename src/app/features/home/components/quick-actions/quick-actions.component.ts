import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { NavActionComponent } from '../../../../shared/navigation/nav-action/nav-action.component';
import { NavItem } from '../../../../shared/navigation/nav-item';
import { HOME_TEXT } from '../../home.config';

const BASE = 'flex w-full items-center gap-4 text-left transition';
const TONE_CLASS: Record<NonNullable<NavItem['tone']> | 'default', string> = {
  primary:
    'rounded-[20px] bg-linear-to-br from-violet to-violet-deep p-5 shadow-[0_20px_40px_-18px_rgb(91_71_240/0.9)] ring-1 ring-white/20 hover:brightness-110',
  gold: 'rounded-[18px] border border-gold/30 bg-gold/10 p-4 hover:bg-gold/15',
  default: 'rounded-[18px] border border-white/10 bg-white/5 p-4 hover:bg-white/10',
};
const ICON_CLASS: Record<NonNullable<NavItem['tone']> | 'default', string> = {
  primary: 'text-[28px]',
  gold: 'text-xl text-gold',
  default: 'text-xl text-violet-pale',
};

/** Columna derecha: teclas de acceso rápido y aviso del día. */
@Component({
  selector: 'app-quick-actions',
  imports: [NavActionComponent],
  templateUrl: './quick-actions.component.html',
  host: { class: 'flex flex-col justify-center' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickActionsComponent {
  readonly actions = input.required<readonly NavItem[]>();
  readonly notice = input.required<string>();

  protected readonly text = HOME_TEXT;

  protected itemClass(item: NavItem): string {
    return `${BASE} ${TONE_CLASS[item.tone ?? 'default']}`;
  }

  protected iconClass(item: NavItem): string {
    return `bi ${item.icon} ${ICON_CLASS[item.tone ?? 'default']}`;
  }
}
