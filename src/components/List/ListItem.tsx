import React, { useCallback, useMemo } from 'react';
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
      outlineColor,
      disableRipple,
      listItemContainerTestId,
      softRadius = false,
      showDefaultBg = false,
      actionType = 'list',
      bottomSpacingType = 'medium',
      disableBottomSpacing = false,
      showOutline = false,
      outlineWidth = 0.5,
      ...props
    },
    ref,
  ) => {
    const { theme } = useTheme();

    const containerStyles = useMemo(
      () =>
        listItemContainerStyles({
          selected,
          theme,
          selectedColor,
          showOutline,
          outlineWidth,
          outlineColor,
          showDefaultBg,
          softRadius,
        }),
      [selected, theme, selectedColor, showOutline, outlineWidth, outlineColor, showDefaultBg, softRadius],
    );

    const spacingStyles = useMemo(() => {
      if (disableBottomSpacing) {
        return { marginBottom: 'auto' } as ViewStyle;
      }

      const spacingMap = {
        small: BOTTOM_SMALL_SPACING,
        medium: BOTTOM_MEDIUM_SPACING,
        large: BOTTOM_LARGE_SPACING,
      };

      return {
        marginBottom: spacingMap[bottomSpacingType] ?? 10,
      } as ViewStyle;
    }, [bottomSpacingType, disableBottomSpacing]);

    const renderAdornment = useCallback(
      (type: 'start' | 'end', adornment?: React.ReactNode) => {
        if (!adornment) return null;

        const isStartAdornment = type === 'start';
        const adornmentSx = isStartAdornment ? startAdornmentContainerStyles?.sx : endAdornmentContainerStyles?.sx;
        const adornmentStyles = isStartAdornment ? startAdornmentContainerStyles?.style : endAdornmentContainerStyles?.style;

        return (
          <Box sx={adornmentSx} style={StyleSheet.flatten([styles.adornment, adornmentStyles])}>
            {adornment}
          </Box>
        );
      },
      [startAdornment, endAdornment, startAdornmentContainerStyles, endAdornmentContainerStyles],
    );

    const renderListItem = useCallback(() => {
      if (actionType === 'list') {
        return (
          <View style={[styles.flexContainer, styles.listItemInnerContainer]}>
            {renderAdornment('start', startAdornment)}
            <View style={{ flex: 1 }}>
              <BaseButton disableRipple={disableRipple} style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
                <View style={[styles.flexContainer]}>{children}</View>
              </BaseButton>
            </View>
            {renderAdornment('end', endAdornment)}
          </View>
        );
      } else if (actionType === 'root') {
        return (
          <View style={{ flex: 1 }}>
            <BaseButton disableRipple={disableRipple} style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
              <View style={[styles.flexContainer]}>
                {renderAdornment('start', startAdornment)}
                {children}
                {renderAdornment('end', endAdornment)}
              </View>
            </BaseButton>
          </View>
        );
      } else return null;
    }, [actionType, startAdornment, endAdornment, props, style, disableRipple]);

    return (
      <Box
        sx={listContainerStyles?.sx}
        style={StyleSheet.flatten([styles.listItemContainer, spacingStyles, containerStyles, listContainerStyles?.style])}
        ref={ref}
        testID={listItemContainerTestId}>
        {renderListItem()}
      </Box>
    );
  },
);
