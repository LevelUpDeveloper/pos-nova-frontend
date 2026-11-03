import { Type } from '@angular/core';

import { LoadErrorComponent } from '../components/load-error/load-error.component';

/**
 * `loadComponent` con estado de error visible: si el código de la pantalla no
 * se descarga (sin red, versión nueva publicada), muestra `LoadErrorComponent`.
 */
export function lazyComponent(loader: () => Promise<Type<unknown>>): () => Promise<Type<unknown>> {
  return async () => {
    try {
      return await loader();
    } catch {
      return LoadErrorComponent;
    }
  };
}
