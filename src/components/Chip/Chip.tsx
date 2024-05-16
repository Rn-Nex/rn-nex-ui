import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { BaseButton } from '../Button/BaseButton';
import { ChipProps } from './ChipTypes';
import { generateChipAdornmentStyles, generateChipElementWrapperStyles, generateChipStyles } from './utils';
import { Text } from '../Typography';
import { Box } from '../Box';

export const Chip = React.forwardRef<TouchableWithoutFeedback, ChipProps>(
  (
    {
      label,
      labelContainerProps,
      variant,
      disabled,
      endAdornment,
      endAdornmentContainerProps,
      startAdornment,
      startAdornmentContainerProps,
      disableRipple,
      ...props
    },
    ref,
  ) => {
    const isDisableRipple = !!startAdornment || !!endAdornment;

    return (
      <BaseButton
        ref={ref}
        disableRipple={isDisableRipple || disableRipple}
        disabled={disabled}
        style={[generateChipStyles({ variant, disabled })]}
        {...props}>
        <Box style={[generateChipElementWrapperStyles()]}>
          {startAdornment && (
            <TouchableWithoutFeedback>
              <Box style={[generateChipAdornmentStyles()]} {...startAdornmentContainerProps}>
                {startAdornment}
              </Box>
            </TouchableWithoutFeedback>
          )}
          <Text variation="h4" {...labelContainerProps}>
            {label}
          </Text>
          {endAdornment && (
            <TouchableWithoutFeedback>
              <Box style={[generateChipAdornmentStyles()]} {...endAdornmentContainerProps}>
                {endAdornment}
              </Box>
            </TouchableWithoutFeedback>
          )}
        </Box>
      </BaseButton>
    );
  },
);
