import { StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { getVariant } from '../../utils';
import { ButtonRootContainerStylesInterface, ButtonVariationsType, GetButtonStylesProps } from './Button.types';

export const styles = StyleSheet.create({
  buttonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    minWidth: 100,
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

export const containedButtonDefaultStyles = (theme: ThemeType): ViewStyle => ({
  padding: theme.spacing.lg,
  alignItems: 'center',
  borderRadius: 8,
  overflow: 'hidden',
});

export const textButtonDefaultStyles = (theme: ThemeType): ViewStyle => ({
  ...containedButtonDefaultStyles(theme),
  elevation: 0,
  backgroundColor: 'transparent',
});

export const outlinedButtonDefaultStyles = (theme: ThemeType): ViewStyle => ({
  ...textButtonDefaultStyles(theme),
  borderWidth: 1,
  borderColor: theme.colors.grey[400],
});

export const disabledStyles: ViewStyle = {
  opacity: 0.7,
};

export const buttonVariationStyles = (theme: ThemeType, variation: ButtonVariationsType) => {
  const variations: Record<ButtonVariationsType, ViewStyle> = {
    outlined: outlinedButtonDefaultStyles(theme),
    contained: containedButtonDefaultStyles(theme),
    text: textButtonDefaultStyles(theme),
    roundedIconButton: styles.iconButton,
    squareIconButton: {
      ...styles.iconButton,
      borderRadius: 5,
    },
  };
  return variations[variation];
};

export const getButtonStyles = ({
  theme,
  buttonColor,
  disabled,
  square,
  variation = 'contained',
}: GetButtonStylesProps): ViewStyle => {
  const isContainedVariation = variation === 'contained';

  return {
    ...(buttonColor && { backgroundColor: getVariant({ variant: buttonColor, theme }) }),
    ...buttonVariationStyles(theme, variation),
    ...(!isContainedVariation && { borderColor: getVariant({ variant: buttonColor, theme }) }),
    ...(disabled && disabledStyles),
    ...(square && { borderRadius: 0 }),
  };
};
