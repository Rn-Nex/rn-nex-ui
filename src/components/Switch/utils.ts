import { ViewStyle } from 'react-native';
import { GetSwitchSizesArgs, GetSwitchVariantArgs } from './Switch';
import {
  SWITCH_CONTAINER_HEIGHT_LARGE,
  SWITCH_CONTAINER_HEIGHT_MEDIUM,
  SWITCH_CONTAINER_HEIGHT_SMALL,
  SWITCH_CONTAINER_WIDTH_LARGE,
  SWITCH_CONTAINER_WIDTH_MEDIUM,
  SWITCH_CONTAINER_WIDTH_SMALL,
  SWITCH_THUMB_HEIGHT_LARGE,
  SWITCH_THUMB_HEIGHT_MEDIUM,
  SWITCH_THUMB_HEIGHT_SMALL,
  SWITCH_THUMB_WIDTH_LARGE,
  SWITCH_THUMB_WIDTH_MEDIUM,
  SWITCH_THUMB_WIDTH_SMALL,
} from './constants';

export const getSwitchVariant = ({ variant, theme }: GetSwitchVariantArgs): string => {
  if (variant === 'primary') return theme.colors.primary[500];
  else if (variant === 'secondary') return theme.colors.secondary[500];
  else if (variant === 'error') return theme.colors.red[500];
  else if (variant === 'info') return theme.colors.lightBlue[500];
  else if (variant === 'success') return theme.colors.green[500];
  else if (variant === 'warning') return theme.colors.yellow[500];
  return theme.colors.secondary[500];
};

export const getSwitchSizes = ({
  size,
}: GetSwitchSizesArgs): {
  thumbStyles: ViewStyle;
  thumbContainerStyles: ViewStyle;
} => {
  let thumbStyles: ViewStyle = {};
  let thumbContainerStyles: ViewStyle = {};

  if (size === 'small') {
    thumbContainerStyles.width = SWITCH_CONTAINER_WIDTH_SMALL;
    thumbContainerStyles.height = SWITCH_CONTAINER_HEIGHT_SMALL;

    thumbStyles.width = SWITCH_THUMB_WIDTH_SMALL;
    thumbStyles.height = SWITCH_THUMB_HEIGHT_SMALL;
  }

  if (size === 'medium') {
    thumbContainerStyles.width = SWITCH_CONTAINER_WIDTH_MEDIUM;
    thumbContainerStyles.height = SWITCH_CONTAINER_HEIGHT_MEDIUM;
    thumbStyles.width = SWITCH_THUMB_WIDTH_MEDIUM;
    thumbStyles.height = SWITCH_THUMB_HEIGHT_MEDIUM;
  }

  if (size === 'large') {
    thumbContainerStyles.width = SWITCH_CONTAINER_WIDTH_LARGE;
    thumbContainerStyles.height = SWITCH_CONTAINER_HEIGHT_LARGE;
    thumbStyles.width = SWITCH_THUMB_WIDTH_LARGE;
    thumbStyles.height = SWITCH_THUMB_HEIGHT_LARGE;
  }

  return { thumbStyles, thumbContainerStyles };
};
