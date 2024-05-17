import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
      ...props
    },
    ref,
  ) => {
    if (!!startAdornment || !!endAdornment) {
      return (
        <AnimatedView style={[generateChipStyles({ variant, disabled, withAdornment: true })]}>
          {startAdornment && (
            <TouchableWithoutFeedback {...startAdornmentTouchableProps}>
              <Box style={[generateChipAdornmentStyles(), startAdornmentContainerStyle]}>{startAdornment}</Box>
            </TouchableWithoutFeedback>
          )}
          <Text variation="h4" {...labelContainerProps}>
            {label}
          </Text>
          {endAdornment && (
            <TouchableWithoutFeedback {...endAdornmentTouchableProps}>
              <Box style={[generateChipAdornmentStyles(), endAdornmentContainerStyle]}>{endAdornment}</Box>
            </TouchableWithoutFeedback>
          )}
        </AnimatedView>
      );
    }

    return (
      <BaseButton ref={ref} disabled={disabled} style={[generateChipStyles({ variant, disabled })]} {...props}>
        <Box style={[generateChipElementWrapperStyles()]}>
          {startAdornment && (
            <TouchableWithoutFeedback>
              <Box style={[generateChipAdornmentStyles(), startAdornmentContainerStyle]}>{startAdornment}</Box>
            </TouchableWithoutFeedback>
          )}
          <Text variation="h4" {...labelContainerProps}>
            {label}
          </Text>
          {endAdornment && (
            <TouchableWithoutFeedback>
              <Box style={[generateChipAdornmentStyles(), endAdornmentContainerStyle]}>{endAdornment}</Box>
            </TouchableWithoutFeedback>
          )}
        </Box>
      </BaseButton>
    );
  },
);
