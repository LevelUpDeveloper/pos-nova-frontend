import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Logotipo de NOVA con su subtítulo. */
@Component({
  selector: 'app-brand-mark',
  template: `
    <div class="flex items-center gap-3">
      <span
        class="grid size-11 place-items-center rounded-xl bg-linear-to-br from-violet-pale via-violet to-violet-deep text-xl text-white shadow-lg shadow-violet-deep/40 ring-1 ring-white/20"
        aria-hidden="true"
      >
        <i class="bi bi-shop"></i>
      </span>
      <div class="leading-tight">
        <p class="text-base font-extrabold tracking-[0.22em]">NOVA</p>
        <p class="whitespace-nowrap text-xs font-medium text-muted">{{ subtitle() }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandMarkComponent {
  readonly subtitle = input.required<string>();
}
