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

    const {
      rippleEdge: themeRippleEdge = rippleEdge,
      disableRipple: themeDisabledRipple = disableRipple,
      rippleProps: themeRippleProps = rippleProps,
      baseButtonContainerStyle: themeContainerStyles = baseButtonContainerStyle,
      style: themeIconButtonStyles = style,
    } = iconButtonThemeConfig || {};

    const iconButtonStyles = useMemo(
      () =>
        getButtonStyles({
          variation: iconButtonThemeConfig?.variation ?? variation,
          disabled,
          themeColors,
          spacing: themeSpacing,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [variation, iconButtonThemeConfig?.variation, disabled, themeColors],
    );

    return (
      <BaseButton
        ref={ref}
        style={StyleSheet.flatten([iconButtonStyles, themeIconButtonStyles])}
        baseButtonContainerStyle={themeContainerStyles}
        rippleProps={themeRippleProps}
        disableRipple={themeDisabledRipple}
        rippleEdge={themeRippleEdge}
        {...props}>
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
