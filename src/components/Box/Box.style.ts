import { StyleSheet, ViewStyle } from 'react-native';
import { GenerateContainerStylesProps } from './Box.types';
import { BOX_GENERATED_CLASSNAMES, LG_MAX_WIDTH, MD_MAX_WIDTH, SM_MAX_WIDTH, XS_MAX_WIDTH, xl_MAX_WIDTH } from './constants';

export const containerStyles = StyleSheet.create({
  [BOX_GENERATED_CLASSNAMES.RN_NIX_CONTAINER_SX_CLASS]: {
    width: '100%',
  },
});

export const generateContainerStyles = ({ maxWidth, disableGutters }: GenerateContainerStylesProps) => {
  const baseStyles: ViewStyle = {
    padding: disableGutters ? 0 : 10,
    margin: 'auto',
  };

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
