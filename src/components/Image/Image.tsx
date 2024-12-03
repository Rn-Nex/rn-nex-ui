import React from 'react';
import { Animated, ImageStyle, Image as RnImage, StyleSheet } from 'react-native';
import { generateElementStyles } from '../../utils';
import { generateImageRadiusStyles, imageStyles } from './Image.styles';
import { ImageProps } from './Image.types';

export const Image = React.forwardRef<RnImage, ImageProps>(
  ({ size, variation, style, sx, width, height, expandToFill = false, ...props }, ref) => {
    return (
      <Animated.Image
        ref={ref}
        style={StyleSheet.flatten([
          imageStyles({ expandToFill, size, height, width }),
          variation && generateImageRadiusStyles(variation),
          sx && (generateElementStyles(sx) as ImageStyle),
          style,
        ])}
        {...props}
      />
    );
  },
);

Image.displayName = 'Image';
