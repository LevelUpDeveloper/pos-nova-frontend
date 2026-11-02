import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { MONEY_SHORT_FORMAT, splitMoney } from '../../../../shared/formats/money-format';
import { HOME_TEXT } from '../../home.config';
import { HomeSummary } from '../../home.types';
import { buildSparkline } from '../../shared/sparkline';

const CHART = { width: 400, height: 80 } as const;

/** Columna izquierda: saludo, total del turno, tendencia e indicadores. */
@Component({
  selector: 'app-sales-summary',
  templateUrl: './sales-summary.component.html',
  host: { class: 'flex flex-col justify-center' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesSummaryComponent {
  readonly greeting = input.required<string>();
  readonly summary = input.required<HomeSummary>();
  /** Horas que abarca la gráfica. */
  readonly trendSlots = input.required<number>();

  protected readonly text = HOME_TEXT;
  protected readonly chart = CHART;
  protected readonly total = computed(() => splitMoney(this.summary().soldTotal));
  protected readonly average = computed(() => MONEY_SHORT_FORMAT.format(this.summary().averageTicket));
  protected readonly trend = computed(() =>
    buildSparkline(this.summary().hourlySales, CHART.width, CHART.height, this.trendSlots()),
  );
}
