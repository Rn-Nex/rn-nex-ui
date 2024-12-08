import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeCardConfigSelector, useThemeColorsSelector } from '../../libraries';
import { Box } from '../Box';
import { cardVariation } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();
  const cardThemeConfig = useThemeCardConfigSelector();

  const { sx: themeCardSx = sx, style: themeStyle = style } = cardThemeConfig || {};

  return (
    <Box
      ref={ref}
      style={StyleSheet.flatten([variation && cardVariation(variation, themeColors), themeStyle])}
      sx={themeCardSx}
      {...props}>
      {children}
    </Box>
  );
});

Card.displayName = 'Card';
