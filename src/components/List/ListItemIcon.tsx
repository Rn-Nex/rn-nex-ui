import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Box } from '../Box';
import { styles } from './List.style';
import { ListItemIconProps } from './List.types';

export const ListItemIcon = React.forwardRef<View, ListItemIconProps>(({ sx, style, ...props }, ref) => {
  return <Box sx={sx} ref={ref} style={StyleSheet.flatten([styles.listItemIcon, style])} {...props} />;
});
