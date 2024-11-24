import { ViewStyle } from 'react-native';
import { ElementRadius } from '../../libraries/style/styleTypes';
import { generateStyle } from '../../utils';
import {
  IMAGE_ROUNDED_LG_RADIUS,
  IMAGE_ROUNDED_MD_RADIUS,
  IMAGE_ROUNDED_RADIUS,
  IMAGE_ROUNDED_SM_RADIUS,
  IMAGE_ROUNDED_XL_RADIUS,
  IMAGE_SQUARE_RADIUS,
} from './constants';
import { GenerateImageListItemStylesProps, ImageVariant } from './Image.types';

export const generateImageRadiusStyles = (variation: ImageVariant) => {
  let styles: ElementRadius = {};

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
    styles['borderRadius'] = IMAGE_ROUNDED_XL_RADIUS;
  }

  return generateStyle({ propertyName: 'borderRadius', value: styles['borderRadius'] });
};

export const generateImageListItemStyles = ({ index, itemSpace, itemBottomSpace, items }: GenerateImageListItemStylesProps) => {
  if (!items) return;

  let applySpacing = false;
  let checkVisibility = (index + 1) % items;

  if (checkVisibility && checkVisibility !== 1) {
    applySpacing = true;
  }

  const paddingLeft = applySpacing ? itemSpace : checkVisibility === 1 ? 0 : itemSpace;
  const paddingRight = applySpacing ? itemSpace : checkVisibility === 1 ? itemSpace : 0;

  const baseStyle: ViewStyle = {
    width: `${100 / items}%`,
    paddingLeft,
    paddingRight,
    paddingBottom: itemBottomSpace,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  return baseStyle;
};
