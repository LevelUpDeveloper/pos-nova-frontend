import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavItem } from '../nav-item';

/**
 * Acceso a un módulo. Si el módulo ya tiene ruta es un enlace; si todavía no
 * existe, es un botón deshabilitado con la leyenda `comingSoon`.
 * El contenido visual (icono, textos) se proyecta.
 */
@Component({
  selector: 'app-nav-action',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  template: `
    <ng-template #content><ng-content /></ng-template>
    @if (item().path; as path) {
      <a
        [routerLink]="path"
        routerLinkActive
        #rla="routerLinkActive"
        [attr.aria-current]="rla.isActive ? 'page' : null"
        [class]="baseClass() + ' ' + (rla.isActive ? activeClass() : idleClass())"
      >
        <ng-container [ngTemplateOutlet]="content" />
      </a>
    } @else {
      <button
        type="button"
        aria-disabled="true"
        [title]="item().label + ' · ' + comingSoon()"
        [class]="baseClass() + ' ' + idleClass() + ' cursor-not-allowed'"
      >
        <ng-container [ngTemplateOutlet]="content" />
        <span class="sr-only">({{ comingSoon() }})</span>
      </button>
    }
  `,
  host: { class: 'contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavActionComponent {
  readonly item = input.required<NavItem>();
  readonly comingSoon = input.required<string>();
  readonly baseClass = input('');
  readonly idleClass = input('');
  readonly activeClass = input('');
}
