import { InputSignal, Type } from '@angular/core';

export type GameId = 'coins' | 'change' | 'stack' | 'price' | 'mouse' | 'sequence';

/** Contrato de entrada de todos los juegos (GameProps). */
export interface GameComponent {
  /** true cuando un campo del login tiene foco o la pestaña está oculta. */
  readonly paused: InputSignal<boolean>;
  /** Informa el puntaje actual; el panel maneja el récord. */
  readonly onScore: InputSignal<(score: number) => void>;
}

export interface GameDefinition {
  title: string;
  /** Nombre corto para el selector de juegos. */
  shortTitle: string;
  subtitle: string;
  icon: string;
  load: () => Promise<Type<GameComponent>>;
}

export type GameMessageTone = 'neutral' | 'good' | 'bad';

export interface GameMessage {
  text: string;
  tone: GameMessageTone;
}
