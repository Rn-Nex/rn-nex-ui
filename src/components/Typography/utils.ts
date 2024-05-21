import { StylePalette } from '../../libraries/style/styleTypes';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { TextFontVariation, TextGutter, TextVariation } from './TextTypes';

export const textFontVariation = function (variation: TextVariation, theme: ThemeType): TextFontVariation {
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
