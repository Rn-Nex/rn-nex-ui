import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './BoxTypes';

export const Box = React.forwardRef<View, BoxProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <View ref={ref} style={[style, sx && generateElementStyles(sx)]} {...props}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
