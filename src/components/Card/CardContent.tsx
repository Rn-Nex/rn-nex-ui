import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardContentProps } from './CardTypes';

export const CardContent = React.forwardRef<View, CardContentProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={style && generateElementStyles(style)} {...props}>
      {children}
    </View>
  );
});
