import { TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { GenerateBadgeStylesProps, PlaceBadgeBasedPosition } from './BadgeTypes';
import { BADGE_DEFAULT_RADIUS } from './constants';

export const BadgeContainerDefaultStyles: ViewStyle = {
  padding: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'red',
  width: 30,
};

export const BadgeDefaultStyles: ViewStyle = {
  paddingHorizontal: 5,
  paddingVertical: 3,
  borderRadius: 100,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
  shadowColor: colors.black.light,
  shadowOffset: { width: -2, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  flexDirection: 'row',
  position: 'absolute',
};

export const BadgeContentDefaultStyles: TextStyle = {
  color: colors.white.main,
  fontWeight: '400',
  fontSize: 11,
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

export const generateBadgeStyles = ({
  rootElementRect,
  variation,
  badgeVisibility,
  variant,
  anchorOrigin,
}: GenerateBadgeStylesProps) => {
  if (!rootElementRect) {
    throw new Error('Root element rect cannot be null.');
  }

  const isDotVariation = variant === 'dot';
  let styles: ViewStyle = {};

  styles = {
    ...styles,
    ...placeBadgeBasedPosition({ rootElementRect, anchorOrigin, variant }),
  };

  if (variation === 'primary') {
    styles.backgroundColor = colors.primary.light;
  } else if (variation === 'secondary') {
    styles.backgroundColor = colors.secondary.light;
  } else if (variation === 'error') {
    styles.backgroundColor = colors.error.light;
  } else if (variation === 'warning') {
    styles.backgroundColor = colors.yellow.dark;
  } else if (variation === 'info') {
    styles.backgroundColor = colors.info.light;
  } else if (variation === 'success') {
    styles.backgroundColor = colors.green.dark;
  } else {
    styles.backgroundColor = colors.green.dark;
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
