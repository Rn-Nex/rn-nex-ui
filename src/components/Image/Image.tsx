import React from 'react';
import { ImageStyle, Image as RnImage } from 'react-native';
import { generateElementStyles } from '../../utils';
import { ImageProps } from './Image.types';
import { generateImageRadiusStyles } from './utils';

export const Image = React.forwardRef<RnImage, ImageProps>(({ size, variation, style, sx, ...props }, ref) => {
  return (
    <RnImage
      ref={ref}
      {...props}
      style={[
        generateElementStyles({
          h: size,
          w: size,
          ...sx,
        }) as ImageStyle,
        variation && generateImageRadiusStyles(variation),
        style,
      ]}
    />
  );
});

Image.displayName = 'Image';
