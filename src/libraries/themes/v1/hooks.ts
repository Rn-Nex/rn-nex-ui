import { useContextSelector } from 'use-context-selector';
import { ThemeContext } from './V2ThemeContext';
import { ThemMode } from './theme';

export const useThemeFontSelector = () => useContextSelector(ThemeContext, values => values?.theme?.font);
export const useThemeModeSelector = () => {
  const themeMode = useContextSelector(ThemeContext, values => values?.theme?.colors?.mode) as ThemMode | undefined;
  if (!themeMode)
    throw new Error('Theme mode are unavailable. Please ensure the ThemeProvider is correctly wrapped around the application.');
  return themeMode;
};
export const useThemeColorsSelector = () => {
  const themeColors = useContextSelector(ThemeContext, values => values?.theme?.colors);
  if (!themeColors) {
    throw new Error('Theme colors are unavailable. Please ensure the ThemeProvider is correctly wrapped around the application.');
  }
  return themeColors;
};
export const useThemeSpacingSelector = () => {
  const themeSpacing = useContextSelector(ThemeContext, values => values?.theme?.spacing);
  if (!themeSpacing) {
    throw new Error(
      'Theme spacing are unavailable. Please ensure the ThemeProvider is correctly wrapped around the application.',
    );
  }
  return themeSpacing;
};

export const useThemeTextConfigSelector = () => useContextSelector(ThemeContext, values => values?.components?.textProps);

export const useThemeBadgeConfigSelector = () => useContextSelector(ThemeContext, values => values?.components?.badgeProps);

export const useThemeButtonConfigSelector = () => useContextSelector(ThemeContext, values => values?.components?.buttonProps);
export const useThemeIconButtonConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.iconButtonProps);
};
export const useThemeButtonGroupConfigSelector = () => {
  return useContextSelector(ThemeContext, values => values?.components?.buttonGroupProps);
};
