import React from 'react';
import { ColorsInterface, ThemeInterface, ThemeModes, ThemeProviderProps } from './theme';
import { colors, font, fontWeight, latterSpacing, lineHeight, spacing } from './v1';

export const DefaultTheme = {
   colors: colors,
   font: font,
   spacing: spacing,
   latterSpacing: latterSpacing,
   lineHeight: lineHeight,
   fontWeight: fontWeight,
};

function getColorPalette(mode: ThemeModes, colors: ColorsInterface['colors']): ColorsInterface['colors'] {
   const objectEntries = Object.entries(colors);
   const colorPalette = {} as ColorsInterface['colors'];
   if (mode === 'Light') return colors;
   for (let [item, value] of objectEntries) {
      const colorKey = item as keyof typeof colors;
      colorPalette[colorKey] = {
         main: value.main,
         light: value.dark,
         dark: value.light,
      };
   }
   return colorPalette;
}

const colorTheme = function (mode: ThemeModes, theme: ThemeInterface) {
   const colorPalette = getColorPalette(mode || 'Light', theme.colors);

   return {
      ...theme,
      colors: { ...colorPalette },
   };
};

export const ThemeContext = React.createContext<ThemeInterface>(DefaultTheme);
export const useTheme = <T extends {}>(): T & ThemeInterface => React.useContext(ThemeContext) as T & ThemeInterface;

export const ThemeProvider = <T extends {}>({ children, theme, mode = 'Light' }: ThemeProviderProps<T>) => {
   const customTheme = theme ? colorTheme(mode, theme) : colorTheme(mode, DefaultTheme);
   return <ThemeContext.Provider value={customTheme}>{children}</ThemeContext.Provider>;
};
