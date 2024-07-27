import React, { useCallback, useContext, useMemo, useState } from 'react';
import { initialDarkTheme, initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import { ThemMode, ThemeInterface, ThemeProviderProps } from './theme';

export const themeSpaces = {
  font: font,
  spacing: spacing,
  latterSpacing: latterSpacing,
  lineHeight: lineHeight,
  fontWeight: fontWeight,
};

export const defaultLightTheme = {
  colors: initialLightTheme,
  ...themeSpaces,
};

export const defaultDarkTheme = {
  colors: initialDarkTheme,
  ...themeSpaces,
};

export const ThemeContext = React.createContext<ThemeInterface<any> | undefined>(undefined);

export const ThemeProvider = <T extends Object>({ children, lightTheme, darkTheme, mode = 'light' }: ThemeProviderProps<T>) => {
  const [themeMode, setThemeMode] = useState<string>(mode);

  const initialTheme = useMemo(() => {
    if (themeMode === 'dark') {
      return darkTheme || defaultDarkTheme;
    }
    return lightTheme || defaultLightTheme;
  }, [themeMode, lightTheme, darkTheme, mode]);

  const changeTheme = useCallback((mode: ThemMode) => setThemeMode(mode), []);

  return <ThemeContext.Provider value={{ theme: initialTheme, changeTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = <T extends {}>(): ThemeInterface<T> => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Theme context must be used within a ThemeProvider');
  }
  return context;
};
