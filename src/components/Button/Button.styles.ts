import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { getVariant } from '../../utils';
import {
  ButtonContainerStylesInterface,
  ButtonRootContainerStylesInterface,
  ButtonVariationsType,
  GetButtonStylesProps,
} from './Button.types';

export const styles = StyleSheet.create({
  buttonGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  rootContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  baseButtonContainer: {
    flexDirection: 'row',
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

export const iconButtonDefaultStyles = (theme: ThemeType): ViewStyle => ({
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
});

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
    flex: 1,
  };
};

export const buttonContainerStyles = ({
  disableBaseButtonContainerFlex,
}: ButtonContainerStylesInterface): StyleProp<ViewStyle> => {
  return {
    ...(!disableBaseButtonContainerFlex && { flex: 1 }),
  };
};
