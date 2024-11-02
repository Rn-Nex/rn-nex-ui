import React, { useMemo } from 'react';
import { Animated, ImageStyle, Image as RnImage, StyleSheet } from 'react-native';
import { generateElementStyles } from '../../utils';
import { ImageProps } from './Image.types';
import { generateImageRadiusStyles } from './utils';

export const Image = React.forwardRef<RnImage, ImageProps>(({ size, variation, style, sx, ...props }, ref) => {
  const imageStyles = useMemo(() => {
    return StyleSheet.create({
      generated: generateElementStyles({
        h: size,
        w: size,
        ...sx,
      }) as ImageStyle,
    });
  }, [sx]);

  return (
    <Animated.Image
      ref={ref}
      style={StyleSheet.flatten([imageStyles.generated, variation && generateImageRadiusStyles(variation), style])}
      {...props}
    />
  );
});

Image.displayName = 'Image';
