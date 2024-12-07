import { TextProps, TextVariationConfigInterface } from '../../../components/types';
import { initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';
import { themeDimensions } from './V2ThemeContext';

/** Interface representing a set of color shades. */
export interface ColorShades {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

/**
 * Type representing the theme, based on the initial light theme.
 */
export type Theme = typeof initialLightTheme;
export type ThemeKeys = keyof Omit<Theme, 'mode'>;

/**
 * Enum-like type representing theme modes.
 * Can be either 'dark' or 'light'.
 */
export type ThemMode = 'dark' | 'light';

export type ThemeDimensions = {
  font: typeof font;
  spacing: typeof spacing;
  latterSpacing: typeof latterSpacing;
  lineHeight: typeof lineHeight;
  fontWeight: typeof fontWeight;
};

export interface RequiredTheme {
  theme: ThemeType;
}

/**
 * Type representing the overall theme structure, including colors and various design metrics.
 */
export type ThemeType = {
  mode: ThemMode;
  colors: Theme;
} & ThemeDimensions;

export type ThemeSpacingType = typeof themeDimensions;

export type InnerPartial<T> = {
  [K in keyof T]?: T[k] extends object ? Partial<T[K]> : T[K];
};

export type CreateThemeType = Pick<InnerPartial<ThemeType>, 'colors'>;
export type CreateThemeReturnValues = Pick<ThemeType, 'colors' | 'mode'>;
export type CreateThemeDimensions = InnerPartial<ThemeDimensions>;
export type CreateThemeDimensionsReturnValues = ThemeDimensions & InnerPartial<ThemeDimensions>;
export type CreateColorShadesInterface = { shades: Partial<ColorShades>; themePropertyName: ThemeKeys };

export interface ThemeComponentConfig {
  textProps: Pick<TextProps, 'gutterBottomSpace' | 'maxLength' | 'errorColor' | 'activeColor' | 'color'> &
    TextVariationConfigInterface;
}

export type WithThemeComponentConfig<K extends keyof ThemeComponentConfig, T> = T & {
  themeComponentConfig?: ThemeComponentConfig[K];
};

/**
 * Interface representing the theme context, including the current theme and a function to change the theme mode.
 */
export interface ThemeInterface<T extends object> {
  /**
   * The current theme, extended with any additional properties
   */
  theme: ThemeType & T;
  /**
   * Component configurations
   */
  components?: InnerPartial<ThemeComponentConfig>;
}

/**
 * Interface representing the theme context type.
 */
export interface ThemeContextType {
  theme: ThemeInterface;
}

export interface ThemeProviderProps<T extends Object> {
  /**
   * Child components to be wrapped by the provider
   */
  children: React.ReactNode;
  /**
   * Optional light theme, extended with additional properties
   */
  lightTheme?: Pick<ThemeType, 'mode' | 'colors'> & T;
  /**
   * Optional dark theme, extended with additional properties
   */
  darkTheme?: Pick<ThemeType, 'mode' | 'colors'> & T;
  /**
   * Optional theme dimensions values
   */
  dimensions?: ThemeDimensions;
  /**
   * Component configurations
   */
  components?: InnerPartial<ThemeComponentConfig>;
}
