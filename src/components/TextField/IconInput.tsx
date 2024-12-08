import React from 'react';
import { StyleSheet, TextInputProps, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeIconInputConfigSelector } from '../../libraries';
import { BaseStyles } from '../../libraries/style/styleTypes';
import { Box } from '../Box';
import { BoxProps } from '../types';
import { BaseInput } from './BaseInput';

export interface IconInputProps extends TextInputProps, Pick<BoxProps, 'sx'> {
  /**
   * Props to be applied to the wrapper around the TextInput component.
   */
  inputWrapperStyles?: ViewStyle;
  /**
   * A React node to be displayed at the end of the input field.
   * This is typically used for icons or other interactive elements.
   */
  endAdornment?: React.ReactNode;
  /**
   * Props to be applied to the container of the end adornment.
   */
  endAdornmentContainerStyles?: ViewStyle;
  /**
   * A React node to be displayed at the start of the input field.
   * This is typically used for icons or other interactive elements.
   */
  startAdornment?: React.ReactNode;
  /**
   * Props to be applied to the container of the start adornment.
   */
  startAdornmentContainerStyles?: ViewStyle;
}

export const IconInput: React.FC<IconInputProps> = React.forwardRef<View, IconInputProps>(
  (
    {
      sx,
      inputWrapperStyles,
      endAdornment,
      endAdornmentContainerStyles,
      startAdornment,
      startAdornmentContainerStyles,
      style,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const iconInputThemeConfig = useThemeIconInputConfigSelector();

    const {
      inputWrapperStyles: themeInputWrapperStyles = inputWrapperStyles,
      endAdornmentContainerStyles: themeEndAdornmentContainerStyles = endAdornmentContainerStyles,
      startAdornmentContainerStyles: themeStartAdornmentContainerStyles = startAdornmentContainerStyles,
    } = iconInputThemeConfig || {};

    const defaultIconInputContainerStyles: BaseStyles = {
      bg: themeColors.grey[300],
      bColor: themeColors.grey[300],
    };

    return (
      <Box
        sx={{ ...defaultIconInputContainerStyles, ...sx }}
        style={StyleSheet.flatten([styles.inputContainer, themeInputWrapperStyles])}
        ref={ref}>
        {startAdornment && (
          <Box style={StyleSheet.flatten([{ marginRight: 8 }, themeStartAdornmentContainerStyles])}>{startAdornment}</Box>
        )}
        <BaseInput
          placeholder="Base input"
          style={StyleSheet.flatten([{ color: themeColors.white[900], flex: 1 }, style])}
          placeholderTextColor={themeColors.grey[600]}
          {...props}
        />
        {endAdornment && (
          <Box style={StyleSheet.flatten([{ marginLeft: 8 }, themeEndAdornmentContainerStyles])}>{endAdornment}</Box>
        )}
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

IconInput.displayName = 'IconInput';
