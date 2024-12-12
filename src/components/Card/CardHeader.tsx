import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useThemeCardHeaderConfigSelector } from '../../libraries';
import { Box } from '../Box';
import { CardHeaderProps } from './Card.types';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, sx, style, ...props }, ref) => {
  const cardHeaderThemeConfig = useThemeCardHeaderConfigSelector();

  return (
    <Box ref={ref} style={StyleSheet.flatten([cardHeaderThemeConfig?.style, style])} sx={sx} {...props}>
      {children}
    </Box>
  );
});

CardHeader.displayName = 'CardHeader';
