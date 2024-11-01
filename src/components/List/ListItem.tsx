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

    const renderAdornment = useCallback(
      (type: 'start' | 'end', adornment?: React.ReactNode) => {
        const isStartAdornment = type === 'start';

        if (!adornment) return null;
        return (
          <Box
            sx={isStartAdornment ? startAdornmentContainerStyles?.sx : endAdornmentContainerStyles?.sx}
            style={StyleSheet.flatten([
              styles.adornment,
              isStartAdornment ? startAdornmentContainerStyles?.style : endAdornmentContainerStyles?.style,
            ])}>
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
              <BaseButton style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
                <View style={[styles.flexContainer]}>{children}</View>
              </BaseButton>
            </View>
            {renderAdornment('end', endAdornment)}
          </View>
        );
      } else if (actionType === 'root') {
        return (
          <View style={{ flex: 1 }}>
            <BaseButton style={StyleSheet.flatten([styles.baseButton, style])} {...props}>
              <View style={[styles.flexContainer]}>
                {renderAdornment('start', startAdornment)}
                {children}
                {renderAdornment('end', endAdornment)}
              </View>
            </BaseButton>
          </View>
        );
      } else return null;
    }, [actionType, startAdornment, endAdornment, props, style]);

    return (
      <Box
        sx={listContainerStyles?.sx}
        style={StyleSheet.flatten([styles.listItemContainer, spacingStyles, containerStyles, listContainerStyles?.style])}
        ref={ref}>
        {renderListItem()}
      </Box>
    );
  },
);
