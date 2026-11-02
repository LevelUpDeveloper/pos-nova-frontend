import { GameDefinition, GameId } from './game.types';

/** Cada juego se descarga solo cuando se elige (carga diferida). */
export const GAMES: Record<GameId, GameDefinition> = {
  coins: {
    title: 'Atrapa las monedas',
    shortTitle: 'Monedas',
    subtitle: 'Toca las monedas antes de que caigan',
    icon: 'bi-coin',
    load: () => import('./coin-catcher/coin-catcher.component').then((m) => m.CoinCatcherComponent),
  },
  change: {
    title: 'Da el cambio',
    shortTitle: 'Cambio',
    subtitle: 'Calcula y entrega el cambio exacto',
    icon: 'bi-cash-coin',
    load: () => import('./change-game/change-game.component').then((m) => m.ChangeGameComponent),
  },
  stack: {
    title: 'Apila las cajas',
    shortTitle: 'Cajas',
    subtitle: 'Suelta la caja justo encima',
    icon: 'bi-box-seam',
    load: () => import('./stack-game/stack-game.component').then((m) => m.StackGameComponent),
  },
  price: {
    title: '¿Más caro o más barato?',
    shortTitle: 'Precios',
    subtitle: 'Adivina el precio del siguiente',
    icon: 'bi-tags',
    load: () => import('./price-game/price-game.component').then((m) => m.PriceGameComponent),
  },
  mouse: {
    title: 'Saca al ratón',
    shortTitle: 'Ratón',
    subtitle: 'Atrápalo en el almacén',
    icon: 'bi-bug',
    load: () => import('./mouse-game/mouse-game.component').then((m) => m.MouseGameComponent),
  },
  sequence: {
    title: 'Secuencia de caja',
    shortTitle: 'Secuencia',
    subtitle: 'Repite el orden de cobro',
    icon: 'bi-grid-fill',
    load: () =>
      import('./sequence-game/sequence-game.component').then((m) => m.SequenceGameComponent),
  },
};

export const GAME_IDS = Object.keys(GAMES) as GameId[];
export const DEFAULT_GAME: GameId = 'coins';
