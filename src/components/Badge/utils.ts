import { ViewStyle } from 'react-native';
import { GenerateBadgeStylesProps } from './BadgeTypes';
import { colors } from '../../libraries';

export const BadgeContainerDefaultStyles: ViewStyle = {
  padding: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'red',
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

export const generateBadgeStyles = ({ rootElementRect, variation }: GenerateBadgeStylesProps) => {
  const styles: ViewStyle = {};

  if (!rootElementRect) {
    throw new Error('Root element rect cannot be null.');
  }

  const { x, y } = rootElementRect;

  styles.top = y - 15;
  styles.left = x + 10;

  if (variation === 'primary') {
    styles.backgroundColor = colors.primary.light;
  } else if (variation === 'secondary') {
    styles.backgroundColor = colors.secondary.light;
  } else if (variation === 'error') {
    styles.backgroundColor = colors.error.light;
  } else if (variation === 'warning') {
    styles.backgroundColor = colors.yellow.light;
  } else if (variation === 'info') {
    styles.backgroundColor = colors.info.light;
  } else if (variation === 'success') {
    styles.backgroundColor = colors.green.dark;
  } else {
    styles.backgroundColor = colors.green.dark;
  }

  return styles;
};
