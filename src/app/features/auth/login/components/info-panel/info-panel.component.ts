import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { LONG_DATE_FORMAT, TIME_FORMAT } from '../../shared/date-formats';

/** Panel izquierdo: reloj, sucursal y aviso del día. */
@Component({
  selector: 'app-info-panel',
  standalone: true,
  templateUrl: './info-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoPanelComponent {
  readonly branchName = input.required<string>();
  readonly registerName = input.required<string>();
  readonly notice = input.required<string>();
  readonly online = input(true);
  /** Hora actual; la entrega el login para usar un solo reloj en la pantalla. */
  readonly now = input.required<Date>();

  protected readonly time = computed(() => TIME_FORMAT.format(this.now()));
  protected readonly longDate = computed(() => {
    const text = LONG_DATE_FORMAT.format(this.now());
    return text.charAt(0).toUpperCase() + text.slice(1);
  });
}
