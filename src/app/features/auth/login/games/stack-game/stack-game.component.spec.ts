import { TestBed } from '@angular/core/testing';
import { StackGameComponent } from './stack-game.component';

/** Avanza la caja durante `durationMs` simulando una pantalla de `hz` cuadros por segundo. */
function travelled(hz: number, durationMs: number): number {
  // Cola de cuadros como la del navegador (Angular también la usa para su detección de cambios).
  let queue: FrameRequestCallback[] = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => queue.push(cb));

  const fixture = TestBed.createComponent(StackGameComponent);
  fixture.componentRef.setInput('onScore', () => {});
  const game = fixture.componentInstance as unknown as { active: () => { x: number } | null };
  const start = game.active()!.x;

  const frameMs = 1000 / hz;
  for (let t = 0; t <= durationMs; t += frameMs) {
    const frame = queue;
    queue = [];
    frame.forEach((cb) => cb(t));
  }

  const distance = game.active()!.x - start;
  fixture.destroy();
  vi.restoreAllMocks();
  return distance;
}

describe('StackGameComponent', () => {
  it('mueve la caja a la misma velocidad sin importar los Hz de la pantalla', () => {
    const at60 = travelled(60, 400);
    const at144 = travelled(144, 400);

    expect(at60).toBeGreaterThan(40);
    expect(Math.abs(at144 - at60)).toBeLessThan(3);
  });
});
