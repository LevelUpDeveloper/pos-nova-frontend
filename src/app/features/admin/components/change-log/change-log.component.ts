import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { TIME_FORMAT } from '../../../../shared/formats/date-formats';
import { ADMIN_TEXT } from '../../admin.config';
import { ChangeLogEntry } from '../../admin.types';

/** Bitácora de cambios del día, impresa como ticket. */
@Component({
  selector: 'app-change-log',
  templateUrl: './change-log.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLogComponent {
  readonly entries = input.required<readonly ChangeLogEntry[]>();
  readonly branchName = input.required<string>();
  readonly comingSoon = input.required<string>();

  protected readonly text = ADMIN_TEXT.changeLog;

  protected timeOf(entry: ChangeLogEntry): string {
    const date = new Date(entry.at);
    return Number.isNaN(date.getTime()) ? '' : TIME_FORMAT.format(date);
  }
}
