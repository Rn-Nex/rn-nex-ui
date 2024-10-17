import { ColorValue } from 'react-native';
import { ElementBorderColorStyles } from '../../libraries/style/styleTypes';
import { CardVariations } from './Card.types';
import { ThemeType } from '../../libraries/themes/v1/theme';

export const cardVariation = (variation: CardVariations, theme: ThemeType) => {
  const styles: { [key in keyof ElementBorderColorStyles]: ColorValue } = {};
  if (variation === 'outlined') {
    styles.borderColor = theme.colors.grey[500];
  }

  return styles;
};
