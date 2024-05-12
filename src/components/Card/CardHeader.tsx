import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { CardHeaderProps } from './CardTypes';

export const CardHeader = React.forwardRef<View, CardHeaderProps>(({ children, style, ...props }, ref) => {
  return (
    <View ref={ref} style={style && generateElementStyles(style)} {...props}>
      {children}
    </View>
  );
});

CardHeader.displayName = 'CardHeader';
