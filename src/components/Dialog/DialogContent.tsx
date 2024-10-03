import React, { useMemo } from 'react';
import { View } from 'react-native';
import { BoxProps } from '../Box/Box.types';
import { Box } from '../Box';
import { dialogContentStyles } from './utils';

export const DialogContent = React.forwardRef<View, BoxProps>(({ style, sx, ...props }, ref) => {
  const styles = useMemo(() => dialogContentStyles(), []);

  return <Box sx={sx} style={[styles, style]} ref={ref} {...props} />;
});
