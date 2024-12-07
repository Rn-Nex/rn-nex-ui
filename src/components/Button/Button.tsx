import React, { useCallback } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { grey, themeButtonConfigSelector, themeColorsSelector, themeSpacingSelector } from '../../libraries';
import { getVariant } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Text } from '../Typography';
import { BaseButton } from './BaseButton';
import { buttonRootContainerStyles, getButtonStyles } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      children,
      style,
      disabled,
      loading,
      label,
      labelStyles,
      labelColor,
      baseButtonStyles,
      disableRipple,
      flex,
      disableScaleAnimation = false,
      scaleAnimationValue = 0.99,
      baseButtonContainerStyle,
      rippleEdge,
      rippleProps,
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = themeColorsSelector();
    const themeSpacing = themeSpacingSelector();
    const buttonThemeConfig = themeButtonConfigSelector();
    const isContainedButton = variation === 'contained';

    if (!themeColors) {
      throw new Error(
        'Theme colors are unavailable. Please ensure the ThemeProvider is correctly wrapped around the application.',
      );
    }
    if (!themeSpacing) {
      throw new Error(
        'Theme spacing are unavailable. Please ensure the ThemeProvider is correctly wrapped around the application.',
      );
    }

    const shouldDisableScaleAnimation = buttonThemeConfig?.disableScaleAnimation ?? disableScaleAnimation;
    const applyScaleAnimationValue = buttonThemeConfig?.scaleAnimationValue ?? scaleAnimationValue;
    const applyBaseButtonContainerStyles = buttonThemeConfig?.baseButtonContainerStyle ?? baseButtonContainerStyle;
    const applyRippleProps = buttonThemeConfig?.rippleProps ?? rippleProps;

    const renderChild = useCallback(() => {
      if (loading) {
        return <ActivityIndicator />;
      } else if (children) {
        return children;
      } else {
        let textColor: ColorValue;

        if (buttonThemeConfig?.labelColor) {
          textColor = buttonThemeConfig.labelColor;
        } else if (labelColor) textColor = labelColor;
        else if (isContainedButton) {
          textColor = grey[50];
        } else {
          textColor = getVariant({ variant: buttonColor, colors: themeColors });
        }

        return (
          <Text style={StyleSheet.flatten([{ color: textColor }, buttonThemeConfig?.labelStyles ?? labelStyles])}>{label}</Text>
        );
      }
    }, [
      loading,
      children,
      labelStyles,
      themeColors,
      variation,
      buttonColor,
      labelColor,
      label,
      buttonThemeConfig?.labelColor,
      buttonThemeConfig?.labelStyles,
    ]);

    return (
      <View style={StyleSheet.flatten([buttonRootContainerStyles({ flex }), style])} ref={ref}>
        <BaseButton
          disabled={loading || disabled}
          style={StyleSheet.flatten([
            getButtonStyles({
              spacing: themeSpacing,
              themeColors,
              variation,
              disabled,
              buttonColor,
              square: buttonThemeConfig?.square ?? square,
            }),
            buttonThemeConfig?.baseButtonStyles ?? baseButtonStyles,
          ])}
          disableRipple={buttonThemeConfig?.disableRipple ?? disableRipple}
          disableScaleAnimation={shouldDisableScaleAnimation}
          scaleAnimationValue={applyScaleAnimationValue}
          rippleEdge={buttonThemeConfig?.rippleEdge ?? rippleEdge}
          baseButtonContainerStyle={applyBaseButtonContainerStyles}
          rippleProps={applyRippleProps}
          {...props}>
          {renderChild()}
        </BaseButton>
      </View>
    );
  },
);

Button.displayName = 'Button';
