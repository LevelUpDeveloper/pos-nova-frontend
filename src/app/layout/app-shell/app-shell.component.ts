import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { APP_PATHS } from '../../app.paths';
import { AuthService } from '../../core/services/auth/auth.service';
import { injectNow, injectOnline } from '../../shared/browser/browser-signals';
import { BrandMarkComponent } from '../../shared/components/brand-mark/brand-mark.component';
import { AppDockComponent } from './components/app-dock/app-dock.component';
import { APP_SHELL_NAV, APP_SHELL_TEXT } from './app-shell.config';

/** Marco de las pantallas con sesión: fondo, encabezado y dock inferior. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, BrandMarkComponent, AppDockComponent],
  templateUrl: './app-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly text = APP_SHELL_TEXT;
  protected readonly nav = APP_SHELL_NAV;
  protected readonly user = this.auth.user;
  protected readonly now = injectNow();
  protected readonly online = injectOnline();

  protected onLogout(): void {
    this.auth.logout();
    this.router.navigate(['/', APP_PATHS.login]);
  }
}
