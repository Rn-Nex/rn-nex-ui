import { initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';

/**
 * Interface representing a set of color shades.
 */
export interface ColorShades {
  /**
   * Very light shade
   */
  50: string;
  /**
   * Light shade
   */
  100: string;
  /**
   * Lighter shade
   */
  200: string;
  /**
   * Light-medium shade
   */
  300: string;
  /**
   * Medium shade
   */
  400: string;
  /**
   * Medium-dark shade
   */
  500: string;
  /**
   * Dark shade
   */
  600: string;
  /**
   * Darker shade
   */
  700: string;
  /**
   * Very dark shade
   */
  800: string;
  /**
   * Deep dark shade
   */
  900: string;
}

/**
 * Type representing the theme, based on the initial light theme.
 */
export type Theme = typeof initialLightTheme;

/**
 * Enum-like type representing theme modes.
 * Can be either 'dark' or 'light'.
 */
export type ThemMode = 'dark' | 'light';

/**
 * Type representing the overall theme structure, including colors and various design metrics.
 */
export type ThemeType = {
  mode: ThemMode;
  colors: Theme;
  font: {
    [key in keyof typeof font]: number;
  };
  spacing: {
    [key in keyof typeof spacing]: number;
  };
  latterSpacing: {
    [key in keyof typeof latterSpacing]: number;
  };
  lineHeight: {
    [key in keyof typeof lineHeight]: number;
  };
  fontWeight: {
    [key in keyof typeof fontWeight]: number;
  };
};

/**
 * Interface representing the theme context, including the current theme and a function to change the theme mode.
 */
export interface ThemeInterface<T extends {} = {}> {
  /**
   * The current theme, extended with any additional properties
   */
  theme: ThemeType & T;
  /**
   * Function to change the theme mode
   */
  changeTheme: (mode: ThemMode) => void;
}

/**
 * Interface representing the theme context type.
 */
export interface ThemeContextType {
  theme: ThemeInterface;
}

/**
 * Interface for the ThemeProvider component props.
 */
export interface ThemeProviderProps<T extends Object> {
  /**
   * Child components to be wrapped by the provider
   */
  children: React.ReactNode;
  /**
   * Optional light theme, extended with additional properties
   */
  lightTheme?: ThemeType & T;
  /**
   * Optional dark theme, extended with additional properties
   */
  darkTheme?: ThemeType & T;
  /**
   * Initial theme mode, defaults to 'light'
   */
  mode?: ThemMode;
}
