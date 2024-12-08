import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { CardProps } from './Card.types';
import { cardVariation } from './Card.styles';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();

  return (
    <Box ref={ref} style={StyleSheet.flatten([variation && cardVariation(variation, themeColors), style])} sx={sx} {...props}>
      {children}
    </Box>
  );
});

Card.displayName = 'Card';
