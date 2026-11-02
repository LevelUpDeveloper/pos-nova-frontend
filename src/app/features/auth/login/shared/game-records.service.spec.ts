import { TestBed } from '@angular/core/testing';
import { GameRecordsService } from './game-records.service';

describe('GameRecordsService', () => {
  let service: GameRecordsService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [GameRecordsService] });
    service = TestBed.inject(GameRecordsService);
  });

  it('guarda un récord nuevo sin firmar', () => {
    expect(service.submit('coins', 5)).toBe(true);
    expect(service.record('coins')).toEqual({ score: 5, user: null });
    expect(JSON.parse(localStorage.getItem('nova.login.best.coins')!)).toEqual({ score: 5, user: null });
  });

  it('no reemplaza el récord con un puntaje menor o igual', () => {
    service.submit('stack', 8);
    expect(service.submit('stack', 8)).toBe(false);
    expect(service.submit('stack', 3)).toBe(false);
    expect(service.record('stack').score).toBe(8);
  });

  it('firma con el nombre de usuario los récords logrados en esta sesión', () => {
    localStorage.setItem('nova.login.best.price', JSON.stringify({ score: 2, user: null }));
    service.submit('coins', 4);
    service.signPending('Ana López');

    expect(service.record('coins')).toEqual({ score: 4, user: 'Ana López' });
    expect(service.record('price').user).toBeNull();
  });

  it('ignora nombres vacíos y recorta los muy largos', () => {
    service.submit('mouse', 3);
    service.signPending('   ');
    expect(service.record('mouse').user).toBeNull();

    service.signPending('x'.repeat(40));
    expect(service.record('mouse').user).toHaveLength(24);
  });

  it('tolera valores corruptos o antiguos en el almacenamiento', () => {
    localStorage.setItem('nova.login.best.change', '{roto');
    localStorage.setItem('nova.login.best.sequence', '7');
    expect(service.record('change')).toEqual({ score: 0, user: null });
    expect(service.record('sequence')).toEqual({ score: 7, user: null });
  });

  it('recupera el juego elegido solo si es válido', () => {
    service.saveSelectedGame('price');
    expect(service.selectedGame('coins', ['coins', 'price'])).toBe('price');
    localStorage.setItem('nova.login.game', 'inexistente');
    expect(service.selectedGame('coins', ['coins', 'price'])).toBe('coins');
  });
});
