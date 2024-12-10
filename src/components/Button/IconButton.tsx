import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColorsSelector, useThemeIconButtonConfigSelector, useThemeSpacingSelector } from '../../libraries';
import { merge } from '../../utils';
import { BaseButton } from './BaseButton';
import { getButtonStyles, styles } from './Button.styles';
import { IconButtonProps } from './Button.types';

export const IconButton = React.forwardRef<View, IconButtonProps>(
  (
    {
      disabled,
      children,
      style,
      rippleProps,
      baseButtonContainerStyle,
      overrideRootRippleEdge = false,
      disableRipple = false,
      overrideRootDisableRippleEffect = false,
      overrideRootVariation = false,
      rippleEdge = 'center',
      variation = 'roundedIconButton',
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const themeSpacing = useThemeSpacingSelector();
    const iconButtonThemeConfig = useThemeIconButtonConfigSelector();

    const iconButtonVariation = () => {
      if (overrideRootVariation) {
        return variation;
      }
      return iconButtonThemeConfig?.variation ?? variation;
    };

    const iconButtonDisableRipple = () => {
      if (overrideRootDisableRippleEffect) {
        return disableRipple;
      }
      return iconButtonThemeConfig?.disableRipple ?? disableRipple;
    };

    const iconButtonRippleEdge = () => {
      if (overrideRootRippleEdge) {
        return rippleEdge;
      }
      return iconButtonThemeConfig?.rippleEdge ?? rippleEdge;
    };

    const mergeBaseButtonContainerStyles = useMemo(() => {
      return merge(iconButtonThemeConfig?.baseButtonContainerStyle, baseButtonContainerStyle);
    }, [iconButtonThemeConfig?.baseButtonContainerStyle, baseButtonContainerStyle]);

    const mergeRippleProps = useMemo(() => {
      return merge(iconButtonThemeConfig?.rippleProps, rippleProps);
    }, [iconButtonThemeConfig?.rippleProps, rippleProps]);

    const mergeStyles = useMemo(() => {
      return merge(iconButtonThemeConfig?.style, style);
    }, [iconButtonThemeConfig?.style, style]);

    const iconButtonStyles = useMemo(
      () =>
        getButtonStyles({
          variation: iconButtonVariation(),
          disabled,
          themeColors,
          spacing: themeSpacing,
        }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [disabled, overrideRootVariation, themeColors, themeSpacing],
    );

    return (
      <BaseButton
        ref={ref}
        style={StyleSheet.flatten([iconButtonStyles, mergeStyles])}
        baseButtonContainerStyle={StyleSheet.flatten([styles.iconBaseButtonContainer, mergeBaseButtonContainerStyles])}
        rippleProps={mergeRippleProps}
        disableRipple={iconButtonDisableRipple()}
        rippleEdge={iconButtonRippleEdge()}
        {...props}>
        {children}
      </BaseButton>
    );
  },
);

IconButton.displayName = 'IconButton';
