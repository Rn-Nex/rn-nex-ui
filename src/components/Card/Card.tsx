import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeCardConfigSelector, useThemeColorsSelector } from '../../libraries';
import { merge } from '../../utils';
import { Box } from '../Box';
import { cardVariation } from './Card.styles';
import { CardProps } from './Card.types';

export const Card = React.forwardRef<View, CardProps>(({ children, variation, style, sx, ...props }, ref) => {
  const themeColors = useThemeColorsSelector();
  const cardThemeConfig = useThemeCardConfigSelector();

  const mergeStyle = useMemo(() => {
    return merge(cardThemeConfig?.style, style);
  }, [cardThemeConfig?.style, style]);

  return (
    <Box
      ref={ref}
      style={StyleSheet.flatten([variation && cardVariation(variation, themeColors), mergeStyle])}
      sx={sx}
      {...props}>
      {children}
    </Box>
  );
});

Card.displayName = 'Card';
