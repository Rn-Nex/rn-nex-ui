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
  // alignSelf: 'flex-start',
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

  const halfOfDefaultWidth = BADGE_DEFAULT_WIDTH / 2;
  const halfOfDefaultHeight = BADGE_DEFAULT_HEIGHT / 2;
  const halfOfBadgeTopPosition = BADGE_TOP_POSITION / 2;

  let topPosition = 0;
  let leftPosition = 0;

  if (anchorOrigin?.vertical === 'bottom') {
    topPosition = y + (anchorOrigin.horizontal === 'right' ? width / 2 : height / 2) + halfOfDefaultHeight;
    leftPosition = isDotVariation
      ? x + (anchorOrigin.horizontal === 'right' ? width / 2 : -(width / 2)) + halfOfDefaultWidth
      : x + (anchorOrigin.horizontal === 'right' ? width / 2 : -(width / 2));
  } else if (anchorOrigin?.vertical === 'top') {
    topPosition = isDotVariation
      ? y + (anchorOrigin.horizontal === 'left' ? halfOfBadgeTopPosition : -(height / 2) + halfOfDefaultHeight)
      : y + (anchorOrigin.horizontal === 'left' ? -(height / 2) + halfOfDefaultHeight : BADGE_TOP_POSITION + halfOfDefaultHeight);
    leftPosition = isDotVariation
      ? x + (anchorOrigin.horizontal === 'left' ? -(width / 2) : BADGE_LEFT_POSITION + halfOfDefaultWidth)
      : x + (anchorOrigin.horizontal === 'left' ? -(width / 2) : BADGE_LEFT_POSITION + halfOfDefaultWidth);
  }

  return {
    top: topPosition,
    left: leftPosition,
  };
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
