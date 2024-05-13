import { ColorValue } from 'react-native';
import { colors } from '../../libraries';
import { ElementBorderColorStyles } from '../../libraries/style/styleTypes';
import { CardVariations } from './CardTypes';

export const cardVariation = (variation: CardVariations) => {
  const styles: { [key in keyof ElementBorderColorStyles]: ColorValue } = {};
  if (variation === 'outlined') {
    styles.borderColor = colors.gray.dark;
  }

  return styles;
};
