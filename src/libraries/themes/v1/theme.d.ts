import { initialLightTheme } from './colors';
import { font, fontWeight, latterSpacing, lineHeight, spacing } from './sizes';

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

export type Theme = typeof initialLightTheme;
export type ThemMode = 'dark' | 'light';

export type ThemeType = {
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

export interface ThemeInterface<T> {
  theme: ThemeType & T;
  changeTheme: (mode: ThemMode) => void;
}

export interface ThemeContextType {
  theme: ThemeInterface;
}

export interface ThemeProviderProps<T extends {}> {
  children: React.ReactNode;
  lightTheme?: ThemeType & T;
  darkTheme?: ThemeType & T;
  mode?: ThemMode;
}
