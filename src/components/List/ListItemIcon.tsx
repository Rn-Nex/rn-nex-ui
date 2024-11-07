import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styles } from './List.style';
import { ListItemIconProps } from './List.types';

export const ListItemIcon = React.forwardRef<View, ListItemIconProps>(({ style, ...props }, ref) => {
  return <View ref={ref} style={StyleSheet.flatten([styles.listItemIcon, style])} {...props} />;
});
