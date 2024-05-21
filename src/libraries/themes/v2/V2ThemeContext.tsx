import React, { useMemo } from 'react';
import { initialDarkTheme, initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import { ThemeInterface, ThemeProviderProps } from './theme';

export const DefaultTheme = {
  theme: {
    colors: initialLightTheme,
    font: font,
    spacing: spacing,
    latterSpacing: latterSpacing,
    lineHeight: lineHeight,
    fontWeight: fontWeight,
  },
};

export const ThemeContext = React.createContext<ThemeInterface>(DefaultTheme);
export const useTheme = <T extends {}>(): T & ThemeInterface => React.useContext(ThemeContext) as T & ThemeInterface;

export const ThemeProvider = ({ children, theme, mode = 'light' }: ThemeProviderProps) => {
  const initialTheme = useMemo(() => {
    if (mode === 'dark') {
      return { theme: { ...DefaultTheme.theme, colors: initialDarkTheme } };
    }
    return DefaultTheme;
  }, [mode, theme]);

  return <ThemeContext.Provider value={initialTheme}>{children}</ThemeContext.Provider>;
};
