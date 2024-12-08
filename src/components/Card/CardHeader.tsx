import React from 'react';
import { View } from 'react-native';
import { useThemeCardHeaderConfigSelector } from '../../libraries';
import { Box } from '../Box';
import { CardHeaderProps } from './Card.types';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, sx, style, ...props }, ref) => {
  const cardHeaderThemeConfig = useThemeCardHeaderConfigSelector();

  const { sx: themeCardHeaderSx = sx, style: themeStyle = style } = cardHeaderThemeConfig || {};

  return (
    <Box ref={ref} style={themeStyle} sx={themeCardHeaderSx} {...props}>
      {children}
    </Box>
  );
});

CardHeader.displayName = 'CardHeader';
