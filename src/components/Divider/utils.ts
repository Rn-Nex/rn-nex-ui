import { ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { DividerRootContainerProps, GenerateDividerStylesProps } from './DividerTypes';
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  INSET_LEFT_WIDTH,
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
  };

  if (variant === 'inset') {
    return {
      ...baseStyles,
      display: 'flex',
    };
  } else if (variant === 'middle') {
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
  dividerType,
  variant,
  childWrapperLayoutRect,
  hasChild,
  dividerRootLayoutRect,
  textAlign,
  orientation,
}: GenerateDividerStylesProps): ViewStyle => {
  const isHorizontal = orientation === 'horizontal';

  const baseStyles: ViewStyle = {
    width: isHorizontal ? DEFAULT_WIDTH : DEFAULT_HEIGHT,
    height: isHorizontal ? DEFAULT_HEIGHT : DEFAULT_WIDTH,
    backgroundColor: colors.white.dark,
  };

  if (hasChild && childWrapperLayoutRect && dividerRootLayoutRect) {
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
      calculatedWidth -= isHorizontal ? MIDDLE_VARIATION_SIDE_SPACE : halfOfMiddleVariationHeight;
      calculatedHeight -= isHorizontal ? MIDDLE_VARIATION_SIDE_SPACE : halfOfMiddleVariationHeight;
    } else if (variant === 'inset' && dividerType === 'left') {
      return {
        ...baseStyles,
        marginLeft: isHorizontal ? 'auto' : undefined,
        marginTop: isHorizontal ? undefined : 'auto',
        width: isHorizontal ? calculatedWidth - MIDDLE_VARIATION_SIDE_SPACE : DEFAULT_HEIGHT,
        height: isHorizontal ? DEFAULT_HEIGHT : calculatedHeight - MIDDLE_VARIATION_SIDE_SPACE,
      };
    }

    if (textAlign === 'left') {
      let width;
      let height;

      if (dividerType === 'left') {
        width = calculatedWidth / 2;

        if (!isHorizontal) {
          height = calculatedHeight / 2;
        }
      } else {
        width = halfWidthOfRootDivider + calculatedWidth / 2 - halfWidthOfChildWrapper;

        if (!isHorizontal) {
          height = halfHeightOfRootDivider + calculatedHeight / 2 - halfHeightOfChildWrapper - halfOfMiddleVariationHeight;
        }
      }

      if (!isHorizontal) {
        width = DEFAULT_HEIGHT;
      } else {
        height = DEFAULT_HEIGHT;
      }

      return {
        ...baseStyles,
        width,
        height,
      };
    } else if (textAlign === 'right') {
      let width;
      let height;

      if (dividerType === 'right') {
        width = calculatedWidth / 2;

        if (!isHorizontal) {
          height = calculatedHeight / 2;
        }
      } else {
        width = halfWidthOfRootDivider + calculatedWidth / 2 - halfWidthOfChildWrapper;

        if (!isHorizontal) {
          height = halfHeightOfRootDivider + calculatedHeight / 2 - halfHeightOfChildWrapper;
        }
      }

      if (!isHorizontal) {
        width = DEFAULT_HEIGHT;
      } else {
        height = DEFAULT_HEIGHT;
      }

      return {
        ...baseStyles,
        width,
        height,
      };
    }

    return {
      ...baseStyles,
      width: isHorizontal ? calculatedWidth : DEFAULT_HEIGHT,
      height: isHorizontal ? DEFAULT_HEIGHT : calculatedHeight,
    };
  }

  if (variant === 'inset' && dividerType === 'left') {
    return {
      ...baseStyles,
      width: isHorizontal ? INSET_LEFT_WIDTH : DEFAULT_HEIGHT,
      height: isHorizontal ? DEFAULT_HEIGHT : INSET_LEFT_WIDTH,
      marginLeft: isHorizontal ? 'auto' : undefined,
      marginTop: isHorizontal ? undefined : 'auto',
    };
  }

  if (variant === 'middle') {
    return {
      ...baseStyles,
      width: isHorizontal ? MIDDLE_WIDTH : DEFAULT_HEIGHT,
      height: isHorizontal ? DEFAULT_HEIGHT : MIDDLE_WIDTH,
    };
  }

  return baseStyles;
};
