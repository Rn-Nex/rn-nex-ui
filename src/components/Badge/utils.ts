import { TextStyle, ViewStyle } from 'react-native';
import {
  BadgeContentDefaultStylesProps,
  GenerateBadgeContainerStylesProps,
  GenerateBadgeStylesProps,
  PlaceBadgeBasedPosition,
} from './BadgeTypes';
import { BADGE_DEFAULT_RADIUS } from './constants';

export const badgeContentDefaultStyles = ({ variation }: BadgeContentDefaultStylesProps): TextStyle => {
  const baseStyles: TextStyle = {
    color: variation === 'warning' ? 'black' : 'white',
    fontWeight: '400',
    fontSize: 11,
  };
  return baseStyles;
};

export const placeBadgeBasedPosition = ({ anchorOrigin, rootElementRect, variant }: PlaceBadgeBasedPosition): ViewStyle => {
  const { width, height, x, y } = rootElementRect;
  const isDotVariation = variant === 'dot';
  const halfOfBadgeRadius = BADGE_DEFAULT_RADIUS / 2;

  if (anchorOrigin?.vertical === 'bottom' && anchorOrigin?.horizontal === 'right') {
    return {
      top: isDotVariation ? y + height - halfOfBadgeRadius : y + height - BADGE_DEFAULT_RADIUS,
      left: isDotVariation ? x + width - halfOfBadgeRadius : x + width - BADGE_DEFAULT_RADIUS,
    };
  } else if (anchorOrigin?.vertical === 'bottom' && anchorOrigin?.horizontal === 'left') {
    return {
      top: isDotVariation ? y + height - halfOfBadgeRadius : y + height - BADGE_DEFAULT_RADIUS,
      left: isDotVariation ? x - halfOfBadgeRadius : x - BADGE_DEFAULT_RADIUS,
    };
  } else if (anchorOrigin?.vertical === 'top' && anchorOrigin?.horizontal === 'left') {
    return {
      top: isDotVariation ? y - halfOfBadgeRadius : y - BADGE_DEFAULT_RADIUS,
      left: isDotVariation ? x - halfOfBadgeRadius : x - BADGE_DEFAULT_RADIUS,
    };
  } else {
    return {
      top: isDotVariation ? y - halfOfBadgeRadius : y - BADGE_DEFAULT_RADIUS,
      left: isDotVariation ? x + width - halfOfBadgeRadius : x + width - BADGE_DEFAULT_RADIUS,
    };
  }
};

export const generateBadgeContainerStyles = ({ overlap }: GenerateBadgeContainerStylesProps): ViewStyle => {
  const isCircles = overlap === 'circular';
  const isRectangular = overlap === 'rectangular';

  const BadgeContainerDefaultStyles: ViewStyle = {
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    borderRadius: isCircles ? 100 : isRectangular ? 5 : 0,
  };

  return BadgeContainerDefaultStyles;
};

export const generateBadgeStyles = ({
  theme,
  rootElementRect,
  variation,
  badgeVisibility,
  variant,
  anchorOrigin,
}: GenerateBadgeStylesProps): ViewStyle => {
  if (!rootElementRect) {
    throw new Error('Root element rect cannot be null.');
  }

  const isDotVariation = variant === 'dot';
  let styles: ViewStyle = {
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: theme.colors.grey[500],
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row',
    position: 'absolute',
  };

  styles = {
    ...styles,
    ...placeBadgeBasedPosition({ rootElementRect, anchorOrigin, variant }),
  };

  if (variation === 'primary') {
    styles.backgroundColor = theme.colors.primary[300];
  } else if (variation === 'secondary') {
    styles.backgroundColor = theme.colors.secondary[300];
  } else if (variation === 'error') {
    styles.backgroundColor = theme.colors.red[500];
  } else if (variation === 'warning') {
    styles.backgroundColor = theme.colors.yellow[500];
  } else if (variation === 'info') {
    styles.backgroundColor = theme.colors.lightBlue[500];
  } else if (variation === 'success') {
    styles.backgroundColor = theme.colors.green[500];
  } else {
    styles.backgroundColor = theme.colors.green[800];
  }

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
