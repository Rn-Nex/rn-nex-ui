import { ViewStyle } from 'react-native';
import { DividerRootContainerProps, GenerateDividerStylesProps } from './DividerTypes';
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  MIDDLE_VARIATION_HEIGHT_SPACE,
  MIDDLE_VARIATION_SIDE_SPACE,
  MIDDLE_WIDTH,
} from './constants';

export const generateRootContainerStyles = ({ variant, orientation }: DividerRootContainerProps): ViewStyle => {
  let baseStyles: ViewStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  if (variant === 'middle') {
    return {
      ...baseStyles,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  return baseStyles;
};

export const generateDividerStyles = ({
  theme,
  dividerType,
  variant,
  childWrapperLayoutRect,
  hasChild,
  dividerRootLayoutRect,
  textAlign,
  orientation,
}: GenerateDividerStylesProps): ViewStyle => {
  const isHorizontal = orientation === 'horizontal';
  const isLeftDivider = dividerType === 'left';
  const isRightDivider = dividerType === 'right';

  const baseStyles: ViewStyle = {
    width: isHorizontal ? DEFAULT_WIDTH : DEFAULT_HEIGHT,
    height: isHorizontal ? DEFAULT_HEIGHT : DEFAULT_WIDTH,
    backgroundColor: theme.colors.grey[600],
    opacity: 0,
  };

  if (!hasChild || !childWrapperLayoutRect || !dividerRootLayoutRect) {
    if (variant === 'middle') {
      return {
        ...baseStyles,
        width: isHorizontal ? MIDDLE_WIDTH : DEFAULT_HEIGHT,
        height: isHorizontal ? DEFAULT_HEIGHT : MIDDLE_WIDTH,
        opacity: 1,
      };
    }
    return { ...baseStyles, opacity: 1 };
  }

  const rootDividerWidth = dividerRootLayoutRect.width;
  const rootDividerHeight = dividerRootLayoutRect.height;

  const childWrapperWidth = childWrapperLayoutRect.width;
  const childWrapperHeight = childWrapperLayoutRect.height;

  const halfWidthOfChildWrapper = childWrapperWidth / 2;
  const halfHeightOfChildWrapper = childWrapperHeight / 2;

  const halfWidthOfRootDivider = rootDividerWidth / 2;
  const halfHeightOfRootDivider = rootDividerHeight / 2;

  const halfOfMiddleVariationHeight = MIDDLE_VARIATION_HEIGHT_SPACE / 2;

  let calculatedWidth = halfWidthOfRootDivider - halfWidthOfChildWrapper;
  let calculatedHeight = halfHeightOfRootDivider - halfHeightOfChildWrapper;

  if (variant === 'middle') {
    calculatedWidth -= isHorizontal ? MIDDLE_VARIATION_SIDE_SPACE : MIDDLE_VARIATION_HEIGHT_SPACE;
    calculatedHeight -= isHorizontal ? MIDDLE_VARIATION_SIDE_SPACE : MIDDLE_VARIATION_HEIGHT_SPACE;
  }

  const calculateDimensions = (isAligned: boolean): { width: number; height: number } => {
    let width = isAligned ? calculatedWidth / 2 : halfWidthOfRootDivider + calculatedWidth / 2 - halfWidthOfChildWrapper;
    let height = isHorizontal
      ? DEFAULT_HEIGHT
      : isAligned
      ? calculatedHeight / 2
      : halfHeightOfRootDivider + calculatedHeight / 2 - halfHeightOfChildWrapper;

    return {
      width: isHorizontal ? width : DEFAULT_HEIGHT,
      height: isHorizontal ? DEFAULT_HEIGHT : height,
    };
  };

  if (textAlign === 'left') {
    return {
      ...baseStyles,
      ...calculateDimensions(isLeftDivider),
      opacity: 1,
    };
  } else if (textAlign === 'right') {
    return {
      ...baseStyles,
      ...calculateDimensions(isRightDivider),
      opacity: 1,
    };
  }

  return {
    ...baseStyles,
    width: isHorizontal ? calculatedWidth : DEFAULT_HEIGHT,
    opacity: 1,
    height: isHorizontal
      ? DEFAULT_HEIGHT
      : variant === 'fullWidth'
      ? calculatedHeight
      : calculatedHeight + halfOfMiddleVariationHeight,
  };
};
