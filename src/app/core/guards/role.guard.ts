import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { APP_PATHS } from '../../app.paths';
import { AuthService } from '../services/auth/auth.service';

/**
 * Deja pasar solo a usuarios con alguno de los roles; los demás vuelven al
 * inicio. Es una protección de interfaz: el backend vuelve a validar el rol.
 * Se usa después de `authGuard`.
 */
export function roleGuard(roles: readonly string[]): CanActivateFn {
  return () => {
    if (inject(AuthService).hasAnyRole(roles)) return true;
    return inject(Router).createUrlTree(['/', APP_PATHS.home]);
  };
}
