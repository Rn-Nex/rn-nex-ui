import { generateStyle } from '../../utils';
import {
   IMAGE_ROUNDED_LG_RADIUS,
   IMAGE_ROUNDED_MD_RADIUS,
   IMAGE_ROUNDED_RADIUS,
   IMAGE_ROUNDED_SM_RADIUS,
   IMAGE_ROUNDED_XL_RADIUS_RADIUS,
   IMAGE_SQUARE_RADIUS,
} from './constants';
import { ImageVariant, ImageVariationStyles } from './interfaces';

export const generateImageRadiusStyles = (variation: ImageVariant) => {
   let styles: ImageVariationStyles = {};

   if (variation === 'rounded') {
      styles['borderRadius'] = IMAGE_ROUNDED_RADIUS;
   } else if (variation === 'square') {
      styles['borderRadius'] = IMAGE_SQUARE_RADIUS;
   } else if (variation === 'rounded-sm') {
      styles['borderRadius'] = IMAGE_ROUNDED_SM_RADIUS;
   } else if (variation === 'rounded-md') {
      styles['borderRadius'] = IMAGE_ROUNDED_MD_RADIUS;
   } else if (variation === 'rounded-lg') {
      styles['borderRadius'] = IMAGE_ROUNDED_LG_RADIUS;
   } else if (variation === 'rounded-xl') {
      styles['borderRadius'] = IMAGE_ROUNDED_XL_RADIUS_RADIUS;
   }

   return generateStyle({ propertyName: 'borderRadius', value: styles['borderRadius'] });
};
