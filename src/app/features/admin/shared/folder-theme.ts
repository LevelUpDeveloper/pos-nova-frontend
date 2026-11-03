import { contrastRatio, isDarkColor, isHexColor, mixColors } from '../../../shared/color/color';

/** Los 4 colores que el usuario puede elegir; el resto se deriva de ellos. */
export interface FolderPalette {
  readonly paper: string;
  readonly tab: string;
  readonly ink: string;
  readonly accent: string;
}

export type FolderColorKey = keyof FolderPalette;
export const FOLDER_COLOR_KEYS: readonly FolderColorKey[] = ['paper', 'tab', 'ink', 'accent'];

const WHITE = '#ffffff';

/** Variables CSS `--folder-*` que consumen los tokens de tailwind.css. */
export function folderCssVars(p: FolderPalette): Record<string, string> {
  const card = isDarkColor(p.paper) ? mixColors(p.paper, p.ink, 0.07) : mixColors(p.paper, WHITE, 0.7);
  return {
    '--folder-paper': p.paper,
    '--folder-tab': p.tab,
    '--folder-tab-2': mixColors(p.tab, p.ink, 0.07),
    '--folder-tab-3': mixColors(p.tab, p.ink, 0.14),
    '--folder-tab-ink': mixColors(p.ink, p.tab, 0.3),
    '--folder-ink': p.ink,
    '--folder-muted': mixColors(p.ink, p.paper, 0.4),
    '--folder-rule': mixColors(p.ink, p.paper, 0.8),
    '--folder-card': card,
    '--folder-card-border': mixColors(card, p.ink, 0.12),
    '--folder-accent': p.accent,
  };
}

/** Contraste de lectura: el peor caso entre el texto y sus fondos (papel y fichas). */
export function folderContrast(p: FolderPalette): number {
  const card = folderCssVars(p)['--folder-card'];
  return Math.min(contrastRatio(p.ink, p.paper), contrastRatio(p.ink, card));
}

/** Lee una paleta guardada; cualquier valor con forma inesperada se descarta. */
export function parseFolderPalette(raw: string | null): FolderPalette | null {
  if (!raw) return null;
  try {
    const value: Record<string, unknown> = JSON.parse(raw);
    if (!FOLDER_COLOR_KEYS.every((key) => isHexColor(value[key]))) return null;
    const [paper, tab, ink, accent] = FOLDER_COLOR_KEYS.map((key) => (value[key] as string).toLowerCase());
    return { paper, tab, ink, accent };
  } catch {
    return null;
  }
}

export function samePalette(a: FolderPalette, b: FolderPalette): boolean {
  return FOLDER_COLOR_KEYS.every((key) => a[key].toLowerCase() === b[key].toLowerCase());
}
