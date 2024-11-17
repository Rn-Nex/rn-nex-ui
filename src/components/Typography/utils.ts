import { TextStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { generateElementStyles, gutter } from '../../utils';
import { TextStylesArgs, TextVariation } from './Text.types';

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
  color,
  gutterBottomSpace,
}: TextStylesArgs): TextStyle => {
  const {
    colors: { mode, secondary, red },
  } = theme;

  let baseColor: string | undefined = undefined;

  if (textThemeMode === 'light' || (!textThemeMode && mode === 'dark')) {
    baseColor = 'white';
  } else if (textThemeMode === 'dark') {
    baseColor = 'black';
  }

  const textColor = color ?? baseColor;

  return {
    ...(textColor ? { color: textColor } : {}),
    ...(variation ? textFontVariation(variation, theme) : {}),
    ...(gutterBottom ? gutter('marginBottom', gutterBottomSpace) : {}),
    ...(isActive ? { color: activeColor ?? secondary[200] } : {}),
    ...(disabled ? { opacity: 0.3 } : {}),
    ...(error ? { color: errorColor ?? red[600] } : {}),
    ...(sx ? generateElementStyles(sx) : {}),
  };
};
