import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { DEFAULT_ITEM_BOTTOM_SPACE, DEFAULT_ITEM_SPACING, DEFAULT_ITEMS } from './constants';
import { ImageListItemProps } from './Image.types';
import { generateImageListItemStyles } from './Image.styles';

export const ImageListItem = React.forwardRef<View, ImageListItemProps>(
  (
    {
      index,
      style,
      children,
      listWrapperContainerStyles,
      listWrapperTestId,
      itemBottomSpace = DEFAULT_ITEM_BOTTOM_SPACE,
      itemSpace = DEFAULT_ITEM_SPACING,
      items = DEFAULT_ITEMS,
      ...props
    },
    ref,
  ) => {
    if (items < 0) throw new Error('Image list item must be at greater then zero');

    const imageListItemStyles = useMemo(
      () => generateImageListItemStyles({ index, items, itemSpace, itemBottomSpace }),
      [items, itemSpace, itemBottomSpace],
    );

    return (
      <Box style={StyleSheet.flatten([styles.container, imageListItemStyles, style])} ref={ref} {...props}>
        <Box style={StyleSheet.flatten([styles.listWrapperContainer, listWrapperContainerStyles])} testID={listWrapperTestId}>
          {children}
        </Box>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  listWrapperContainer: {
    width: '100%',
    position: 'relative',
  },
});
