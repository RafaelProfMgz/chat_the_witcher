export interface WitcherTheme {
  id: string;
  name: string;
  icon: string;
  description: string;
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    dark: string;
    darker: string;
    purple: string;
    blue: string;
    accent: string;
    glass: string;
    glassBorder: string;
    glassHover: string;
  };
}

export const THEMES: Record<string, WitcherTheme> = {
  wolf: {
    id: "wolf",
    name: "Escola do Lobo",
    icon: "🐺",
    description: "O caminho equilibrado — disciplina, honra e adaptabilidade.",
    colors: {
      primary: "#c9a84c",
      primaryLight: "#e8d28a",
      secondary: "#d4a853",
      dark: "#0a0a0f",
      darker: "#050508",
      purple: "#2d1b69",
      blue: "#1a1a4e",
      accent: "#8b1a1a",
      glass: "rgba(255, 255, 255, 0.05)",
      glassBorder: "rgba(255, 255, 255, 0.1)",
      glassHover: "rgba(255, 255, 255, 0.08)",
    },
  },
  cat: {
    id: "cat",
    name: "Escola do Gato",
    icon: "🐱",
    description: "Agilidade e furtividade — assassinos das sombras.",
    colors: {
      primary: "#2ecc71",
      primaryLight: "#7dcea0",
      secondary: "#27ae60",
      dark: "#080f0a",
      darker: "#040805",
      purple: "#1a4a2e",
      blue: "#0d3320",
      accent: "#c0392b",
      glass: "rgba(46, 204, 113, 0.03)",
      glassBorder: "rgba(46, 204, 113, 0.10)",
      glassHover: "rgba(46, 204, 113, 0.06)",
    },
  },
  griffin: {
    id: "griffin",
    name: "Escola do Grifo",
    icon: "🦅",
    description: "Sabedoria e magia — mestres dos Sinais e do conhecimento.",
    colors: {
      primary: "#3498db",
      primaryLight: "#85c1e9",
      secondary: "#5dade2",
      dark: "#080a10",
      darker: "#04060a",
      purple: "#1a2a5e",
      blue: "#152d69",
      accent: "#8e44ad",
      glass: "rgba(52, 152, 219, 0.03)",
      glassBorder: "rgba(52, 152, 219, 0.10)",
      glassHover: "rgba(52, 152, 219, 0.06)",
    },
  },
  nilfgaard: {
    id: "nilfgaard",
    name: "Nilfgaard",
    icon: "☀️",
    description: "O poder imperial — ouro, fogo e conquista implacável.",
    colors: {
      primary: "#f1c40f",
      primaryLight: "#f7dc6f",
      secondary: "#f39c12",
      dark: "#0a0800",
      darker: "#060500",
      purple: "#5e3a0a",
      blue: "#3d2506",
      accent: "#c0392b",
      glass: "rgba(241, 196, 15, 0.04)",
      glassBorder: "rgba(241, 196, 15, 0.10)",
      glassHover: "rgba(241, 196, 15, 0.07)",
    },
  },
};

export const THEME_IDS = Object.keys(THEMES);

export const DEFAULT_THEME_ID = "wolf";

export function getTheme(id: string): WitcherTheme {
  return THEMES[id] ?? THEMES[DEFAULT_THEME_ID];
}

/**
 * Returns CSS variable overrides to apply to <html>.
 *
 * We set TWO sets of variables:
 *  - `--witcher-*`        → used by plain CSS `var()` references (globals.css)
 *  - `--color-witcher-*`  → used by Tailwind v4 `@theme inline` utilities
 *                           (e.g. `text-witcher-gold`, `bg-witcher-dark`)
 */
export function getThemeCSSVariables(
  theme: WitcherTheme,
): Record<string, string> {
  return {
    // Plain CSS custom properties
    "--witcher-gold": theme.colors.primary,
    "--witcher-gold-light": theme.colors.primaryLight,
    "--witcher-amber": theme.colors.secondary,
    "--witcher-dark": theme.colors.dark,
    "--witcher-darker": theme.colors.darker,
    "--witcher-purple": theme.colors.purple,
    "--witcher-blue": theme.colors.blue,
    "--witcher-blood": theme.colors.accent,
    "--witcher-glass": theme.colors.glass,
    "--witcher-glass-border": theme.colors.glassBorder,
    "--witcher-glass-hover": theme.colors.glassHover,

    // Tailwind v4 @theme inline variables
    "--color-witcher-gold": theme.colors.primary,
    "--color-witcher-gold-light": theme.colors.primaryLight,
    "--color-witcher-amber": theme.colors.secondary,
    "--color-witcher-dark": theme.colors.dark,
    "--color-witcher-darker": theme.colors.darker,
    "--color-witcher-purple": theme.colors.purple,
    "--color-witcher-blue": theme.colors.blue,
    "--color-witcher-blood": theme.colors.accent,
    "--color-witcher-glass": theme.colors.glass,
    "--color-witcher-glass-border": theme.colors.glassBorder,
    "--color-witcher-glass-hover": theme.colors.glassHover,
  };
}
