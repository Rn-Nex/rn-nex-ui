import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeListItemConfigSelector } from '../../libraries';
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
    const themeColors = useThemeColorsSelector();
    const listItemThemeConfig = useThemeListItemConfigSelector();

    const {
      listContainerStyles: themeListContainerStyles = listContainerStyles,
      endAdornmentContainerStyles: themeEndAdornmentContainerStyles = endAdornmentContainerStyles,
      startAdornmentContainerStyles: themeStartAdornmentContainerStyles = startAdornmentContainerStyles,
      selectedColor: themeSelectedColor = selectedColor,
      disableBottomSpacing: shouldDisableBottomSpacing = disableBottomSpacing,
      actionType: themeActionType = actionType,
      outlineColor: themeOutlineColor = outlineColor,
      softRadius: themeSoftRadius = softRadius,
    } = listItemThemeConfig || {};

    const containerStyles = useMemo(
      () =>
        listItemContainerStyles({
          selected,
          colors: themeColors,
          selectedColor: themeSelectedColor,
          showOutline,
          outlineWidth,
          outlineColor: themeOutlineColor,
          showDefaultBg,
          softRadius: themeSoftRadius,
        }),
      [selected, themeColors, themeSelectedColor, showOutline, outlineWidth, themeOutlineColor, showDefaultBg, themeSoftRadius],
    );

    const spacingStyles = useMemo(() => {
      if (shouldDisableBottomSpacing) {
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
    }, [bottomSpacingType, shouldDisableBottomSpacing]);

    const renderAdornment = useCallback(
      (type: 'start' | 'end', adornment?: React.ReactNode) => {
        if (!adornment) {
          return null;
        }

        const isStartAdornment = type === 'start';
        const adornmentSx = isStartAdornment ? themeStartAdornmentContainerStyles?.sx : themeEndAdornmentContainerStyles?.sx;
        const adornmentStyles = isStartAdornment
          ? themeStartAdornmentContainerStyles?.style
          : themeEndAdornmentContainerStyles?.style;

        return (
          <Box sx={adornmentSx} style={StyleSheet.flatten([styles.adornment, adornmentStyles])}>
            {adornment}
          </Box>
        );
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [startAdornment, endAdornment, themeStartAdornmentContainerStyles, themeEndAdornmentContainerStyles],
    );

    const renderListItem = useCallback(() => {
      if (themeActionType === 'list') {
        return (
          <View style={[styles.flexContainer, styles.listItemInnerContainer]}>
            {renderAdornment('start', startAdornment)}
            <Box sx={{ f: 1 }}>
              <BaseButton disableRipple={disableRipple} style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
                <View style={[styles.flexContainer]}>{children}</View>
              </BaseButton>
            </Box>
            {renderAdornment('end', endAdornment)}
          </View>
        );
      } else if (themeActionType === 'root') {
        return (
          <Box sx={{ f: 1 }}>
            <BaseButton disableRipple={disableRipple} style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
              <View style={[styles.flexContainer]}>
                {renderAdornment('start', startAdornment)}
                {children}
                {renderAdornment('end', endAdornment)}
              </View>
            </BaseButton>
          </Box>
        );
      } else {
        return null;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [themeActionType, startAdornment, endAdornment, props, style, disableRipple]);

    return (
      <Box
        sx={themeListContainerStyles?.sx}
        style={StyleSheet.flatten([styles.listItemContainer, spacingStyles, containerStyles, themeListContainerStyles?.style])}
        ref={ref}
        testID={listItemContainerTestId}>
        {renderListItem()}
      </Box>
    );
  },
);
