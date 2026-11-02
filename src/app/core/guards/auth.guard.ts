import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { APP_PATHS } from '../../app.paths';
import { AuthService } from '../services/auth/auth.service';

/**
 * Deja pasar solo con una sesión vigente; si no, regresa al login.
 * Es una protección de interfaz: la autorización real la hace el backend.
 */
export const authGuard: CanActivateFn = () => {
  if (inject(AuthService).isAuthenticated()) return true;
  return inject(Router).createUrlTree(['/', APP_PATHS.login]);
};
