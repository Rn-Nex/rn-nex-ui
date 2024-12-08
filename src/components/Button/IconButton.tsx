import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColorsSelector, useThemeIconButtonConfigSelector, useThemeSpacingSelector } from '../../libraries';
import { BaseButton } from './BaseButton';
import { getButtonStyles } from './Button.styles';
import { IconButtonProps } from './Button.types';

export const IconButton = React.forwardRef<View, IconButtonProps>(
  (
    {
      disabled,
      children,
      style,
      rippleProps,
      baseButtonContainerStyle,
      disableRipple = false,
      rippleEdge = 'center',
      variation = 'roundedIconButton',
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const themeSpacing = useThemeSpacingSelector();
    const iconButtonThemeConfig = useThemeIconButtonConfigSelector();

    if (!themeSpacing) {
      throw new Error(
        'Theme spacing are unavailable. Please ensure the ThemeProvider is correctly wrapped around the application.',
      );
    }

    const {
      rippleEdge: applyRippleEdge = rippleEdge,
      disableRipple: applyDisabledRipple = disableRipple,
      rippleProps: applyRippleProps = rippleProps,
      baseButtonContainerStyle: applyContainerStyles = baseButtonContainerStyle,
      style: applyIconButtonStyles = style,
    } = iconButtonThemeConfig || {};

    const iconButtonStyles = useMemo(
      () =>
        getButtonStyles({
          variation: iconButtonThemeConfig?.variation ?? variation,
          disabled,
          themeColors,
          spacing: themeSpacing,
        }),
      [variation, iconButtonThemeConfig?.variation, disabled, themeColors],
    );

    return (
      <BaseButton
        ref={ref}
        style={StyleSheet.flatten([iconButtonStyles, applyIconButtonStyles])}
        baseButtonContainerStyle={applyContainerStyles}
        rippleProps={applyRippleProps}
        disableRipple={applyDisabledRipple}
        rippleEdge={applyRippleEdge}
        {...props}>
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
