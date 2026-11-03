import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { formatDayTime } from '../../../../shared/formats/date-formats';
import { initialsOf } from '../../../../shared/formats/initials';
import { ADMIN_TEXT, USER_STATUS_LABELS } from '../../admin.config';
import { AdminUserRow, UserStatus } from '../../admin.types';

/** Color del avatar; se repite en orden. */
const AVATAR_TONES = ['bg-violet', 'bg-emerald-600', 'bg-amber-600', 'bg-sky-600', 'bg-slate-400'] as const;

const STATUS_CLASS: Record<UserStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700',
  blocked: 'bg-rose-50 text-rose-700',
};

/** Tabla de usuarios con actividad reciente (dentro del expediente de Personas). */
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  readonly users = input.required<readonly AdminUserRow[]>();
  readonly now = input.required<Date>();

  protected readonly text = ADMIN_TEXT.usersTable;
  protected readonly statusLabel = USER_STATUS_LABELS;
  protected readonly statusClass = STATUS_CLASS;
  protected readonly initialsOf = initialsOf;

  protected avatarTone(index: number): string {
    return AVATAR_TONES[index % AVATAR_TONES.length];
  }

  protected lastAccess(user: AdminUserRow): string {
    return formatDayTime(new Date(user.lastAccess), this.now(), this.text.today);
  }
}
