import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardProps } from './CardTypes';
import { cardVariation } from './utils';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        variation &&
          generateElementStyles({
            ...style,
            ...cardVariation(variation),
          }),
      ]}
      {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
