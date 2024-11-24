import React, { useMemo } from 'react';
import { Animated, ImageStyle, Image as RnImage, StyleSheet } from 'react-native';
import { generateElementStyles } from '../../utils';
import { ImageProps } from './Image.types';
import { generateImageRadiusStyles } from './utils';

export const Image = React.forwardRef<RnImage, ImageProps>(({ size, variation, style, sx, width, height, ...props }, ref) => {
  const imageStyles = useMemo(() => {
    return StyleSheet.create({
      generated: generateElementStyles({
        h: size ?? height,
        w: size ?? width,
        ...sx,
      }) as ImageStyle,
    });
  }, [sx, width, height, size]);

  return (
    <Animated.Image
      ref={ref}
      style={StyleSheet.flatten([imageStyles.generated, variation && generateImageRadiusStyles(variation), style])}
      {...props}
    />
  );
});

Image.displayName = 'Image';
