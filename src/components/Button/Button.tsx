import React, { useCallback, useMemo } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';
import { grey, useThemeButtonConfigSelector, useThemeColorsSelector, useThemeSpacingSelector } from '../../libraries';
import { getVariant, merge } from '../../utils';
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
      overrideRootDisableScaleAnimation = false,
      overrideRootScaleAnimationValue = false,
      overrideRootRippleEdge = false,
      buttonColor = 'secondary',
      variation = 'contained',
      square = false,
      overrideRootSquareConfig = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const themeSpacing = useThemeSpacingSelector();
    const buttonThemeConfig = useThemeButtonConfigSelector();
    const isContainedButton = variation === 'contained';

    const shouldDisableRipple = disableRipple ?? buttonThemeConfig?.disableRipple;

    const shouldDisableScaleAnimation = () => {
      if (overrideRootDisableScaleAnimation) {
        return disableScaleAnimation;
      }
      return buttonThemeConfig?.disableScaleAnimation ?? disableScaleAnimation;
    };

    const buttonScaleAnimationValue = () => {
      if (overrideRootScaleAnimationValue) {
        return scaleAnimationValue;
      }
      return buttonThemeConfig?.scaleAnimationValue ?? scaleAnimationValue;
    };

    const buttonRippleEdge = () => {
      if (overrideRootRippleEdge) {
        return rippleEdge;
      }
      return buttonThemeConfig?.rippleEdge ?? rippleEdge;
    };

    const mergeRippleProps = useMemo(() => {
      return merge(buttonThemeConfig?.rippleProps, rippleProps);
    }, [buttonThemeConfig?.rippleProps, rippleProps]);

    const buttonStyles = useMemo(() => {
      let applySquareStyle = false;

      if (overrideRootSquareConfig) {
        applySquareStyle = square;
      } else {
        applySquareStyle = buttonThemeConfig?.square ?? square;
      }

      return getButtonStyles({
        spacing: themeSpacing,
        themeColors,
        variation,
        disabled,
        buttonColor,
        square: applySquareStyle,
      });
    }, [
      overrideRootSquareConfig,
      themeSpacing,
      themeColors,
      variation,
      disabled,
      buttonColor,
      square,
      buttonThemeConfig?.square,
    ]);

    const renderChild = useCallback(() => {
      if (loading) {
        return <ActivityIndicator />;
      } else if (children) {
        return children;
      } else {
        let textColor: ColorValue;

        if (labelColor) {
          textColor = labelColor;
        } else if (buttonThemeConfig?.labelColor) {
          textColor = buttonThemeConfig.labelColor;
        } else if (isContainedButton) {
          textColor = grey[50];
        } else {
          textColor = getVariant({ variant: buttonColor, colors: themeColors });
        }

        return (
          <Text style={StyleSheet.flatten([{ color: textColor }, buttonThemeConfig?.labelStyles, labelStyles])}>{label}</Text>
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
      labelStyles,
    ]);

    return (
      <Box style={StyleSheet.flatten([buttonRootContainerStyles({ flex }), buttonThemeConfig?.style, style])} sx={sx} ref={ref}>
        <BaseButton
          disabled={loading || disabled}
          style={StyleSheet.flatten([buttonStyles, buttonThemeConfig?.baseButtonStyles, baseButtonStyles])}
          disableRipple={shouldDisableRipple}
          disableScaleAnimation={shouldDisableScaleAnimation()}
          scaleAnimationValue={buttonScaleAnimationValue()}
          rippleEdge={buttonRippleEdge()}
          baseButtonContainerStyle={(buttonThemeConfig?.baseButtonContainerStyle, baseButtonContainerStyle)}
          rippleProps={mergeRippleProps}
          sx={baseButtonSx}
          {...props}>
          {renderChild()}
        </BaseButton>
      </Box>
    );
  },
);

Button.displayName = 'Button';
