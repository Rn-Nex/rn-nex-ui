import { ColorValue } from 'react-native';
import { SpacingStyle, StylePalette } from '../libraries/style/styleTypes';
import { ThemeType } from '../libraries/themes/v1/theme';

export const OFFSET = 20;
export const WRAPPER_BOTTOM_OFFSET = 50;

export type VariantTypes = 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'grey' | 'lightGrey';
export interface DefaultVariationOptions {
  color?: ColorValue;
}
export type VariationThemeConfig<T> = Partial<Record<VariantTypes, T | undefined>>;
export interface GetVariantArgs<T> {
  colors: ThemeType['colors'];
  variant?: VariantTypes;
  config?: VariationThemeConfig<DefaultVariationOptions & T>;
}

export const getVariant = <T>({ variant, colors, config }: GetVariantArgs<T>): ColorValue | string => {
  if (variant === 'primary') {
    return config?.primary?.color ?? colors.primary[500];
  } else if (variant === 'secondary') {
    return config?.secondary?.color ?? colors.secondary[500];
  } else if (variant === 'error') {
    return config?.error?.color ?? colors.red[500];
  } else if (variant === 'info') {
    return config?.info?.color ?? colors.lightBlue[500];
  } else if (variant === 'success') {
    return config?.success?.color ?? colors.green[500];
  } else if (variant === 'warning') {
    return config?.warning?.color ?? colors.yellow[500];
  } else if (variant === 'grey') {
    return config?.grey?.color ?? colors.grey[500];
  } else if (variant === 'lightGrey') {
    return config?.lightGrey?.color ?? colors.grey[200];
  }
  return colors.secondary[500];
};

export const maxLength = function (text: string, maxLengthNumber: number): string {
  return text.length > maxLengthNumber ? `${text.slice(0, maxLengthNumber)}...` : text;
};

export const gutter = <T extends keyof SpacingStyle, U extends StylePalette[T]>(property: T, value: U): SpacingStyle => {
  return { [property]: value };
};
