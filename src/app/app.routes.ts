import { Routes } from '@angular/router';

import { APP_PATHS } from './app.paths';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { AdminPanelComponent } from './features/admin/admin-panel.component';
import { HomeComponent } from './features/home/home.component';
import { AppShellComponent } from './layout/app-shell/app-shell.component';

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
    // Pantallas con sesión: comparten el encabezado y el dock inferior.
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [{ path: APP_PATHS.home, component: HomeComponent }],
  },
  {
    path: APP_PATHS.adminPanel,
    component: AdminPanelComponent,
  },
];
