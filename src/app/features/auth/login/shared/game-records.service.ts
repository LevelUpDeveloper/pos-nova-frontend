import { Injectable, signal } from '@angular/core';
import { GameId } from '../games/game.types';
import { safeStorage } from './safe-storage';

export interface GameRecord {
  score: number;
  /** Nombre del usuario que inició sesión después de lograr el récord. */
  user: string | null;
}

const GAME_KEY = 'nova.login.game';
const BEST_KEY_PREFIX = 'nova.login.best.';
const MAX_NAME_LENGTH = 24;

/**
 * Récords de los minijuegos del login. Un récord nuevo queda "pendiente"
 * hasta que alguien inicia sesión con éxito en esta pantalla; en ese momento
 * se firma con el nombre de usuario que devolvió el backend.
 */
@Injectable()
export class GameRecordsService {
  private readonly records = signal<Partial<Record<GameId, GameRecord>>>({});
  private readonly unsigned = new Set<GameId>();

  selectedGame(fallback: GameId, valid: readonly GameId[]): GameId {
    const stored = safeStorage.get(GAME_KEY) as GameId | null;
    return stored && valid.includes(stored) ? stored : fallback;
  }

  saveSelectedGame(id: GameId): void {
    safeStorage.set(GAME_KEY, id);
  }

  /** Récord guardado del juego. Es reactivo: se puede leer dentro de un `computed`. */
  record(id: GameId): GameRecord {
    return this.records()[id] ?? this.read(id);
  }

  /** Registra un puntaje; devuelve true si superó el récord. */
  submit(id: GameId, score: number): boolean {
    if (score <= this.record(id).score) return false;
    const next: GameRecord = { score, user: null };
    this.unsigned.add(id);
    this.write(id, next);
    return true;
  }

  /** Firma con el nombre de usuario los récords logrados en esta sesión de la pantalla. */
  signPending(userName: string | null | undefined): void {
    const name = userName?.trim().slice(0, MAX_NAME_LENGTH);
    if (!name) return;
    this.unsigned.forEach((id) => this.write(id, { ...this.record(id), user: name }));
    this.unsigned.clear();
  }

  private read(id: GameId): GameRecord {
    const raw = safeStorage.get(BEST_KEY_PREFIX + id);
    if (!raw) return { score: 0, user: null };
    try {
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed === 'number') return { score: Math.max(0, parsed), user: null };
      if (parsed && typeof parsed === 'object') {
        const { score, user } = parsed as Partial<GameRecord>;
        return {
          score: typeof score === 'number' && score > 0 ? Math.floor(score) : 0,
          user: typeof user === 'string' ? user.slice(0, MAX_NAME_LENGTH) : null,
        };
      }
    } catch {
      // Valor corrupto: se ignora.
    }
    return { score: 0, user: null };
  }

  private write(id: GameId, record: GameRecord): void {
    this.records.update((all) => ({ ...all, [id]: record }));
    safeStorage.set(BEST_KEY_PREFIX + id, JSON.stringify(record));
  }
}
