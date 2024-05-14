import { ViewStyle } from 'react-native';
import { GenerateBadgeStylesProps } from './BadgeTypes';
import { colors } from '../../libraries';

export const BadgeContainerDefaultStyles: ViewStyle = {
  padding: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

export const BadgeDefaultStyles: ViewStyle = {
  width: 20,
  height: 20,
  borderRadius: 100,
  position: 'absolute',
  top: -12,
  right: -12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const generateBadgeStyles = ({ variation }: GenerateBadgeStylesProps) => {
  const styles: ViewStyle = {};

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
