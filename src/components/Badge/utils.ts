import { TextStyle, ViewStyle } from 'react-native';
import { getVariant } from '../../utils';
import {
  BadgeContentDefaultStylesProps,
  GenerateBadgeContainerStylesProps,
  GenerateBadgeStylesProps,
  PlaceBadgeBasedPosition,
} from './Badge.types';
import { BADGE_DEFAULT_RADIUS } from './constants';

export const badgeContentDefaultStyles = ({ variation }: BadgeContentDefaultStylesProps): TextStyle => {
  const baseStyles: TextStyle = {
    color: variation === 'warning' ? 'black' : 'white',
  };
  return baseStyles;
};

export const placeBadgeBasedPosition = ({ anchorOrigin, variant }: PlaceBadgeBasedPosition): ViewStyle => {
  const isDotVariation = variant === 'dot';
  const placement = isDotVariation ? 0 : -4;

  const baseStyles: ViewStyle = {
    ...(anchorOrigin?.horizontal === 'left' && { left: placement }),
    ...(anchorOrigin?.horizontal === 'right' && { right: placement }),
    ...(anchorOrigin?.vertical === 'top' && { top: placement }),
    ...(anchorOrigin?.vertical === 'bottom' && { bottom: placement }),
  };

  return baseStyles;
};

export const generateBadgeContainerStyles = ({ overlap }: GenerateBadgeContainerStylesProps): ViewStyle => {
  const isCircles = overlap === 'circular';
  const isRectangular = overlap === 'rectangular';

  const BadgeContainerDefaultStyles: ViewStyle = {
    borderRadius: isCircles ? 100 : isRectangular ? 5 : 0,
  };

  return BadgeContainerDefaultStyles;
};

export const generateBadgeStyles = ({
  theme,
  variation,
  badgeVisibility,
  variant,
  anchorOrigin,
}: GenerateBadgeStylesProps): ViewStyle => {
  const isDotVariation = variant === 'dot';
  let styles: ViewStyle = {};

  styles = {
    ...styles,
    ...placeBadgeBasedPosition({ anchorOrigin, variant }),
    backgroundColor: getVariant({ variant: variation, theme }),
  };

  styles = {
    ...styles,
    minWidth: isDotVariation ? BADGE_DEFAULT_RADIUS : BADGE_DEFAULT_RADIUS * 2,
    minHeight: isDotVariation ? BADGE_DEFAULT_RADIUS : BADGE_DEFAULT_RADIUS * 2,
    transform: [
      {
        scale: badgeVisibility
          ? badgeVisibility.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            })
          : 0,
      },
    ],
  };

  return styles;
};
