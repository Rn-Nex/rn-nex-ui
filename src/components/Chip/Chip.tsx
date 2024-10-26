import React, { useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { generateChipStyles, styles } from './Chip.style';
import { ChipProps } from './Chip.types';

export const Chip: React.FC<ChipProps> = ({
  label,
  labelContainerProps,
  variant,
  disabled,
  startAdornment,
  endAdornmentContainerStyle,
  startAdornmentTouchableProps,
  endAdornment,
  startAdornmentContainerStyle,
  endAdornmentTouchableProps,
  disableRipple,
  style,
  color,
  chipWrapperContainerStyles,
  chipWrapperContainerProps,
  square = false,
  testID,
  ...props
}) => {
  const { theme } = useTheme();

  const chipStyles = useMemo(
    () => generateChipStyles({ variant, disabled, withAdornment: !!startAdornment || !!endAdornment, color, theme }),
    [variant, disabled, startAdornment, endAdornment, color, theme],
  );

  const startAdornmentElement = startAdornment && (
    <TouchableWithoutFeedback {...startAdornmentTouchableProps}>
      <Box style={[styles.chipInnerComponentWrapper, startAdornmentContainerStyle]}>{startAdornment}</Box>
    </TouchableWithoutFeedback>
  );

  const endAdornmentElement = endAdornment && (
    <TouchableWithoutFeedback {...endAdornmentTouchableProps}>
      <Box style={[styles.chipInnerComponentWrapper, endAdornmentContainerStyle]}>{endAdornment}</Box>
    </TouchableWithoutFeedback>
  );

  return (
    <BaseButton
      disabled={disabled}
      disableRipple={disableRipple}
      style={StyleSheet.flatten([styles.chip, chipStyles, style, { borderRadius: square ? 5 : 20 }])}
      testID={testID}
      {...props}>
      <Box style={StyleSheet.flatten([styles.chipWrapper, chipWrapperContainerStyles])} {...chipWrapperContainerProps}>
        {startAdornmentElement}
        <Text
          isActive
          activeColor={variant === 'outlined' ? theme.colors.grey[900] : theme.colors.grey[50]}
          variation="h4"
          {...labelContainerProps}>
          {label}
        </Text>
        {endAdornmentElement}
      </Box>
    </BaseButton>
  );
};

Chip.displayName = 'Chip';
