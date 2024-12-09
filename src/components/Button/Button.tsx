import React, { useCallback } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { grey, useThemeButtonConfigSelector, useThemeColorsSelector, useThemeSpacingSelector } from '../../libraries';
import { getVariant } from '../../utils';
import { ActivityIndicator } from '../ActivityIndicator';
import { Box } from '../Box';
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
      sx,
      baseButtonSx,
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const themeSpacing = useThemeSpacingSelector();
    const buttonThemeConfig = useThemeButtonConfigSelector();
    const isContainedButton = variation === 'contained';

    const {
      disableScaleAnimation: shouldDisableScaleAnimation = disableScaleAnimation,
      scaleAnimationValue: themeScaleAnimationValue = scaleAnimationValue,
      baseButtonContainerStyle: themeBaseButtonContainerStyles = baseButtonContainerStyle,
      rippleProps: themeRippleProps = rippleProps,
      square: themeSquare = square,
      baseButtonStyles: themeBaseButtonStyles = baseButtonStyles,
      rippleEdge: themeRippleEdge = rippleEdge,
      disableRipple: shouldDisableRipple = disableRipple,
      sx: themeButtonSx = sx,
      baseButtonSx: themeBaseButtonSx = baseButtonSx,
      style: themeStyle = style,
    } = buttonThemeConfig || {};

    const renderChild = useCallback(() => {
      if (loading) {
        return <ActivityIndicator />;
      } else if (children) {
        return children;
      } else {
        let textColor: ColorValue;

        if (buttonThemeConfig?.labelColor) {
          textColor = buttonThemeConfig.labelColor;
        } else if (labelColor) {
          textColor = labelColor;
        } else if (isContainedButton) {
          textColor = grey[50];
        } else {
          textColor = getVariant({ variant: buttonColor, colors: themeColors });
        }

        return (
          <Text style={StyleSheet.flatten([{ color: textColor }, buttonThemeConfig?.labelStyles ?? labelStyles])}>{label}</Text>
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Box style={StyleSheet.flatten([buttonRootContainerStyles({ flex }), themeStyle])} sx={themeButtonSx} ref={ref}>
        <BaseButton
          disabled={loading || disabled}
          style={StyleSheet.flatten([
            getButtonStyles({
              spacing: themeSpacing,
              themeColors,
              variation,
              disabled,
              buttonColor,
              square: themeSquare,
            }),
            themeBaseButtonStyles,
          ])}
          disableRipple={shouldDisableRipple}
          disableScaleAnimation={shouldDisableScaleAnimation}
          scaleAnimationValue={themeScaleAnimationValue}
          rippleEdge={themeRippleEdge}
          baseButtonContainerStyle={themeBaseButtonContainerStyles}
          rippleProps={themeRippleProps}
          sx={themeBaseButtonSx}
          {...props}>
          {renderChild()}
        </BaseButton>
      </Box>
    );
  },
);

Button.displayName = 'Button';
