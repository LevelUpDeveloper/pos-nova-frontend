import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { AuthService } from '../../core/services/auth/auth.service';
import { injectNow } from '../../shared/browser/browser-signals';
import { WORKSTATION } from '../../shared/config/workstation.config';
import { DAY_MONTH_FORMAT } from '../../shared/formats/date-formats';
import { QuickActionsComponent } from './components/quick-actions/quick-actions.component';
import { RecentTicketsComponent } from './components/recent-tickets/recent-tickets.component';
import { SalesSummaryComponent } from './components/sales-summary/sales-summary.component';
import {
  GREETINGS,
  HOME_PREVIEW,
  HOME_QUICK_ACTIONS,
  RECENT_TICKETS_SHOWN,
  SHIFT_TREND_SLOTS,
} from './home.config';
import { greetingFor } from './shared/greeting';

/** El saludo solo cambia de minuto en minuto. */
const GREETING_REFRESH_MS = 60_000;

/** Panel principal "Mostrador en vivo". */
@Component({
  selector: 'app-home',
  imports: [SalesSummaryComponent, RecentTicketsComponent, QuickActionsComponent],
  templateUrl: './home.component.html',
  host: { class: 'flex flex-1 flex-col' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly auth = inject(AuthService);
  private readonly now = injectNow(GREETING_REFRESH_MS);

  protected readonly summary = HOME_PREVIEW;
  protected readonly actions = HOME_QUICK_ACTIONS;
  protected readonly notice = WORKSTATION.notice;
  protected readonly trendSlots = SHIFT_TREND_SLOTS;
  protected readonly ticketsShown = RECENT_TICKETS_SHOWN;

  protected readonly greeting = computed(() => {
    const now = this.now();
    const name = this.auth.user()?.userName;
    const hello = greetingFor(now.getHours(), GREETINGS);
    return `${name ? `${hello}, ${name}` : hello} · ${DAY_MONTH_FORMAT.format(now)}`;
  });
}
