import React from 'react';
import {
   colors,
   font,
   fontWeight,
   latterSpacing,
   lineHeight,
   spacing,
} from './v1';

/**
 * Represents the structure of a single color with optional light and dark variants.
 */
export interface ColorInterface {
   /**
    * Optional color value for light theme
    */
   light?: string;
   /**
    * Main color value
    */
   main: string;
   /**
    * Optional color value for dark theme
    */
   dark?: string;
}

/**
 * Represents a collection of colors mapped to their respective keys. Key-value pairs of color
 * names and ColorInterface
 */
export interface ColorsInterface {
   colors: {
      [key in keyof typeof colors]: ColorInterface;
   };
}

/**
 * Represents a complete theme, including colors, font styles, spacing, etc.
 */
export interface ThemeInterface extends ColorsInterface {
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
}

/**
 * Type for specifying theme modes (Light or Dark).
 */
export type ThemeModes = 'Light' | 'Dark';

/**
 * Props for the ThemeProvider component, allowing customization of theme and mode.
 */
export interface ThemeProviderProps<T extends {}> {
   children: React.ReactNode;
   /**
    * Optional custom theme object
    */
   theme?: ThemeInterface & T;
   /**
    * Optional mode for specifying Light or Dark theme
    */
   mode?: ThemeModes;
}
