import React, { useMemo } from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardProps } from './CardTypes';
import { cardVariation } from './utils';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const cardStyle = useMemo(
    () =>
      generateElementStyles({
        ...sx,
        ...cardVariation(variation),
      }),
    [sx, variation],
  );

  return (
    <View ref={ref} style={[variation && cardStyle, style]} {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
