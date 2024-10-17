import React, { useMemo } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { Text } from '../Typography';
import { generateChipStyles, styles } from './Chip.style';
import { ChipProps } from './Chip.types';
import { CHIP_CLASSNAMES } from './constants';

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
      <Box style={[styles[CHIP_CLASSNAMES.RN_NIX_CHIP_ADORNMENT_CLASS], startAdornmentContainerStyle]}>{startAdornment}</Box>
    </TouchableWithoutFeedback>
  );

  const endAdornmentElement = endAdornment && (
    <TouchableWithoutFeedback {...endAdornmentTouchableProps}>
      <Box style={[styles[CHIP_CLASSNAMES.RN_NIX_CHIP_ADORNMENT_CLASS], endAdornmentContainerStyle]}>{endAdornment}</Box>
    </TouchableWithoutFeedback>
  );

  return (
    <BaseButton disabled={disabled} disableRipple={disableRipple} style={[chipStyles, style]} testID={testID} {...props}>
      <Box
        style={[styles[CHIP_CLASSNAMES.RN_NIX_CHIP_ELEMENT_WRAPPER_CLASS], chipWrapperContainerStyles]}
        {...chipWrapperContainerProps}>
        {startAdornmentElement}
        <Text variation="h4" {...labelContainerProps}>
          {label}
        </Text>
        {endAdornmentElement}
      </Box>
    </BaseButton>
  );
};

Chip.displayName = 'Chip';
