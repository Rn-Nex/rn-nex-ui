import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardProps } from './Card.types';
import { cardVariation } from './utils';
import { useTheme } from '../../libraries';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const { theme } = useTheme();

  const cardStyle = useMemo(() => sx && generateElementStyles(sx), [sx, theme]);

  return (
    <View ref={ref} style={StyleSheet.flatten([variation && cardVariation(variation, theme), cardStyle, style])} {...props}>
      {children}
    </View>
  );
});

Card.displayName = 'Card';
