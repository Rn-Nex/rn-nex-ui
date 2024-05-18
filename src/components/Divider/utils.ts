import { ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { DividerRootContainerProps, GenerateDividerStylesProps } from './DividerTypes';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, INSET_LEFT_WIDTH, MIDDLE_VARIATION_SIDE_SPACE, MIDDLE_WIDTH } from './constants';

export const generateRootContainerStyles = ({ variant }: DividerRootContainerProps): ViewStyle => {
  let styles: ViewStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  };

  if (variant === 'inset') {
    styles = {
      ...styles,
      display: 'flex',
    };
  } else if (variant === 'middle') {
    styles = {
      ...styles,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  return styles;
};

export const generateDividerStyles = ({
  dividerType,
  variant,
  childWrapperLayoutRect,
  hasChild,
  dividerRootLayoutRect,
  textAlign,
}: GenerateDividerStylesProps): ViewStyle => {
  const baseStyles: ViewStyle = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    backgroundColor: colors.white.dark,
  };

  if (hasChild && childWrapperLayoutRect && dividerRootLayoutRect) {
    const rootDividerWidth = dividerRootLayoutRect.width;
    const childWrapperWidth = childWrapperLayoutRect.width;

    const halfWidthOfChildWrapper = childWrapperWidth / 2;
    const halfWidthOfRootDivider = rootDividerWidth / 2;

    let calculatedWidth = halfWidthOfRootDivider - halfWidthOfChildWrapper;

    if (variant === 'middle') {
      calculatedWidth -= MIDDLE_VARIATION_SIDE_SPACE;
    } else if (variant === 'inset' && dividerType === 'left') {
      return {
        ...baseStyles,
        marginLeft: 'auto',
        width: calculatedWidth - MIDDLE_VARIATION_SIDE_SPACE,
      };
    }

    if (textAlign === 'left') {
      return {
        ...baseStyles,
        width:
          dividerType === 'left' ? calculatedWidth / 2 : halfWidthOfRootDivider + calculatedWidth / 2 - halfWidthOfChildWrapper,
      };
    } else if (textAlign === 'right') {
      return {
        ...baseStyles,
        width:
          dividerType === 'right' ? calculatedWidth / 2 : halfWidthOfRootDivider + calculatedWidth / 2 - halfWidthOfChildWrapper,
      };
    }

    return {
      ...baseStyles,
      width: calculatedWidth,
    };
  }

  if (variant === 'inset' && dividerType === 'left') {
    return {
      ...baseStyles,
      width: INSET_LEFT_WIDTH,
      marginLeft: 'auto',
    };
  }

  if (variant === 'middle') {
    return {
      ...baseStyles,
      width: MIDDLE_WIDTH,
    };
  }

  return baseStyles;
};
