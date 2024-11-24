import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { DEFAULT_ITEM_BOTTOM_SPACE, DEFAULT_ITEM_SPACING, DEFAULT_ITEMS } from './constants';
import { ImageListItemProps } from './Image.types';
import { generateImageListItemStyles } from './utils';

export const ImageListItem = React.forwardRef<View, ImageListItemProps>(
  (
    {
      index,
      style,
      children,
      listWrapperContainerStyles,
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
      <Box style={StyleSheet.flatten([style, imageListItemStyles])} ref={ref} {...props}>
        <Box style={StyleSheet.flatten([styles.listWrapperContainer, listWrapperContainerStyles])}>{children}</Box>
      </Box>
    );
  },
);

const styles = StyleSheet.create({
  listWrapperContainer: {
    width: '100%',
    position: 'relative',
  },
});
