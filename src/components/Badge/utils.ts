import { TextStyle, ViewStyle } from 'react-native';
import { colors } from '../../libraries';
import { GenerateBadgeStylesProps, PlaceBadgeBasedPosition } from './BadgeTypes';
import { BADGE_DEFAULT_HEIGHT, BADGE_DEFAULT_WIDTH, BADGE_LEFT_POSITION, BADGE_TOP_POSITION } from './constants';

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
  minWidth: 20,
};

export const BadgeContentDefaultStyles: TextStyle = {
  color: colors.white.main,
  fontWeight: '400',
  fontSize: 11,
};

export const placeBadgeBasedPosition = ({ anchorOrigin, rootElementRect, variant }: PlaceBadgeBasedPosition): ViewStyle => {
  const { width, height, x, y } = rootElementRect;
  const isDotVariation = variant === 'dot';

  const halfOfDefaultWidth = BADGE_DEFAULT_WIDTH / 2;
  const halfOfDefaultHeight = BADGE_DEFAULT_HEIGHT / 2;
  const halfOfBadgeTopPosition = BADGE_TOP_POSITION / 2;

  if (anchorOrigin?.vertical === 'bottom' && anchorOrigin?.horizontal === 'right') {
    return {
      top: y + width / 2 + BADGE_DEFAULT_HEIGHT,
      left: isDotVariation ? x + width / 2 + BADGE_DEFAULT_WIDTH : x + width / 2,
    };
  } else if (anchorOrigin?.vertical === 'bottom' && anchorOrigin?.horizontal === 'left') {
    return {
      top: y + height / 2 + BADGE_DEFAULT_HEIGHT,
      left: isDotVariation ? x + -(width / 2) + BADGE_DEFAULT_WIDTH : x + -(width / 2),
    };
  } else if (anchorOrigin?.vertical === 'top' && anchorOrigin?.horizontal === 'left') {
    return {
      top: isDotVariation ? y + halfOfBadgeTopPosition : y + -(height / 2) + halfOfDefaultHeight,
      left: isDotVariation ? x + -(width / 2) + halfOfDefaultWidth : x + -(width / 2),
    };
  } else {
    return {
      top: isDotVariation ? y + BADGE_TOP_POSITION + BADGE_DEFAULT_HEIGHT : y + BADGE_TOP_POSITION + halfOfDefaultHeight,
      left: isDotVariation ? x + BADGE_LEFT_POSITION + BADGE_DEFAULT_WIDTH : x + BADGE_LEFT_POSITION + halfOfDefaultWidth,
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
    width: isDotVariation ? BADGE_DEFAULT_WIDTH : 'auto',
    height: isDotVariation ? BADGE_DEFAULT_HEIGHT : 'auto',
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
