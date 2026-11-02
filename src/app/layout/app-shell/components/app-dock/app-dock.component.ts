import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { SessionUser } from '../../../../core/services/auth/auth.service';
import { TIME_FORMAT } from '../../../../shared/formats/date-formats';
import { initialsOf } from '../../../../shared/formats/initials';
import { NavActionComponent } from '../../../../shared/navigation/nav-action/nav-action.component';
import { NavItem } from '../../../../shared/navigation/nav-item';
import { APP_SHELL_TEXT } from '../../app-shell.config';

/** Dock flotante inferior: usuario, módulos y estado de la caja. */
@Component({
  selector: 'app-dock',
  imports: [NavActionComponent],
  templateUrl: './app-dock.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDockComponent {
  readonly items = input.required<readonly NavItem[]>();
  readonly user = input.required<SessionUser | null>();
  readonly now = input.required<Date>();
  readonly online = input(true);
  readonly logout = output<void>();

  protected readonly text = APP_SHELL_TEXT;
  protected readonly itemBase =
    'flex shrink-0 flex-col items-center gap-0.5 rounded-[16px] px-3.5 py-2 text-[10px] font-semibold transition';
  protected readonly itemIdle = 'text-muted-2 hover:bg-white/10 hover:text-white';
  protected readonly itemActive = 'bg-violet/25 text-white ring-1 ring-violet-soft';

  protected readonly userName = computed(() => this.user()?.userName ?? '');
  protected readonly initials = computed(() => initialsOf(this.userName()));
  protected readonly roleLabel = computed(() => this.user()?.roles[0] ?? this.text.noRole);
  protected readonly time = computed(() => TIME_FORMAT.format(this.now()));
}
