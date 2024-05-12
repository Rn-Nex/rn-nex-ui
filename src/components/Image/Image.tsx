import React from 'react';
import { ImageStyle, Image as RnImage } from 'react-native';
import { generateElementStyles } from '../../utils';
import { ImageProps } from './ImageTypes';
import { generateImageRadiusStyles } from './utils';

export const Image = React.forwardRef<RnImage, ImageProps>(({ size, variation, style, ...props }, ref) => {
  return (
    <RnImage
      ref={ref}
      {...props}
      style={[
        generateElementStyles({
          width: size,
          height: size,
          ...style,
        }) as ImageStyle,
        variation && generateImageRadiusStyles(variation),
      ]}
    />
  );
});

Image.displayName = 'Image';
