import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { themeColorsSelector, themeIconButtonConfigSelector, themeSpacingSelector } from '../../libraries';
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
    const themeColors = themeColorsSelector();
    const themeSpacing = themeSpacingSelector();
    const iconButtonThemeConfig = themeIconButtonConfigSelector();

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

    const applyRippleEdge = iconButtonThemeConfig?.rippleEdge ?? rippleEdge;
    const applyDisabledRipple = iconButtonThemeConfig?.disableRipple ?? disableRipple;
    const applyRippleProps = iconButtonThemeConfig?.rippleProps ?? rippleProps;
    const applyContainerStyles = iconButtonThemeConfig?.baseButtonContainerStyle ?? baseButtonContainerStyle;
    const applyIconButtonStyles = iconButtonThemeConfig?.style ?? style;

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
