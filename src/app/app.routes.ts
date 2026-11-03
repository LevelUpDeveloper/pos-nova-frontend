import { Routes } from '@angular/router';

import { APP_PATHS } from './app.paths';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { ADMIN_AREA_ROLES } from './core/services/auth/roles';
import { LoginComponent } from './features/auth/login/login.component';
import { AppShellComponent } from './layout/app-shell/app-shell.component';
import { lazyComponent } from './shared/navigation/lazy-component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: APP_PATHS.login,
    pathMatch: 'full',
  },
  {
    path: APP_PATHS.login,
    component: LoginComponent,
  },
  {
    // Pantallas con sesión: comparten el encabezado y el dock inferior y se descargan al entrar.
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: APP_PATHS.home,
        loadComponent: lazyComponent(() =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        ),
      },
      {
        path: APP_PATHS.admin,
        canActivate: [roleGuard(ADMIN_AREA_ROLES)],
        loadComponent: lazyComponent(() =>
          import('./features/admin/admin.component').then((m) => m.AdminComponent),
        ),
      },
    ],
  },
];
