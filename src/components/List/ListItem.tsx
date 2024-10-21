import React, { useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { listItemContainerStyles, styles } from './List.style';
import { ListItemProps } from './List.types';

export const ListItem = React.forwardRef<TouchableWithoutFeedback, ListItemProps>(
  (
    {
      children,
      style,
      startAdornment,
      startAdornmentContainerStyles,
      endAdornment,
      endAdornmentContainerStyles,
      listContainerStyles,
      selected,
      selectedColor,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const containerStyles = useMemo(
      () => listItemContainerStyles({ selected, theme, selectedColor }),
      [selected, theme, selectedColor],
    );

    return (
      <Box
        sx={listContainerStyles?.sx}
        style={StyleSheet.flatten([styles.listItemContainer, containerStyles, listContainerStyles?.style])}>
        {startAdornment && (
          <Box
            sx={startAdornmentContainerStyles?.sx}
            style={StyleSheet.flatten([styles.adornment, startAdornmentContainerStyles?.style])}>
            {startAdornment}
          </Box>
        )}
        <BaseButton style={StyleSheet.flatten([styles.baseButton, style])} ref={ref} {...props}>
          {children}
        </BaseButton>
        {endAdornment && (
          <Box
            sx={endAdornmentContainerStyles?.sx}
            style={StyleSheet.flatten([styles.adornment, endAdornmentContainerStyles?.style])}>
            {endAdornment}
          </Box>
        )}
      </Box>
    );
  },
);
