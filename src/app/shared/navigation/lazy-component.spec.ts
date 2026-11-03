import { LoadErrorComponent } from '../components/load-error/load-error.component';
import { lazyComponent } from './lazy-component';

class FakeScreen {}

describe('lazyComponent', () => {
  it('devuelve la pantalla cuando se descarga', async () => {
    await expect(lazyComponent(async () => FakeScreen)()).resolves.toBe(FakeScreen);
  });

  it('devuelve la pantalla de error si la descarga falla', async () => {
    const failing = lazyComponent(() => Promise.reject(new Error('chunk')));
    await expect(failing()).resolves.toBe(LoadErrorComponent);
  });
});
