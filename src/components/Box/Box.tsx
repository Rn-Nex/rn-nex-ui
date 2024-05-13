import React from 'react';
import { View } from 'react-native';
import { generateElementStyles } from '../../utils';
import { BoxProps } from './BoxTypes';

export const Box = React.forwardRef<View, BoxProps>(({ children, style, sx, ...props }, ref) => {
  return (
    <View ref={ref} {...props} style={[sx && generateElementStyles(sx), style]}>
      {children}
    </View>
  );
});

Box.displayName = 'Box';
