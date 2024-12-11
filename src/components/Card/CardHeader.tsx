import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useThemeCardHeaderConfigSelector } from '../../libraries';
import { merge } from '../../utils';
import { Box } from '../Box';
import { CardHeaderProps } from './Card.types';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, sx, style, ...props }, ref) => {
  const cardHeaderThemeConfig = useThemeCardHeaderConfigSelector();

  const mergeStyles = useMemo(() => {
    return merge(cardHeaderThemeConfig?.style, style);
  }, [cardHeaderThemeConfig?.style, style]);

  return (
    <Box ref={ref} style={mergeStyles} sx={sx} {...props}>
      {children}
    </Box>
  );
});

CardHeader.displayName = 'CardHeader';
