import React, { useCallback, useMemo } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { generateChipStyles, labelStyles, styles } from './Chip.style';
import { ChipProps } from './Chip.types';

export const Chip = React.forwardRef<View, ChipProps>(
  (
    {
      label,
      disabled,
      disableRipple,
      style,
      chipWrapperContainerStyles,
      labelColor,
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

    const chipStyles = useMemo(() => generateChipStyles({ variant, disabled, color, theme }), [variant, disabled, color, theme]);

    const renderLabel = useCallback(() => {
      return (
        <Text style={labelStyles({ isOutlinedVariant, theme, labelColor, color, syncBorderAndLabelColor })} variation="h4">
          {label}
        </Text>
      );
    }, [theme, label, isOutlinedVariant, colorScheme, labelColor, color, syncBorderAndLabelColor]);

    return (
      <BaseButton
        disabled={disabled}
        disableRipple={disableRipple}
        style={StyleSheet.flatten([styles.chip, chipStyles, style, { borderRadius: square ? 5 : 20 }])}
        baseButtonContainerStyle={{ flex: 0 }}
        ref={ref}
        {...props}>
        <Box style={StyleSheet.flatten([styles.chipWrapper, chipWrapperContainerStyles])}>{renderLabel()}</Box>
      </BaseButton>
    );
  },
);

Chip.displayName = 'Chip';
