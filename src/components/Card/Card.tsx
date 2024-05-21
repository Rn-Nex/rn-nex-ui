import React, { useMemo } from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardProps } from './CardTypes';
import { cardVariation } from './utils';
import { useTheme } from '../../libraries';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const { theme } = useTheme();

  const cardStyle = useMemo(
    () =>
      generateElementStyles({
        ...sx,
        ...cardVariation(variation, theme),
      }),
    [sx, variation, theme],
  );

  return (
    <View ref={ref} style={[variation && cardStyle, style]} {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
