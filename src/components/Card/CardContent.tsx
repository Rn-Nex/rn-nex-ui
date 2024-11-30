import React from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardContentProps } from './Card.types';

export const CardContent = React.forwardRef<View, CardContentProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <View ref={ref} style={StyleSheet.flatten([styles.container, sx && generateElementStyles(sx), style])} {...props}>
      {children}
    </View>
  );
});

const styles = StyleSheet.flatten({
  container: {
    padding: 10,
  },
});
