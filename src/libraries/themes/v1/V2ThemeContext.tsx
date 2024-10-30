import _ from 'lodash';
import React, { useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { initialDarkTheme, initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import { ColorShades, CreateColorShadesInterface, CreateThemeType, ThemMode, ThemeInterface, ThemeProviderProps } from './theme';

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

/**
 * Function to create color shades by merging default theme colors with custom shades
 * @returns ColorShades
 */
export const createColorShades = ({ shades, themePropertyName }: CreateColorShadesInterface): ColorShades => {
  return { ...defaultLightTheme.colors[themePropertyName], ...shades };
};

/**
 * Function to create a theme based on the specified mode (light or dark) and additional theme configurations.
 * Merges the base theme (either light or dark) with the custom theme configurations
 * @param mode ThemMode
 * @param theme CreateThemeType
 * @returns ThemeInterface
 */
export const createTheme = function (mode: ThemMode, theme: CreateThemeType) {
  const isLightTheme = mode === 'light';
  const generatedTheme = { mode, ..._.merge(isLightTheme ? defaultLightTheme : defaultDarkTheme, theme) };
  return generatedTheme;
};

export const ThemeProvider = <T extends Object>({ children, lightTheme, darkTheme }: ThemeProviderProps<T>) => {
  const colorScheme = useColorScheme();

  const initialTheme = useMemo(() => {
    if (colorScheme === 'dark') {
      return darkTheme || defaultDarkTheme;
    }
    return lightTheme || defaultLightTheme;
  }, [lightTheme, darkTheme, colorScheme]);

  return <ThemeContext.Provider value={{ theme: initialTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = <T extends {}>(): ThemeInterface<T> => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Theme context must be used within a ThemeProvider');
  }
  return context;
};
