import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useThemeChipConfigSelector, useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { generateChipStyles, labelStyles, styles } from './Chip.style';
import { ChipProps } from './Chip.types';
import { DEFAULT_BORDER_RADIUS, SQUARE_BORDER_RADIUS } from './constants';

export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      label,
      disabled,
      disableRipple,
      style,
      chipWrapperContainerStyles,
      labelColor,
      startIcon,
      endIcon,
      startIconProps,
      endIconProps,
      children,
      variant = 'filled',
      color = 'secondary',
      square = false,
      syncBorderAndLabelColor = false,
      overrideRootSquareConfig = false,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const isOutlinedVariant = variant === 'outlined';
    const hasIcon = Boolean(startIcon) || Boolean(endIcon);
    const chipThemeConfig = useThemeChipConfigSelector();

    const chipLabelColor = labelColor ?? chipThemeConfig?.labelColor;

    const chipSquareHandler = () => {
      if (overrideRootSquareConfig) {
        return square;
      }
      return chipThemeConfig?.square ?? square;
    };

    const { colors: themeColorScheme } = chipThemeConfig || {};

    const chipStyles = useMemo(
      () => generateChipStyles({ variant, disabled, color, colors: themeColors, colorSchemeConfig: themeColorScheme }),
      [variant, disabled, color, themeColors, themeColorScheme],
    );

    const renderLabel = useCallback(() => {
      return (
        <Text
          style={labelStyles({
            isOutlinedVariant,
            colors: themeColors,
            labelColor: chipLabelColor,
            color,
            syncBorderAndLabelColor,
            colorSchemeConfig: themeColorScheme,
          })}
          variation="h4">
          {label}
        </Text>
      );
    }, [themeColors, label, isOutlinedVariant, chipLabelColor, color, themeColorScheme, syncBorderAndLabelColor]);

    if (hasIcon && !children) {
      return (
        <Box
          style={StyleSheet.flatten([styles.chip, chipStyles, style, { borderRadius: chipSquareHandler() ? 5 : 20 }])}
          ref={ref}>
          <Box
            style={StyleSheet.flatten([
              styles.chipWrapper,
              chipThemeConfig?.chipWrapperContainerStyles,
              chipWrapperContainerStyles,
            ])}>
            {startIcon && <TouchableOpacity {...startIconProps}>{startIcon}</TouchableOpacity>}
            {renderLabel()}
            {endIcon && <TouchableOpacity {...endIconProps}>{endIcon}</TouchableOpacity>}
          </Box>
        </Box>
      );
    }

    return (
      <BaseButton
        disabled={disabled}
        disableRipple={disableRipple}
        scaleAnimationValue={0.96}
        style={StyleSheet.flatten([
          styles.chip,
          chipStyles,
          { borderRadius: chipSquareHandler() ? SQUARE_BORDER_RADIUS : DEFAULT_BORDER_RADIUS },
          chipThemeConfig?.style,
          style,
        ])}
        ref={ref}
        {...props}>
        <Box
          style={StyleSheet.flatten([
            styles.chipWrapper,
            chipThemeConfig?.chipWrapperContainerStyles,
            chipWrapperContainerStyles,
          ])}>
          {children ?? renderLabel()}
        </Box>
      </BaseButton>
    );
  },
);

Chip.displayName = 'Chip';
