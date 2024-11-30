import { ViewStyle } from 'react-native';
import { ThemeType } from '../../libraries/themes/v1/theme';
import { CardVariations } from './Card.types';

export const cardVariation = (variation: CardVariations, theme: ThemeType) => {
  const styles: ViewStyle = {};
  if (variation === 'outlined') {
    styles.borderColor = theme.colors.grey[500];
    styles.borderWidth = 0.5;
    styles.borderRadius = 5;
  }

  return styles;
};
