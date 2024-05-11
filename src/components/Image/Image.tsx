import React from 'react';
import { ImageStyle, Image as RnImage } from 'react-native';
import { generateElementStyles } from '../../utils';
import { ImageProps } from './ImageTypes';
import { generateImageRadiusStyles } from './utils';

export const Image = React.forwardRef<RnImage, ImageProps>(
   ({ sx, size, variation, ...props }, ref) => {
      return (
         <RnImage
            ref={ref}
            {...props}
            style={{
               ...(size
                  ? (generateElementStyles({
                       width: size,
                       height: size,
                    }) as ImageStyle)
                  : {}),
               ...(variation ? generateImageRadiusStyles(variation) : {}),
               ...sx,
            }}
         />
      );
   },
);

Image.displayName = 'Image';
