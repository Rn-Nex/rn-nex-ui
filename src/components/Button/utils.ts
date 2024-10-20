import { ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { ButtonColorTypes, ButtonVariationsType, GetButtonStylesProps } from './Button.types';

export const containedButtonDefaultStyles = (theme: ThemeType): ViewStyle => {
  const baseStyles: ViewStyle = {
    backgroundColor: theme.colors.secondary[400],
    padding: theme.spacing.lg,
    elevation: 5,
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  };

  return baseStyles;
};

export const textButtonDefaultStyles = (theme: ThemeType): ViewStyle => {
  const baseStyles: ViewStyle = {
    ...containedButtonDefaultStyles(theme),
    backgroundColor: 'transparent',
  };

  return baseStyles;
};

export const outlinedButtonDefaultStyles = (theme: ThemeType): ViewStyle => {
  const baseStyles: ViewStyle = {
    ...textButtonDefaultStyles(theme),
    borderWidth: 1,
    borderColor: theme.colors.grey[400],
  };

  return baseStyles;
};

export const disabledStyles: ViewStyle = {
  opacity: 0.7,
};

export const iconButtonDefaultStyles = (theme: ThemeType): ViewStyle => {
  const baseStyles: ViewStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    minWidth: theme.spacing.xl,
    minHeight: theme.spacing.xl,
    borderRadius: 100,
    padding: 5,
    overflow: 'hidden',
  };

  return baseStyles;
};

export const buttonVariationStyles = (theme: ThemeType, variation: ButtonVariationsType) => {
  const variations: Record<ButtonVariationsType, ViewStyle> = {
    outlined: outlinedButtonDefaultStyles(theme),
    contained: containedButtonDefaultStyles(theme),
    text: textButtonDefaultStyles(theme),
    roundedIconButton: iconButtonDefaultStyles(theme),
    squareIconButton: {
      ...iconButtonDefaultStyles(theme),
      borderRadius: 5,
    },
  };
  return variations[variation];
};

function getButtonBackgroundColor(color: ButtonColorTypes, theme: ThemeType): Pick<ViewStyle, 'backgroundColor'> {
  switch (color) {
    case 'primary':
      return { backgroundColor: theme.colors.primary[400] };
    case 'secondary':
      return { backgroundColor: theme.colors.secondary[400] };
    case 'success':
      return { backgroundColor: theme.colors.green[400] };
    case 'error':
      return { backgroundColor: theme.colors.red[500] };
    case 'info':
      return { backgroundColor: theme.colors.lightBlue[500] };
    case 'warning':
      return { backgroundColor: theme.colors.yellow[400] };
    default:
      return { backgroundColor: 'transparent' };
  }
}

export const getButtonStyles = (args: GetButtonStylesProps): ViewStyle => {
  let style = buttonVariationStyles(args.theme, args?.variation || 'contained');

  if (args?.fullWidth) {
    style.width = '100%';
  }

  if (args?.disableElevation) {
    style.elevation = 0;
  }

  if (args?.buttonColor) {
    style = { ...style, ...getButtonBackgroundColor(args.buttonColor, args.theme) };
  }

  if (args?.disabled) {
    return { ...style, ...disabledStyles };
  }

  return style;
};
