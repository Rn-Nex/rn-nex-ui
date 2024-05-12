import { ViewStyle } from 'react-native';
import { colors, spacing } from '../../libraries';
import { ButtonColorTypes, ButtonVariationsType, GetButtonStylesProps } from './ButtonTypes';

export const containedButtonDefaultStyles: ViewStyle = {
  backgroundColor: colors.primary.light,
  padding: spacing.lg,
  elevation: 5,
  alignItems: 'center',
  marginTop: 20,
  borderRadius: 8,
  overflow: 'hidden',
};

export const textButtonDefaultStyles: ViewStyle = {
  ...containedButtonDefaultStyles,
  backgroundColor: 'transparent',
};

export const outlinedButtonDefaultStyles: ViewStyle = {
  ...textButtonDefaultStyles,
  borderWidth: 1,
  borderColor: colors.primary.light,
};

export const disabledStyles: ViewStyle = {
  opacity: 0.7,
};

export const iconButtonDefaultStyles: ViewStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  width: spacing.xl,
  height: spacing.xl,
  borderRadius: 100,
  overflow: 'hidden',
};

export const squareIconButtonStyles: ViewStyle = {
  ...iconButtonDefaultStyles,
  borderRadius: 5,
};

export const buttonVariationStyles: Record<ButtonVariationsType, ViewStyle> = {
  outlined: outlinedButtonDefaultStyles,
  contained: containedButtonDefaultStyles,
  text: textButtonDefaultStyles,
  roundedIconButton: iconButtonDefaultStyles,
  squareIconButton: squareIconButtonStyles,
};

function getButtonBackgroundColor(color: ButtonColorTypes): Pick<ViewStyle, 'backgroundColor'> {
  switch (color) {
    case 'primary':
      return { backgroundColor: colors.primary.light };
    case 'secondary':
      return { backgroundColor: colors.secondary.light };
    case 'success':
      return { backgroundColor: colors.success.light };
    case 'error':
      return { backgroundColor: colors.error.light };
    case 'info':
      return { backgroundColor: colors.info.light };
    case 'warning':
      return { backgroundColor: colors.yellow.light };
    default:
      return { backgroundColor: 'transparent' };
  }
}

export const getButtonStyles = (args: GetButtonStylesProps): ViewStyle => {
  let style = buttonVariationStyles[args?.variation || 'contained'];

  if (args?.fullWidth) {
    style.width = '100%';
  }

  if (args?.disableElevation) {
    style.elevation = 0;
  }

  if (args?.buttonColor) {
    style = { ...style, ...getButtonBackgroundColor(args.buttonColor) };
  }

  if (args?.disabled) {
    return { ...style, ...disabledStyles };
  }

  return style;
};
