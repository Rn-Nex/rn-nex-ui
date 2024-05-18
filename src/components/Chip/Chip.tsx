import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { AnimatedView, Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { ChipProps } from './ChipTypes';
import { generateChipAdornmentStyles, generateChipElementWrapperStyles, generateChipStyles } from './utils';

export const Chip = React.forwardRef<TouchableWithoutFeedback, ChipProps>(
  (
    {
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
      ...props
    },
    ref,
  ) => {
    const chipStyles = useMemo(
      () => generateChipStyles({ variant, disabled, withAdornment: !!startAdornment || !!endAdornment, color }),
      [variant, disabled, startAdornment, endAdornment, color],
    );

    const startAdornmentElement = startAdornment && (
      <TouchableWithoutFeedback {...startAdornmentTouchableProps}>
        <Box style={[generateChipAdornmentStyles(), startAdornmentContainerStyle]}>{startAdornment}</Box>
      </TouchableWithoutFeedback>
    );

    const endAdornmentElement = endAdornment && (
      <TouchableWithoutFeedback {...endAdornmentTouchableProps}>
        <Box style={[generateChipAdornmentStyles(), endAdornmentContainerStyle]}>{endAdornment}</Box>
      </TouchableWithoutFeedback>
    );

    if (startAdornment || endAdornment) {
      return (
        <AnimatedView style={chipStyles}>
          {startAdornmentElement}
          <Text variation="h4" {...labelContainerProps}>
            {label}
          </Text>
          {endAdornmentElement}
        </AnimatedView>
      );
    }

    return (
      <BaseButton ref={ref} disabled={disabled} style={chipStyles} {...props}>
        <Box style={generateChipElementWrapperStyles()}>
          {startAdornmentElement}
          <Text variation="h4" {...labelContainerProps}>
            {label}
          </Text>
          {endAdornmentElement}
        </Box>
      </BaseButton>
    );
  },
);

Chip.displayName = 'Chip';
