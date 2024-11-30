import React from 'react';
import { StyleSheet, View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardHeaderProps } from './Card.types';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <View ref={ref} style={StyleSheet.flatten([sx && generateElementStyles(sx), style])} {...props}>
      {children}
    </View>
  );
});

CardHeader.displayName = 'CardHeader';
