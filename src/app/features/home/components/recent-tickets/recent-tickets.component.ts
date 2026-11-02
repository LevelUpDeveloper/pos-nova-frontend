import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { TIME_FORMAT } from '../../../../shared/formats/date-formats';
import { MONEY_FORMAT } from '../../../../shared/formats/money-format';
import { HOME_TEXT, PAYMENT_LABELS } from '../../home.config';
import { RecentTicket } from '../../home.types';

/** Inclinación y brillo de los tickets que quedan detrás del primero. */
const STACK_STYLE = [
  'relative z-20 mx-4 -mt-5 rotate-[-2deg] brightness-[0.8]',
  'relative z-10 mx-8 -mt-5 rotate-[3deg] brightness-[0.55]',
] as const;

/** Columna central: el último ticket completo y los anteriores apilados detrás. */
@Component({
  selector: 'app-recent-tickets',
  templateUrl: './recent-tickets.component.html',
  host: { class: 'flex flex-col justify-center' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecentTicketsComponent {
  readonly tickets = input.required<readonly RecentTicket[]>();
  readonly limit = input.required<number>();

  protected readonly text = HOME_TEXT;
  protected readonly payments = PAYMENT_LABELS;
  protected readonly money = MONEY_FORMAT;

  protected readonly latest = computed(() => this.tickets()[0] ?? null);
  protected readonly older = computed(() =>
    this.tickets()
      .slice(1, Math.min(this.limit(), STACK_STYLE.length + 1))
      .map((ticket, index) => ({ ticket, style: STACK_STYLE[index] })),
  );

  protected timeOf(ticket: RecentTicket): string {
    const date = new Date(ticket.issuedAt);
    return Number.isNaN(date.getTime()) ? '' : TIME_FORMAT.format(date);
  }
}
