import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
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
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const isOutlinedVariant = variant === 'outlined';
    const colorScheme = useColorScheme();
    const hasIcon = Boolean(startIcon) || Boolean(endIcon);

    const chipThemeConfig = useThemeChipConfigSelector();

    const {
      chipWrapperContainerStyles: themeChipWrapperContainerStyles = chipWrapperContainerStyles,
      square: themeSquareShape = square,
      labelColor: themeChipLabelColor = labelColor,
      syncBorderAndLabelColor: themeSyncBorderAndLabelColor = syncBorderAndLabelColor,
      colors: themeColorScheme,
    } = chipThemeConfig || {};

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
            labelColor: themeChipLabelColor,
            color,
            syncBorderAndLabelColor: themeSyncBorderAndLabelColor,
            colorSchemeConfig: themeColorScheme,
          })}
          variation="h4">
          {label}
        </Text>
      );
    }, [
      themeColors,
      label,
      isOutlinedVariant,
      colorScheme,
      themeChipLabelColor,
      color,
      themeColorScheme,
      themeSyncBorderAndLabelColor,
    ]);

    if (hasIcon && !children) {
      return (
        <Box style={StyleSheet.flatten([styles.chip, chipStyles, style, { borderRadius: themeSquareShape ? 5 : 20 }])} ref={ref}>
          <Box style={StyleSheet.flatten([styles.chipWrapper, themeChipWrapperContainerStyles])}>
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
        style={StyleSheet.flatten([
          styles.chip,
          chipStyles,
          style,
          { borderRadius: themeSquareShape ? SQUARE_BORDER_RADIUS : DEFAULT_BORDER_RADIUS },
        ])}
        ref={ref}
        {...props}>
        <Box style={StyleSheet.flatten([styles.chipWrapper, themeChipWrapperContainerStyles])}>{children ?? renderLabel()}</Box>
      </BaseButton>
    );
  },
);

Chip.displayName = 'Chip';
