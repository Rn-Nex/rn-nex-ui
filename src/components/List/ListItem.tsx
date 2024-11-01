import React, { useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../libraries';
import { Box } from '../Box';
import { BaseButton } from '../Button/BaseButton';
import { listItemContainerStyles, styles } from './List.style';
import { ListItemProps } from './List.types';
import { BOTTOM_LARGE_SPACING, BOTTOM_MEDIUM_SPACING, BOTTOM_SMALL_SPACING } from './constants';

export const ListItem = React.forwardRef<View, ListItemProps>(
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
      bottomSpacingType = 'medium',
      disableBottomSpacing = false,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();
    const containerStyles = useMemo(
      () => listItemContainerStyles({ selected, theme, selectedColor }),
      [selected, theme, selectedColor],
    );

    const spacingStyles = useMemo(() => {
      let baseStyles: ViewStyle = {};

      if (disableBottomSpacing) {
        baseStyles.marginBottom = 'auto';
      }

      if (bottomSpacingType) {
        baseStyles.marginBottom =
          bottomSpacingType === 'small'
            ? BOTTOM_SMALL_SPACING
            : bottomSpacingType === 'medium'
              ? BOTTOM_MEDIUM_SPACING
              : bottomSpacingType === 'large'
                ? BOTTOM_LARGE_SPACING
                : 10;
      }

      return baseStyles;
    }, [bottomSpacingType, disableBottomSpacing]);

    return (
      <Box
        sx={listContainerStyles?.sx}
        style={StyleSheet.flatten([styles.listItemContainer, spacingStyles, containerStyles, listContainerStyles?.style])}
        ref={ref}>
        {startAdornment && (
          <Box
            sx={startAdornmentContainerStyles?.sx}
            style={StyleSheet.flatten([styles.adornment, startAdornmentContainerStyles?.style])}>
            {startAdornment}
          </Box>
        )}
        <BaseButton style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
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
