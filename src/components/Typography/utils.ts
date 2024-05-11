import { font } from '../../libraries';
import { StylePalette } from '../../libraries/style/styleTypes';
import { TextFontVariation, TextGutter, TextVariation } from './TextTypes';

export const textFontVariation = function (variation: TextVariation): TextFontVariation {
  switch (variation) {
    case 'body1':
      return { fontSize: font['text-2xl'] };
    case 'body2':
      return { fontSize: font['text-3xl'] };
    case 'caption':
      return { fontSize: font['text-4xl'] };
    case 'h1':
      return { fontSize: font['text-xl'] };
    case 'h2':
      return { fontSize: font['text-lg'] };
    case 'h3':
      return { fontSize: font['text-md'] };
    case 'h4':
      return { fontSize: font['text-sm'] };
    case 'h5':
      return { fontSize: font['text-xs'] };
    case 'h6':
      return { fontSize: font['text-xxs'] };
    default:
      return { fontSize: font['text-sm'] };
  }
};

export const gutter = <T extends keyof TextGutter, U extends StylePalette[T]>(property: T, value: U): TextGutter => {
  return { [property]: value };
};

export const maxLength = function (text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};
