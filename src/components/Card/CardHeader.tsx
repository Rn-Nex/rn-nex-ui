import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardHeaderProps } from './CardTypes';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <View ref={ref} style={[sx && generateElementStyles(sx), style]} {...props}>
      {children}
    </View>
  );
});

CardHeader.displayName = 'CardHeader';
