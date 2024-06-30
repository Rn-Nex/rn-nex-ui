import React, { useMemo } from 'react';
import { View, ViewStyle } from 'react-native';
import { ImageListItemProps } from './ImageTypes';
import { Box } from '../Box';
import { generateImageListItemStyles } from './utils';

export const ImageListItem = React.forwardRef<View, ImageListItemProps>(
  ({ index, style, children, itemSpace, itemBottomSpace, items = 3, ...props }, ref) => {
    const imageListItemStyles = useMemo(
      () => generateImageListItemStyles({ index, items, itemSpace, itemBottomSpace }),
      [items, itemSpace, itemBottomSpace],
    );

    const imageListWrapperContainerStyles = useMemo(() => {
      const baseStyle: ViewStyle = {
        width: '100%',
      };
      return baseStyle;
    }, []);

    return (
      <Box style={[style, imageListItemStyles]} {...props} ref={ref}>
        <Box style={[imageListWrapperContainerStyles]}>{children}</Box>
      </Box>
    );
  },
);
