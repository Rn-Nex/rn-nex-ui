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

export const generateImageListItemStyles = ({
  index,
  itemSpace,
  itemBottomSpace,
  items = 3,
}: GenerateImageListItemStylesProps) => {
  let applySpacing = false;
  let checkVisibility = (index + 1) % items;
  let space = itemSpace ?? 1;

  if (checkVisibility && checkVisibility !== 1) {
    applySpacing = true;
  }

  const paddingLeft = applySpacing ? space : checkVisibility === 1 ? 0 : space;
  const paddingRight = applySpacing ? space : checkVisibility === 1 ? space : 0;

  const baseStyle: ViewStyle = {
    width: `${100 / items}%`,
    paddingLeft,
    paddingRight,
    paddingBottom: itemBottomSpace ?? 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  };

  return baseStyle;
};
