import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardContentProps } from './Card.types';

export const CardContent = React.forwardRef<View, CardContentProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <View ref={ref} style={[sx && generateElementStyles(sx), style]} {...props}>
      {children}
    </View>
  );
});
