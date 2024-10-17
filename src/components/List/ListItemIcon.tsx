import React, { useMemo } from 'react';
import { View } from 'react-native';
import { ListItemIconProps } from './List.types';
import { listItemIconStyles } from './List.style';
import { Box } from '../Box';

export const ListItemIcon = React.forwardRef<View, ListItemIconProps>(({ sx, style, ...props }, ref) => {
  const styles = useMemo(() => listItemIconStyles(), []);
  return <Box sx={sx} ref={ref} style={[styles, style]} {...props} />;
});
