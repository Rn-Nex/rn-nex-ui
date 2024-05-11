import { ColorValue } from 'react-native';
import { ElementBorderColorStyles } from '../../libraries/style/styleTypes';
import { CardVariations } from './interfaces';
import { colors } from '../../libraries';

export const cardVariation = (variation: CardVariations) => {
   const styles: { [key in keyof ElementBorderColorStyles]: ColorValue } = {};
   if (variation === 'outlined') {
      styles.borderColor = colors.gray.dark;
   }

   return styles;
};
