import { StyleSheet, ViewStyle } from 'react-native';
import { Theme, ThemeDimensions, ThemeType } from '../../libraries/themes/v1/theme';
import { getVariant } from '../../utils';
import { ButtonRootContainerStylesInterface, ButtonVariationsType, GetButtonStylesProps } from './Button.types';

export const styles = StyleSheet.create({
  buttonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  iconButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5,
    aspectRatio: 1,
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export const buttonRootContainerStyles = ({ flex }: ButtonRootContainerStylesInterface) => ({
  ...(flex && { flex }),
});

export const containedButtonDefaultStyles = (spacing: ThemeDimensions['spacing']): ViewStyle => ({
  padding: spacing.lg,
  alignItems: 'center',
  borderRadius: 8,
  overflow: 'hidden',
});

export const textButtonDefaultStyles = (spacing: ThemeDimensions['spacing']): ViewStyle => ({
  ...containedButtonDefaultStyles(spacing),
  elevation: 0,
  backgroundColor: 'transparent',
});

export const outlinedButtonDefaultStyles = (colors: Theme, spacing: ThemeDimensions['spacing']): ViewStyle => ({
  ...textButtonDefaultStyles(spacing),
  borderWidth: 1,
  borderColor: colors.grey[400],
});

export const disabledStyles: ViewStyle = {
  opacity: 0.7,
};

export const buttonVariationStyles = (spacing: ThemeDimensions['spacing'], colors: Theme, variation: ButtonVariationsType) => {
  const variations: Record<ButtonVariationsType, ViewStyle> = {
    outlined: outlinedButtonDefaultStyles(colors, spacing),
    contained: containedButtonDefaultStyles(spacing),
    text: textButtonDefaultStyles(spacing),
    roundedIconButton: styles.iconButton,
    squareIconButton: {
      ...styles.iconButton,
      borderRadius: 5,
    },
  };
  return variations[variation];
};

export const getButtonStyles = ({
  themeColors,
  buttonColor,
  disabled,
  square,
  spacing,
  variation = 'contained',
}: GetButtonStylesProps): ViewStyle => {
  const isContainedVariation = variation === 'contained';

  return {
    ...(buttonColor && { backgroundColor: getVariant({ variant: buttonColor, colors: themeColors }) }),
    ...buttonVariationStyles(spacing, themeColors, variation),
    ...(!isContainedVariation && { borderColor: getVariant({ variant: buttonColor, colors: themeColors }) }),
    ...(disabled && disabledStyles),
    ...(square && { borderRadius: 0 }),
  };
};
