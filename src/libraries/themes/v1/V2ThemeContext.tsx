import React, { useMemo, useState } from 'react';
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

const context = {
  theme: defaultLightTheme,
  changeTheme: (_: ThemMode) => {},
};

export const ThemeContext = React.createContext(context);
export const useTheme = <T extends {}>() => React.useContext(ThemeContext) as ThemeInterface<T>;

export const ThemeProvider = <T extends {}>({ children, lightTheme, darkTheme, mode = 'light' }: ThemeProviderProps<T>) => {
  const [themeMode, setThemeMode] = useState<string>(mode);

  const initialTheme = useMemo(() => {
    if (themeMode === 'dark') {
      return darkTheme || defaultDarkTheme;
    }
    return lightTheme || defaultLightTheme;
  }, [themeMode, lightTheme, darkTheme]);

  const changeTheme = (mode: ThemMode) => setThemeMode(mode);

  return <ThemeContext.Provider value={{ theme: initialTheme!, changeTheme }}>{children}</ThemeContext.Provider>;
};
