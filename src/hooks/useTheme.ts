'use client';

import { useState, useEffect, useCallback } from 'react';
import { getTheme, getThemeCSSVariables, DEFAULT_THEME_ID } from '@/lib/themes';
import type { WitcherTheme } from '@/lib/themes';

const STORAGE_KEY = 'witcher-theme';

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME_ID;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && typeof stored === 'string') return stored;
    } catch {
      // localStorage may be unavailable
    }
    return DEFAULT_THEME_ID;
  });

  // Apply theme CSS variables to <html> element whenever themeId changes
  useEffect(() => {
    const theme = getTheme(themeId);
    const vars = getThemeCSSVariables(theme);
    const html = document.documentElement;

    Object.entries(vars).forEach(([key, value]) => {
      html.style.setProperty(key, value);
    });

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, themeId);
    } catch {
      // ignore
    }
  }, [themeId]);

  const switchTheme = useCallback((id: string) => {
    setThemeId(id);
  }, []);

  const currentTheme: WitcherTheme = getTheme(themeId);

  return { themeId, currentTheme, switchTheme };
}
