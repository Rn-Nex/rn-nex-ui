import _ from 'lodash';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { createContext, useContext, useContextSelector } from 'use-context-selector';
import { initialDarkTheme, initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import {
  ColorShades,
  CreateColorShadesInterface,
  CreateThemeDimensions,
  CreateThemeDimensionsReturnValues,
  CreateThemeReturnValues,
  CreateThemeType,
  ThemMode,
  ThemeDimensions,
  ThemeInterface,
  ThemeProviderProps,
  ThemeSpacingType,
  ThemeType,
} from './theme';

export const themeDimensions: ThemeDimensions = {
  font: font,
  spacing: spacing,
  latterSpacing: latterSpacing,
  lineHeight: lineHeight,
  fontWeight: fontWeight,
};

export const defaultLightTheme = {
  colors: initialLightTheme,
};

export const defaultDarkTheme = {
  colors: initialDarkTheme,
};

export const ThemeContext = createContext<ThemeInterface<ThemeType> | undefined>(undefined);

/**
 * Function to create color shades by merging default theme colors with custom shades
 * @returns ColorShades
 */
export const createColorShades = ({ shades, themePropertyName }: CreateColorShadesInterface): ColorShades => ({
  ...defaultLightTheme.colors[themePropertyName],
  ...shades,
});

/**
 * Function to create them dimensions by merging default dimensions with custom dimensions.
 * @returns CreateThemeDimensionsReturnValues
 */
export const createThemeDimensions = (dimensions: CreateThemeDimensions): CreateThemeDimensionsReturnValues =>
  _.merge({}, themeDimensions, dimensions);

/**
 * Function to create a theme based on the specified mode (light or dark) and additional theme configurations.
 * Merges the base theme (either light or dark) with the custom theme configurations
 * @param mode ThemMode
 * @param theme CreateThemeType
 * @returns CreateThemeReturnValues
 */
export const createTheme = function (mode: ThemMode, theme: CreateThemeType): CreateThemeReturnValues {
  const isLightTheme = mode === 'light';
  const generatedTheme = { mode, ..._.merge(isLightTheme ? defaultLightTheme : defaultDarkTheme, theme) };
  return generatedTheme;
};

export const ThemeProvider = <T extends Object>({
  children,
  lightTheme,
  darkTheme,
  dimensions,
  components = {},
}: ThemeProviderProps<T>) => {
  const colorScheme = useColorScheme();

  const initialTheme = useMemo(() => {
    if (colorScheme === 'dark') {
      return darkTheme ?? defaultDarkTheme;
    }
    return lightTheme ?? defaultLightTheme;
  }, [lightTheme, darkTheme, colorScheme]);

  const mergedTheme = useMemo(
    () => ({ ...initialTheme, ...(dimensions || themeDimensions) }),
    [initialTheme, dimensions, themeDimensions],
  );

  const themeValues: ThemeInterface<any> = useMemo(() => ({ theme: mergedTheme, components }), [mergedTheme, components]);

  return <ThemeContext.Provider value={themeValues}>{children}</ThemeContext.Provider>;
};

export const useTheme = <T extends object>(): ThemeInterface<T | any> => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('Theme context must be used within a ThemeProvider');
  }
  return context;
};

export const themeSelector = () => useContextSelector(ThemeContext, values => values?.theme);
export const themeFontSelector = () => useContextSelector(ThemeContext, values => values?.theme?.font);
export const themeModeSelector = () => useContextSelector(ThemeContext, values => values?.theme?.colors?.mode) as ThemMode;
export const themeTextConfigSelector = () => useContextSelector(ThemeContext, values => values?.components?.textProps);
