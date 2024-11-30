import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useTheme } from '../../libraries';
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
      variant = 'filled',
      color = 'secondary',
      square = false,
      syncBorderAndLabelColor = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const isOutlinedVariant = variant === 'outlined';
    const colorScheme = useColorScheme();
    const hasIcon = Boolean(startIcon) || Boolean(endIcon);

    const chipStyles = useMemo(() => generateChipStyles({ variant, disabled, color, theme }), [variant, disabled, color, theme]);

    const renderLabel = useCallback(() => {
      return (
        <Text style={labelStyles({ isOutlinedVariant, theme, labelColor, color, syncBorderAndLabelColor })} variation="h4">
          {label}
        </Text>
      );
    }, [theme, label, isOutlinedVariant, colorScheme, labelColor, color, syncBorderAndLabelColor]);

    if (hasIcon) {
      return (
        <Box style={StyleSheet.flatten([styles.chip, chipStyles, style, { borderRadius: square ? 5 : 20 }])} ref={ref}>
          <Box style={StyleSheet.flatten([styles.chipWrapper, chipWrapperContainerStyles])}>
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
          { borderRadius: square ? SQUARE_BORDER_RADIUS : DEFAULT_BORDER_RADIUS },
        ])}
        disableBaseButtonContainerFlex
        ref={ref}
        {...props}>
        <Box style={StyleSheet.flatten([styles.chipWrapper, chipWrapperContainerStyles])}>{renderLabel()}</Box>
      </BaseButton>
    );
  },
);

Chip.displayName = 'Chip';
