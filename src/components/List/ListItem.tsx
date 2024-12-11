import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeColorsSelector, useThemeListItemConfigSelector } from '../../libraries';
import { merge } from '../../utils';
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
      overrideRootBottomSpacing = false,
      showOutline = false,
      outlineWidth = 0.5,
      ...props
    },
    ref,
  ) => {
    const themeColors = useThemeColorsSelector();
    const listItemThemeConfig = useThemeListItemConfigSelector();

    const listItemSelectedColor = selectedColor ?? listItemThemeConfig?.selectedColor;
    const listItemOutlineColor = outlineColor ?? listItemThemeConfig?.outlineColor;

    const listItemDisableBottomSpacing = () => {
      if (overrideRootBottomSpacing) {
        return disableBottomSpacing;
      }
      return listItemThemeConfig?.disableBottomSpacing ?? disableBottomSpacing;
    };

    const mergeListContainerStyles = useMemo(() => {
      return merge(listItemThemeConfig?.listContainerStyles, listContainerStyles);
    }, [listItemThemeConfig?.listContainerStyles, listContainerStyles]);

    const mergeStyles = useMemo(() => {
      return merge(listItemThemeConfig?.style, style);
    }, [listItemThemeConfig?.style, style]);

    const mergeEndAdornmentContainerStyles = useMemo(() => {
      return merge(listItemThemeConfig?.endAdornmentContainerStyles, endAdornmentContainerStyles);
    }, [listItemThemeConfig?.endAdornmentContainerStyles, endAdornmentContainerStyles]);

    const mergeStartAdornmentContainerStyles = useMemo(() => {
      return merge(listItemThemeConfig?.startAdornmentContainerStyles, startAdornmentContainerStyles);
    }, [listItemThemeConfig?.startAdornmentContainerStyles, startAdornmentContainerStyles]);

    const containerStyles = useMemo(
      () =>
        listItemContainerStyles({
          selected,
          colors: themeColors,
          selectedColor: listItemSelectedColor,
          showOutline,
          outlineWidth,
          outlineColor: listItemOutlineColor,
          showDefaultBg,
          softRadius: softRadius,
        }),
      [selected, themeColors, listItemSelectedColor, showOutline, outlineWidth, listItemOutlineColor, showDefaultBg, softRadius],
    );

    const spacingStyles = useMemo(() => {
      if (listItemDisableBottomSpacing()) {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bottomSpacingType, listItemThemeConfig?.disableBottomSpacing, overrideRootBottomSpacing, disableBottomSpacing]);

    const renderAdornment = useCallback(
      (type: 'start' | 'end', adornment?: React.ReactNode) => {
        if (!adornment) {
          return null;
        }

        const isStartAdornment = type === 'start';
        const adornmentStyles = isStartAdornment ? mergeStartAdornmentContainerStyles : mergeEndAdornmentContainerStyles;

        return <Box style={StyleSheet.flatten([styles.adornment, adornmentStyles])}>{adornment}</Box>;
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [startAdornment, endAdornment, mergeStartAdornmentContainerStyles, mergeEndAdornmentContainerStyles],
    );

    const renderListItem = useCallback(() => {
      if (actionType === 'list') {
        return (
          <View style={[styles.flexContainer, styles.listItemInnerContainer]}>
            {renderAdornment('start', startAdornment)}
            <Box sx={{ f: 1 }}>
              <BaseButton disableRipple={disableRipple} style={StyleSheet.flatten([styles.baseButton, mergeStyles])} {...props}>
                <View style={[styles.flexContainer]}>{children}</View>
              </BaseButton>
            </Box>
            {renderAdornment('end', endAdornment)}
          </View>
        );
      } else if (actionType === 'root') {
        return (
          <Box sx={{ f: 1 }}>
            <BaseButton disableRipple={disableRipple} style={StyleSheet.flatten([styles.baseButton, mergeStyles])} {...props}>
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
    }, [actionType, startAdornment, endAdornment, props, mergeStyles, disableRipple]);

    return (
      <Box
        style={StyleSheet.flatten([styles.listItemContainer, spacingStyles, containerStyles, mergeListContainerStyles])}
        ref={ref}
        testID={listItemContainerTestId}>
        {renderListItem()}
      </Box>
    );
  },
);
