import { SpacingStyle, StylePalette } from '../libraries/style/styleTypes';
import { ThemeType } from '../libraries/themes/v1/theme';

export const OFFSET = 20;
export const WRAPPER_BOTTOM_OFFSET = 50;

export type VariantTypes = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
export interface GetVariantArgs {
  theme: ThemeType;
  variant?: VariantTypes;
}

export const getVariant = ({ variant, theme }: GetVariantArgs): string => {
  if (variant === 'primary') return theme.colors.primary[500];
  else if (variant === 'secondary') return theme.colors.secondary[500];
  else if (variant === 'error') return theme.colors.red[500];
  else if (variant === 'info') return theme.colors.lightBlue[500];
  else if (variant === 'success') return theme.colors.green[500];
  else if (variant === 'warning') return theme.colors.yellow[500];
  return theme.colors.secondary[500];
};

export const maxLength = function (text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const gutter = <T extends keyof SpacingStyle, U extends StylePalette[T]>(property: T, value: U): SpacingStyle => {
  return { [property]: value };
};
