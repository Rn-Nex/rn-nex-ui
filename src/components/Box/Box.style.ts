import { StyleSheet, ViewStyle } from 'react-native';
import { GenerateContainerStylesProps } from './Box.types';
import { LG_MAX_WIDTH, MD_MAX_WIDTH, SM_MAX_WIDTH, XS_MAX_WIDTH, xl_MAX_WIDTH } from './constants';

export const containerStyles = StyleSheet.create({
  containerSX: {
    width: '100%',
  },
});

export const generateContainerStyles = ({ maxWidth, disableGutters }: GenerateContainerStylesProps) => {
  const baseStyles: ViewStyle = {
    margin: 'auto',
  };

  if (!disableGutters) {
    baseStyles.padding = 10;
  }

  if (maxWidth === 'xs') {
    baseStyles.width = XS_MAX_WIDTH;
  } else if (maxWidth === 'sm') {
    baseStyles.width = SM_MAX_WIDTH;
  } else if (maxWidth === 'md') {
    baseStyles.width = MD_MAX_WIDTH;
  } else if (maxWidth === 'lg') {
    baseStyles.width = LG_MAX_WIDTH;
  } else if (maxWidth === 'xl') {
    baseStyles.width = xl_MAX_WIDTH;
  } else {
    baseStyles.width = '100%';
  }

  return baseStyles;
};
