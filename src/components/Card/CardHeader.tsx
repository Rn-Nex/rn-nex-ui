import React from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import { CardHeaderProps } from './Card.types';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, sx, ...props }, ref) => {
  return (
    <Box ref={ref} sx={sx} {...props}>
      {children}
    </Box>
  );
});

CardHeader.displayName = 'CardHeader';
