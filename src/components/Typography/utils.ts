import { TextStyle } from 'react-native';
import { StylePalette } from '../../libraries/style/styleTypes';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { TextGutter, TextStylesArgs, TextVariation } from './Text.types';
import { generateElementStyles } from '../../utils';

export const textFontVariation = function (variation: TextVariation, theme: ThemeType) {
  switch (variation) {
    case 'body1':
      return { fontSize: theme.font['text-2xl'] };
    case 'body2':
      return { fontSize: theme.font['text-3xl'] };
    case 'caption':
      return { fontSize: theme.font['text-4xl'] };
    case 'h1':
      return { fontSize: theme.font['text-xl'] };
    case 'h2':
      return { fontSize: theme.font['text-lg'] };
    case 'h3':
      return { fontSize: theme.font['text-md'] };
    case 'h4':
      return { fontSize: theme.font['text-sm'] };
    case 'h5':
      return { fontSize: theme.font['text-xs'] };
    case 'h6':
      return { fontSize: theme.font['text-xxs'] };
    default:
      return { fontSize: theme.font['text-sm'] };
  }
};

export const gutter = <T extends keyof TextGutter, U extends StylePalette[T]>(property: T, value: U): TextGutter => {
  return { [property]: value };
};

export const maxLength = function (text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const generateTextStyles = ({
  theme,
  variation,
  gutterBottom,
  isActive,
  activeColor,
  disabled,
  error,
  errorColor,
  mode: textThemeMode,
  sx,
}: TextStylesArgs): TextStyle => {
  let styles: TextStyle = {};

  const {
    colors: { mode },
  } = theme;

  if (mode === 'dark' && !textThemeMode) {
    styles = { ...styles, color: 'white' };
  } else if (textThemeMode === 'light') {
    styles = { ...styles, color: 'white' };
  } else if (textThemeMode === 'dark') {
    styles = { ...styles, color: 'black' };
  }

  if (variation) {
    styles = { ...styles, ...textFontVariation(variation, theme) };
  }

  if (gutterBottom) {
    styles = { ...styles, ...gutter('marginBottom', 10) };
  }

  if (isActive) {
    styles = { ...styles, color: activeColor || theme.colors.secondary[200] };
  }

  if (disabled) {
    styles = { ...styles, opacity: 0.3 };
  }

  if (error) {
    styles = { ...styles, color: errorColor || theme.colors.red[600] };
  }

  if (sx) {
    styles = { ...styles, ...generateElementStyles(sx) };
  }

  return styles;
};
