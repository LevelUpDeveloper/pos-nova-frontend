import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  Type,
} from '@angular/core';
import { DEFAULT_GAME, GAME_IDS, GAMES } from '../../games/game-registry';
import { GameComponent, GameId } from '../../games/game.types';
import { BTN_GHOST } from '../../games/game-utils';
import { injectOnline, injectPageHidden } from '../../shared/browser-signals';
import { GameRecordsService } from '../../shared/game-records.service';

/** Panel de minijuegos con selector, puntaje y récord por juego. */
@Component({
  selector: 'app-game-panel',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './game-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePanelComponent {
  /** true mientras un campo del formulario de login tiene foco. */
  readonly formFocused = input(false);

  private readonly records = inject(GameRecordsService);
  private readonly pageHidden = injectPageHidden();
  protected readonly online = injectOnline();
  private loadToken = 0;

  protected readonly btnGhost = BTN_GHOST;
  protected readonly games = GAME_IDS.map((id) => ({ id, ...GAMES[id] }));
  protected readonly current = signal<GameId>(this.records.selectedGame(DEFAULT_GAME, GAME_IDS));
  protected readonly game = computed(() => GAMES[this.current()]);
  protected readonly score = signal(0);
  protected readonly best = computed(() => this.records.record(this.current()));
  protected readonly newRecord = signal(false);
  protected readonly component = signal<Type<GameComponent> | null>(null);
  protected readonly loadFailed = signal(false);
  protected readonly gameInputs = computed(() => ({
    paused: this.formFocused() || this.pageHidden(),
    onScore: this.handleScore,
  }));

  constructor() {
    this.load(this.current());
  }

  protected select(id: GameId): void {
    if (id === this.current()) return;
    this.current.set(id);
    this.records.saveSelectedGame(id);
    this.load(id);
  }

  /**
   * Chromium recuerda un `import()` fallido hasta recargar la página, así que
   * reintentar dentro de la misma página no funciona: se recarga el login.
   */
  protected reloadPage(): void {
    if (this.online()) location.reload();
  }

  private readonly handleScore = (score: number): void => {
    this.score.set(score);
    if (this.records.submit(this.current(), score)) this.newRecord.set(true);
  };

  private async load(id: GameId): Promise<void> {
    const token = ++this.loadToken;
    this.score.set(0);
    this.newRecord.set(false);
    this.component.set(null);
    this.loadFailed.set(false);
    try {
      const loaded = await GAMES[id].load();
      if (token === this.loadToken) this.component.set(loaded);
    } catch {
      // Sin conexión o versión nueva publicada: el archivo del juego no llegó.
      if (token === this.loadToken) this.loadFailed.set(true);
    }
  }
}
