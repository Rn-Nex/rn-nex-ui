import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardProps } from './CardTypes';
import { cardVariation } from './utils';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        variation &&
          generateElementStyles({
            ...sx,
            ...cardVariation(variation),
          }),
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
